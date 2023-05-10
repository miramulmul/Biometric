import random 
import cv2
import imutils
from anti_spoofing.f_liveness_detection import detect_liveness
import anti_spoofing.questions as questions

def detect(image_array, question):
    COUNTER, TOTAL = 0,0
    counter_ok_questions = 0
    counter_ok_consecutives = 0
    limit_consecutives = 3
    counter_try = 0

    flag = 'fail'
    for img in image_array:
        
        img = imutils.resize(img, width=720)
        img = cv2.flip(img, 1)
        # <----------------------- ingestar data 
        TOTAL_0 = TOTAL
        out_model = detect_liveness(img, COUNTER, TOTAL_0)
        TOTAL = out_model['total_blinks']
        COUNTER = out_model['count_blinks_consecutives']
        dif_blink = TOTAL - TOTAL_0
        if dif_blink > 0:
            blinks_up = 1
        else:
            blinks_up = 0

        challenge_res = questions.challenge_result(question, out_model, blinks_up)
        if challenge_res == "pass":
            counter_ok_consecutives += 1
            if counter_ok_consecutives == limit_consecutives:
                counter_ok_questions += 1
                counter_try = 0
                counter_ok_consecutives = 0
                flag = 'pass'
                break
            else:
                continue

        elif challenge_res == "fail":
            counter_try += 1
    return flag