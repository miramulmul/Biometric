import cv2
import imutils
import os
from anti_spoofing.f_utils import *
import dlib
import numpy as np
from anti_spoofing.profile_detection.f_detector import detect_face_orientation
from anti_spoofing.emotion_detection.f_emotion_detection import predict_emotions
from anti_spoofing.blink_detection.f_blink_detection import eye_blink_detector

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
# instaciar detectores
frontal_face_detector    = dlib.get_frontal_face_detector()
profile_detector         = detect_face_orientation()
emotion_detector         = predict_emotions()
blink_detector           = eye_blink_detector() 



def detect_liveness(im,COUNTER=0,TOTAL=0):
    # preprocesar data
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    # face detection
    rectangles = frontal_face_detector(gray, 0)
    boxes_face = convert_rectangles2array(rectangles,im)
    if len(boxes_face)!=0:
        # usar solo el rostro con la cara mas grande
        areas = get_areas(boxes_face)
        index = np.argmax(areas)
        rectangles = rectangles[index]
        boxes_face = [list(boxes_face[index])]

        # -------------------------------------- emotion_detection ---------------------------------------
        '''
        input:
            - imagen RGB
            - boxes_face: [[579, 170, 693, 284]]
        output:
            - status: "ok"
            - emotion: ['happy'] or ['neutral'] ...
            - box: [[579, 170, 693, 284]]
        '''
        _,emotion = emotion_detector.get_emotion(im,boxes_face)
        # -------------------------------------- blink_detection ---------------------------------------
        '''
        input:
            - imagen gray
            - rectangles
        output:
            - status: "ok"
            - COUNTER: # frames consecutivos por debajo del umbral
            - TOTAL: # de parpadeos
        '''
        COUNTER,TOTAL = blink_detector.eye_blink(gray,rectangles,COUNTER,TOTAL)
    else:
        boxes_face = []
        emotion = []
        TOTAL = 0
        COUNTER = 0

    # -------------------------------------- profile_detection ---------------------------------------
    '''
    input:
        - imagen gray
    output:
        - status: "ok"
        - profile: ["right"] or ["left"]
        - box: [[579, 170, 693, 284]]
    '''
    box_orientation, orientation = profile_detector.face_orientation(gray)

    # -------------------------------------- output ---------------------------------------
    output = {
        'box_face_frontal': boxes_face,
        'box_orientation': box_orientation,
        'emotion': emotion,
        'orientation': orientation,
        'total_blinks': TOTAL,
        'count_blinks_consecutives': COUNTER
    }
    return output

