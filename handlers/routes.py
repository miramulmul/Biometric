import os
import flask
import shutil
from datetime import timedelta
from flask import request, session, redirect

from tabledef import *
from calculator.functions import face_recogtnition_liveness, IDE_PASS_DE_EXT
from speech_to_text.audio import speech_recog


def configure_routes(application, Session):
    
    #------Timing out the login session------#
    @application.before_request
    def make_session_permanent():
        session.permanent = True
        application.permanent_session_lifetime = timedelta(minutes=8)

    #-----------Index-----------#
    @application.route('/')
    def index():
        return flask.render_template("index.html")

    #-----------IDCard Verification----------#
    @application.route('/id_card')
    def id_card():
        if not session.get('logged_in'):
            return index()
        else:
            return flask.render_template("id_card.html")

    @application.route('/id_verification', methods = ["POST"])
    def id_verification():
        data = IDE_PASS_DE_EXT(flask.request)
        return flask.jsonify(data)

    #----------Onboarding----------#

    @application.route('/signature')
    def signature():
        if not session.get('id_capture'):
            return id_card()
        else:
            return flask.render_template("signature.html")
        
    @application.route("/predict", methods=["POST"])
    def predict():
        data = face_recogtnition_liveness(flask.request, 'onboarding')
        return flask.jsonify(data)
    

    #----------Face Authenticating----------#

    @application.route('/f_recognition')
    def f_recognition():
        if not session.get('logged_in'):
            return index()
        return flask.render_template("face_recognition.html")

    @application.route('/recognition', methods=["POST"])
    def recognition():
        data = face_recogtnition_liveness(flask.request, 'recognition')
        return flask.jsonify(data)

    #----------Mobile Authenticating----------#

    @application.route('/mobileauthentication')
    def mobileauthentication():
        return flask.render_template('mobileauthentication.html')

    @application.route('/mobile_authentication', methods = ["POST"])
    def mobile_authentication(): 
        data = face_recogtnition_liveness(flask.request, 'mobile_auth')
        return flask.jsonify(data)

    #----------Speech Recognition----------#
    @application.route('/speech')
    def speech():
        return flask.render_template('test.html')
    
    @application.route('/speech_recognition', methods=["POST"])
    def speech_recognition():
        data = speech_recog(flask.request)
        return flask.jsonify(data)

    #----------Redirect the App------------#

    @application.route('/redirector', methods=["POST"])
    def redirector():
        if flask.request.method == "POST" and 'url' in request.form and 'name' in request.form and 'email' in request.form and 'token' in request.form and 'ide' in request.form:
            status = str(request.form["status"])
            ide = int(request.form["ide"])
            if ide > 0:
                session['logged_in'] = True
                session['username'] = str(request.form["name"])
                session['useremail'] = str(request.form["email"])
                session['usertoken'] = str(request.form["token"])
                session['useride'] = ide
                session['url'] = str(request.form["url"])
                session['rfc'] = str(request.form["RFC"])
                if status == "OK":
                    return f_recognition()
                else: return id_card()
        return index()

    #---------Delete One User---------#

    @application.route('/deleteByID/<RFC>')
    def deleteByID(RFC):
        password = request.args.get('p', default = "", type = str)
        if password != "Carlos":
            return "ERROR"
        s = Session()
        result = s.query(User).filter_by(rfc = RFC).first()
        if(result is None):
            return "ERROR"
        session.clear()
        global flg
        flg = 0
        s.query(User).filter_by(rfc = RFC).delete()
        s.commit()
        return "OK"
    
    #----------Remove User's photo-----------#
    @application.route('/clear_pic')
    def clear_pic():

        global flg

        print("Starting redirect to user's url and clear session")
        flg = 0
        url = session['url']
        name = session['username']
        token = session['usertoken']
        latitude = session['latitude']
        longitude = session['longitude']
        if url != "only_test" :
            url = url + '?token=' + token + '&gpslatitude=' + latitude + '&gpslongitude=' + longitude 
        if os.path.isdir('static/dataset/' + name):
            shutil.rmtree('static/dataset/' + name)
        session.clear()
        
        print(url)
        if url == "only_test":
            return redirect("https://www.fiscoclic.mx")
        else :
            return flask.render_template("wait.html",  re_url = url)


    #-----------delete_all------------
    @application.route('/delete_all')
    def delete_all():
        s = Session()
        s.query(User).delete()
        s.commit()
        session.clear()
        if os.path.isdir('static/dataset/'):
            shutil.rmtree('static/dataset/')
        global flg
        flg = 0
        return index()    