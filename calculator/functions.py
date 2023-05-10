import io
import os
import cv2
import json
import imutils
import base64
import requests
import numpy as np
from PIL import Image
import face_recognition
import tensorflow as tf
from flask import session
from matplotlib import pyplot as plt

from tabledef import *
from ide_passport.find_face.sift_flann import sift
from ide_passport.extractor.utils import label_map_util
from anti_spoofing.face_anti_spoofing import detect
from ide_passport.extractor.utils import visualization_utils as vis_util

#-------Static Value--------#

CWD_PATH = os.getcwd()
flg = 0
Session = ""
questionA = ""
image_array = []
number_question = 0
img_temple = []
sess = ""
image_tensor = ""
category_index = ""
detection_boxes = ""
detection_scores = ""
detection_classes = ""
num_detections = ""

def Define_FUC(Session_temp):
    global Session, sess, image_tensor, category_index, detection_boxes, detection_classes, detection_scores, num_detections

    Session = Session_temp
    MODEL_NAME = 'model'
    CWD_PATH = os.getcwd()
    PATH_TO_CKPT = os.path.join(CWD_PATH,MODEL_NAME,'frozen_inference_graph.pb')
    PATH_TO_LABELS = os.path.join(CWD_PATH,'data','labelmap.pbtxt')

    NUM_CLASSES = 1

    label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
    categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
    category_index = label_map_util.create_category_index(categories)

    detection_graph = tf.Graph()
    with detection_graph.as_default():
        od_graph_def = tf.compat.v1.GraphDef()
        with tf.compat.v2.io.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
            serialized_graph = fid.read()
            od_graph_def.ParseFromString(serialized_graph)
            tf.import_graph_def(od_graph_def, name='')

        sess = tf.compat.v1.Session(graph=detection_graph)

    image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
    detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
    detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
    detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')
    num_detections = detection_graph.get_tensor_by_name('num_detections:0')

#-------Cropping IDE-------#
def cropping_id_card(name, direction):
    card_str = ""
    if direction == 0:
        card_str = "front"
    else :
        card_str = "back"
    IMAGE_NAME = 'static/dataset/' + name + '/id_card.png'
    PATH_TO_IMAGE = os.path.join(CWD_PATH,IMAGE_NAME)
    image = cv2.imread(PATH_TO_IMAGE)
    image_expanded = np.expand_dims(image, axis=0)

    (boxes, scores, classes, num) = sess.run(
        [detection_boxes, detection_scores, detection_classes, num_detections],
        feed_dict={image_tensor: image_expanded})

    score, array_coord = vis_util.visualize_boxes_and_labels_on_image_array(
        image,
        np.squeeze(boxes),
        np.squeeze(classes).astype(np.int32),
        np.squeeze(scores),
        category_index,
        use_normalized_coordinates=True,
        line_thickness=3,
        min_score_thresh=0.60)

    ymin, xmin, ymax, xmax = array_coord
    if(score < 0.9):
        return False
    else :
        shape = np.shape(image)
        im_width, im_height = shape[1], shape[0]
        (left, right, top, bottom) = (xmin * im_width, xmax * im_width, (ymin) * im_height, (ymax) * im_height)
        
        id_card = Image.open('static/dataset/' + name + '/id_card.png')
        id_card = id_card.crop((left, top, right, bottom))

        width, height = id_card.size
        aspec = width * 1.0 / height
        print(aspec)
        if(aspec < 1.3):
            return False
        id_card.resize((int(width * 1.3), int(height * 1.3))).save('static/dataset/' + name + '/' + card_str + '.png', quality=95)
        return True

#--------Check with database--------#

def check_with_database(img):

    s = Session()
    results = s.query(User).all()

    frame = img    
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    rgb = imutils.resize(rgb, width=750)
    print('[INFO] recognizing faces...')
    boxes = face_recognition.face_locations(rgb, model='hog')
    encodings = face_recognition.face_encodings(rgb, boxes)

    minn = 1
    name = 'Unknown'
    RFC = 'Unknown'
    
    for result in results:
        if result.encoded_face is None:
            continue        
        data = result.encoded_face
        dist = face_recognition.face_distance(encodings, data['encodings'][0])[0]
        for encoding in encodings:
            matches = face_recognition.compare_faces(data['encodings'], encoding)
            temp_name = 'Unknown'
            if True in matches:
                matchedIdxs = [i for i, b in enumerate(matches) if b]
                counts = {}
                
                for i in matchedIdxs:
                    xp_name = data['names'][i]
                    counts[xp_name] = counts.get(xp_name, 0) + 1
                temp_name = max(counts, key=counts.get)


        if(temp_name != 'Unknown'):
            if(dist < minn):
                minn = dist
                name = result.username
                RFC = result.rfc
    
    return minn, name, RFC


