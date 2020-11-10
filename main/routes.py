import os
from flask import render_template, url_for, request, redirect, flash, session, send_file, send_from_directory, safe_join, abort
from main import app
from flask.helpers import flash
from PIL import Image
import PIL.ImageOps
import requests
import json
from werkzeug.utils import secure_filename
from .FaceSwap.main2 import run_swap as test
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
            image = request.files["image"]

            #Must check extensions & File names

            filename = secure_filename(image.filename) #Sanitises filename
            filepath = 'main\\Images\\' + filename
            image.save(filepath)
            saved_path = 'Images\\' + filename

            #Swaps faces with set meme and outputs as result.jpg
            saved_path = face_swap(filename)
            #Check it didn't fail
            if saved_path == False:
                #send text
                print("Could not swap face! No face detected. Try a different image")
                return "Could not swap face! No face detected. Try a different image"
            else:
                return send_file(saved_path, mimetype='image/jpg')
    return 'test'

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

'''
def test_processing(uploaded_image):
    image = Image.open(uploaded_image)
    inverted_image = PIL.ImageOps.invert(image)
    inverted_image.save(uploaded_image)

    return uploaded_image
'''

def face_swap(uploaded_image):
    #Pick random meme
    chosen = random.randint(1,10)
    meme = str(chosen) + ".jpg"
    
    image_path = os.getcwd()+ '\\main\\Images\\'
    
    meme_filepath = image_path + meme
    uploaded_filepath = image_path + uploaded_image
    output_filepath = image_path + 'result.jpg'



    to_return = ''
    #Runs the faceswapping scripts
    if (test(uploaded_filepath, meme_filepath, output_filepath)):
        #Ran properly
        to_return = output_filepath
        
    else:
        #Didn't find face, couldn't swap
        to_return = False

    #Delete uploaded files
    if os.path.exists(uploaded_filepath):
        os.remove(uploaded_filepath)
    return to_return

def remove_background(uploaded_image):
    image_path = os.getcwd()+ '\\main\\Images\\'
    uploaded_filepath = image_path + uploaded_image
    output_filepath = image_path + 'result.jpg'

    #Runs background scripts
    test(uploaded_filepath, output_filepath)
    
    #Delete uploaded files
    if os.path.exists(uploaded_filepath):
        os.remove(uploaded_filepath)
    return output_filepath
