import os
from flask import render_template, url_for, request, redirect, flash, session, send_file, send_from_directory, safe_join, abort
from main import app
from flask.helpers import flash
from PIL import Image
import PIL.ImageOps
import requests
import json
import base64
from io import BytesIO
import numpy as np
from werkzeug.utils import secure_filename
from .FaceSwap.main2 import run_swap as swapper
import random

#Will move this to config later, staying here for easier debug
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["PNG", "JPG", "JPEG"] #Must double check with script we are using

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html',  title='MemeSwap')


# allowed_image(filename):


@app.route("/server/upload", methods=["GET", "POST"])
def upload_image():
    if request.method == "POST":
        if request.files:
            image = np.fromfile(request.files["image"], np.uint8)

            #Swaps faces with set meme and outputs as result.jpg
            output = face_swap(image)
            #Check it didn't fail
            if type(output) != bool:
                imgPil = Image.fromarray(output)
                buffered = BytesIO()

                imgPil.save(buffered, format="PNG")
                img_str = base64.b64encode(buffered.getvalue())
                return img_str

            else:
                #send text
                print("Could not swap face! No face detected. Try a different image")
                return "not detected"
    return 'test'

# @app.route('/server/style-transfer', methods=['POST'])
# def style_transfer():


@app.route('/server/translate', methods=["POST"])
def translate_text():
    translatedNames = []
    url = "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get"
    headers = {
        'x-rapidapi-key': os.environ.get('RAPID_API_KEY'),
        'x-rapidapi-host': "translated-mymemory---translation-memory.p.rapidapi.com"
    }
    querystring = {}
    languages = {'Italian': 'it','French': 'fr','Russian': 'ru','Mandarin Chinese': 'zh','Japanese': 'ja','Arabic': 'ar','Swahili': 'sw','Zulu': 'zu','Hindi': 'hi','Spanish': 'es'}
    data = request.json
    print('received data from react',data)
    for lang in languages:
        querystring = {"langpair":"en|{}".format(languages[lang]),"q":"{}".format(data["name"])}
        response = requests.request("GET", url, headers=headers, params=querystring)
        translatedData = json.loads(response.text)
        translatedNames.append([ lang, translatedData["responseData"]["translatedText"] ])

    print('sending to react')
    return json.dumps(translatedNames)

def face_swap(image):
    #Pick random meme
    chosen = random.randint(1,10)
    meme = str(chosen) + ".jpg"
    image_path = os.getcwd()+ '\\main\\Images\\'
    meme_filepath = image_path + meme

    output = swapper(image, meme_filepath)
    return output