#--------Find face in database-------#

def find_user_by_face(img):

    minn, name, RFC = check_with_database(img)    
    
    print(minn, name, RFC)
    if minn < 0.4:
        return name, RFC
    return 'Unknown', 'Unknown'
    
#--------Compare IDE's face and User's face--------#

def face_recog(name, img):
    known_image = cv2.imread("static/dataset/" + name + "/front.png")
    known_image_encoding = face_recognition.face_encodings(known_image)[0]
    print('face_encoding')
    unknown_image = img
    face_encodings = face_recognition.face_encodings(unknown_image)[0]
    face_distance = face_recognition.face_distance([face_encodings], known_image_encoding)[0]
    print(face_distance)

    minn, name, RFC = check_with_database(img)    
    
    res = "fail"
    if minn >= 0.4:
        res = "pass"
    if face_distance < 0.6:
        return "pass", res
    else:
        return "fail", res

#---------Recognize user's face----------

def recognize(img, useremail):
    s = Session()
    result = s.query(User).filter_by(email = useremail).first()

    print(result, useremail)
    frame = img    
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    rgb = imutils.resize(rgb, width=750) # scale down for faster process
    print('[INFO] recognizing faces...')
    boxes = face_recognition.face_locations(rgb, model='hog')
    encodings = face_recognition.face_encodings(rgb, boxes)

    minn = 1
    if not result.encoded_face is None:
        data = result.encoded_face
        dist = face_recognition.face_distance(encodings, data['encodings'][0])[0]
        for encoding in encodings:
            matches = face_recognition.compare_faces(data['encodings'], encoding)
            name = 'Unknown'
            
            if True in matches:
                matchedIdxs = [i for i, b in enumerate(matches) if b]
                counts = {}
                
                for i in matchedIdxs:
                    name = data['names'][i]
                    counts[name] = counts.get(name, 0) + 1
                name = max(counts, key=counts.get)

        if(name != 'Unknown'):
            if(dist < minn):
                minn = dist

    print(minn)
    if(minn > 0.4): 
        return "fail"
    else :
        return "pass"

#---------Encode user's face----------
def encode_face(img, name, email, detection_method):
    knownEncodings = list()
    knownNames = list()

    rfc = session['rfc']
    image = cv2.resize(img, (0,0), fx=0.5, fy=0.5)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    boxes = face_recognition.face_locations(rgb, model = detection_method)
    encodings = face_recognition.face_encodings(rgb, boxes)
    
    for encoding in encodings:
        knownEncodings.append(encoding)
        knownNames.append(name)

    data = {'encodings': knownEncodings, 'names': knownNames}    
    s = Session()
    user = User(name, email, rfc, data)
    s.add(user)
    s.commit()

#----------IDE and Passport REC & EXT----------

def IDE_PASS_DE_EXT(request):
    data = {'success': False, 'face': True}
    if request.method == "POST":
        direction = str(request.form['direction'])
        if request.files.get("image"):
            name = session['username']
            img = request.files["image"].read()
            img = np.array(Image.open(io.BytesIO(img)))
            dirName = "static/dataset/" + name

            if not os.path.exists(dirName):
                os.makedirs(dirName)
                print("Directory " , dirName ,  " Created ")

            plt.imsave("static/dataset/" + name + "/id_card.png", img)

            if direction == 'front':
                is_id_card = cropping_id_card(name, 0) 
                face = sift(img)
                if is_id_card == False:
                    data['success'] = False
                elif face is None:
                    data['success'] = True
                    data['face'] = False
                else:
                    data['success'] = True
                    plt.imsave("static/dataset/" + name + "/crop_face.png", face)
            elif direction == 'back':
                is_id_card = cropping_id_card(name, 1) 
                face = sift(img)
                if is_id_card == False:
                    data['success'] = False
                elif not face is None:
                    data['success'] = True
                    data['face'] = False
                else:
                    session['id_capture'] = True
                    data['success'] = True
                    
    return data


