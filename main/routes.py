import os
from flask import render_template, url_for, request, redirect, flash, session, send_file, send_from_directory, safe_join, abort
from main import app
from flask.helpers import flash
from PIL import Image
import PIL.ImageOps
import requests
import json
from werkzeug.utils import secure_filename

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

            #Process images
            test_processing(filepath)

            return send_file(saved_path, mimetype='image/jpg') #Must use different file path
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

def test_processing(uploaded_image):
    image = Image.open(uploaded_image)
    inverted_image = PIL.ImageOps.invert(image)
    inverted_image.save(uploaded_image)

    return uploaded_image
