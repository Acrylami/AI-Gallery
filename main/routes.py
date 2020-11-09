import os
from flask import render_template, url_for, request, redirect, flash, session, send_file, send_from_directory, safe_join, abort
from main import app
from flask.helpers import flash
#from PIL import Image
#import PIL.ImageOps
from werkzeug.utils import secure_filename
from .FaceSwap.main2 import run_swap as test

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
            
            return send_file(saved_path, mimetype='image/jpg') #Must use different file path
    return 'test'

'''
def test_processing(uploaded_image):
    image = Image.open(uploaded_image)
    inverted_image = PIL.ImageOps.invert(image)
    inverted_image.save(uploaded_image)

    return uploaded_image
'''

def face_swap(uploaded_image):
    image_path = os.getcwd()+ '\\main\\Images\\'
    meme = 'OnceAgain.jpg' #Need better way to set meme
    
    meme_filepath = image_path + meme
    uploaded_filepath = image_path + uploaded_image
    output_filepath = image_path + 'result.jpg'

    test(uploaded_filepath, meme_filepath, output_filepath) #Runs the faceswapping scripts
    #Delete uploaded files
    if os.path.exists(uploaded_filepath):
        os.remove(uploaded_filepath)
    return output_filepath

    
