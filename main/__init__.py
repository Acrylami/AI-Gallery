from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = '967ab34cee653206e09f0cbd19ab39a3'


from main import routes
