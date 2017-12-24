#!/usr/bin/env python

import os
from os import pardir
import json
from datetime import datetime

from flask import Flask, render_template
from flask_webpack import Webpack

APP_DIR = os.path.dirname(__file__)
BUILD_DIR = os.path.join(os.path.abspath(os.path.join(APP_DIR, pardir)),
                         'build')


def create_app(settings_override=None):
    webpack = Webpack()
    app = Flask(__name__, static_folder=BUILD_DIR)
    app.config.update({'WEBPACK_MANIFEST_PATH': os.path.join(BUILD_DIR,
                                                             'manifest.json')})
    if settings_override:
        app.config.update(settings_override)
    webpack.init_app(app)
    return app


app = create_app()


@app.route('/')
def index():
    return render_template('index.html', title='jasonbrazeal.com')


# # one way to run code before the app starts is to create a new cli command
# # `flask start` checks for the NOTES_DIR environment variable then runs the dev server
# import click
# @app.cli.command('start', short_help='checks NOTES_DIR and starts dev server')
# def start():
#     click.echo('starting')
#     if NOTES_DIR is None:
#         raise RuntimeError('NOTES_DIR environment variable must be set before running flask app.')
#     cli.run_command([])
#     # cli.run_command('')

# another way to run code after `flask run`, but before the first request
# @app.before_first_request
# def check_notes_dir():
#     if NOTES_DIR is None:
#         raise RuntimeError('NOTES_DIR environment variable must be set before running flask app.')