#----------Face recognition and liveness----------
user_img = ""

def face_recogtnition_liveness(request, type):

    data = {
        'success': False,
        'id_ver': False,
        'is_cal': False,
        'is_start': False,
        'final': False,
        'not_find_face':False,
        'message': "OK",
        'check_user_face': True,
        'name': "Unknown",
        'token': 'Unknown'
    }

    if request.method == "POST":
        question = str(request.form['question'])
        if type != 'mobile_auth':
            latitude = str(request.form['latitude'])
            longitude = str(request.form['longitude'])
            session['latitude'] = latitude
            session['longitude'] = longitude
            if type == 'onboarding':
                count = int(request.form['counting'])
                deviceID = str(request.form['deviceID'])
        
        global flg
        global user_img        
        global number_question
        global image_array
        global questionA
        
        if type != 'mobile_auth':
            name = session['username']
            email = session['useremail']

        if request.files.get("image"):
            img = request.files["image"].read()
            img = np.array(Image.open(io.BytesIO(img)))
            
            flag = 0
            if question == 'final_img':
                if (type != 'onboarding' and flg == 0) or type == 'onboarding': 
                    user_img = img
                    img_find_face = sift(img)
                    data['final'] = True
                    flg = 1
                    if not img_find_face is None:
                        img1 = img
                        if type == 'onboarding':
                            result, result1 = face_recog(name, img1)
                            print(result, result1)
                            if result1 == "fail":
                                data["check_user_face"] = False
                            elif (result == "pass"):
                                plt.imsave("static/dataset/" + name + "/liveness_face.png", img1)
                                data['id_ver'] = True
                            else :
                                session['id_capture'] = False
                            
                        elif type == 'recognition':
                            result = recognize(img, email)
                            if result == 'pass':
                                data['name'] = name
                            else :
                                session['id_capture'] = False
                        elif type == 'mobile_auth':
                            name, RFC = find_user_by_face(img)
                            if RFC != 'Unknown':
                                res = requests.get('https://www.fiscoclic.mx/Nomina/rh/FCRH_firmadigital/SRV_getTokenEmployee/' + RFC + '/64149268b413283aabe549819acaf9249c90a3231ca4b1939d2ed140a76f56e1/')
                                ressss = res.json()
                                print(ressss)
                                if ressss['status'] == 'OK':
                                    data['token'] = ressss['message']
                                    data['name'] = name
                                else :
                                    data['token'] = ressss['message']
                    else: data['not_find_face'] = True
                    return data
            elif number_question < 25:
                flg = 0
                if number_question == 1:
                    questionA = question
                number_question += 1
                image_array.append(img)
            if number_question == 25:
                flag = 1
                number_question = 0
                challenge_res = detect(image_array, questionA)
                image_array = []
            if flag == 1:
                data['is_cal'] = True
                if challenge_res == 'pass':
                    data['success'] = True
                    if type == 'onboarding' and count == 1:
                        with open("static/dataset/" + name + "/liveness_face.png", "rb") as img_file:
                            my_string1 = base64.b64encode(img_file.read())
                        with open("static/dataset/" + name + "/front.png", "rb") as img_file:
                            my_string = base64.b64encode(img_file.read())
                        with open("static/dataset/" + name + "/back.png", "rb") as img_file:
                            my_string2 = base64.b64encode(img_file.read())
                        data1 = { 
                            "base64frontidcardpicture": my_string.decode(), 
                            "base64backidcardpicture": my_string2.decode(),
                            "base64frontemployeepicture": my_string1.decode(), 
                            "token": session['usertoken'], 
                            "gpslatitude": str(latitude),  
                            "gpslongitude": str(longitude), 
                            "ide": session['useride'],
                            "deviceID": deviceID
                        }

                        print(data1['token'], data1['gpslatitude'], data1['gpslongitude'], data1['ide'], data1['deviceID'])

                        headers = {'content-type': 'application/json'}
                        data1 = json.dumps(data1)
                        res = requests.post('https://www.fiscoclic.mx/Nomina/rh/FCRH_firmadigital/SRV_onboardUser/', headers = headers, data=data1)
                        print(res.text)
                        ressss = res.json()
                        if(ressss['status'] == "ERROR"):
                            data['message'] = ressss['messageprocessed']
                        else : 
                            data['message'] = "OK"
                            encode_face(user_img, name, email, 'hog')
    return data
