import os
from flask import Flask, render_template, redirect, url_for, request, flash
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt'}
COUNT = 0

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/uploadFile', methods=['POST'])
def uploadFile():
    global COUNT

    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return redirect(request.referrer)

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename).split('.')[0] + '(' + str(COUNT) + ').' + secure_filename(file.filename).split('.')[1]
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        COUNT += 1

        return redirect(request.referrer)


# @app.route('/uploadFile', methods=['POST'])
# def uploadFile():


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tasks', methods=['POST','GET'])
def taskSelect():
    year = request.form['year']
    round = request.form['round']
    return redirect(url_for('tasksAll', year=year, round=round, taskLetter='a'))


@app.route('/tasks/<year>/<round>/<taskLetter>', methods=['POST','GET'])
def tasksAll(year, round, taskLetter='a'):
    path = "subpages/" + year + "/" + round + "/" + taskLetter + ".html"
    return render_template('tasks.html', taskLetter=taskLetter, path=path, year=year, round=round)


@app.route('/submits')
def submits():
    return render_template('submits.html')


@app.route('/results')
def results():
    return render_template('results.html')


@app.route('/faq')
def faq():
    return render_template('faq.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


