import os
from flask import render_template, url_for, request, redirect, flash, session
from main import app
from flask.helpers import flash

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html',  title='MemeSwap')



