#!/usr/bin/env python

import os
from pathlib import Path

from flask import Flask, render_template


def create_app():
    app = Flask(__name__, static_folder='')
    app.config['APP_DIR'] = str(Path(__file__).parent)
    app.config['PROJECT_DIR'] = str(Path(__file__).parent.parent)
    app.config['JS_BUNDLE'] = os.environ.get('JS_BUNDLE', 'app.js');
    return app


app = create_app()


@app.route('/')
def home():
    return render_template('content.html',
                           title='jasonbrazeal.com',
                           desc='jasonbrazeal.com',
                           js_bundle=app.config['JS_BUNDLE'])
