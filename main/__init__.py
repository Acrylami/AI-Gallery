from flask import Flask
import os

app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app.config['SECRET_KEY'] = os.environ.get('FLASK_KEY')

from main import routes
