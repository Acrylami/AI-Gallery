import os
from flask import render_template, url_for, request, redirect, flash, session
from main import app
from flask.helpers import flash

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html',  title='MemeSwap')

@app.route("/server/upload", methods=["GET", "POST"])
def upload_image():
    if request.method == "POST":
        if request.files:
            image = request.files["image"]
            print(image)
            #return redirect(request.url)
    return 'test'
    #return render_template('home.html',  title='MemeSwap')
