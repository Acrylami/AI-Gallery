import os
from flask import render_template, url_for, request, redirect, flash, session, send_file, send_from_directory, safe_join, abort
from main import app
from flask.helpers import flash
from PIL import Image
import PIL.ImageOps
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


def test_processing(uploaded_image):
    image = Image.open(uploaded_image)
    inverted_image = PIL.ImageOps.invert(image)
    inverted_image.save(uploaded_image)
    
    return uploaded_image

