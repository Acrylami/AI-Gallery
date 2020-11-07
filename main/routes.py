import os
from flask import render_template, url_for, request, redirect, flash, session, send_file, send_from_directory, safe_join, abort
from main import app
from flask.helpers import flash
#from PIL import Image
#import PIL.ImageOps
from werkzeug.utils import secure_filename
from .FaceSwap import main, face_detection

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
            #test_processing(filepath) #Test inverting image

            #Swaps faces with set meme and outputs as output.jpg
            face_swap(filepath)
            saved_path = 'main\\Images\\output.jpg'
            
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
    meme = 'main\\Images\\OnceAgain.jpg'
    output_filepath = 'main\\Images\\output.jpg'
    main.main(meme, uploaded_image, output_filepath)
    #command_string = "python main.py --src " + meme + " --dst " + uploaded_image + " --out " + output_filepath + " --correct_color"
    #os.system(command_string)
    
    
