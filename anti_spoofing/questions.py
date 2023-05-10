def challenge_result(question, out_model,blinks_up):
    if len(out_model["emotion"]):
        print(out_model["emotion"][0])
    if len(out_model["orientation"]):
        print(out_model["orientation"][0])
    if question == "Smile":
        if len(out_model["emotion"]) == 0:
            challenge = "fail"
        elif out_model["emotion"][0] == "happy": 
            challenge = "pass"
        else:
            challenge = "fail"
    
    elif question == "Surprise":
        if len(out_model["emotion"]) == 0:
            challenge = "fail"
        elif out_model["emotion"][0] == "surprise": 
            challenge = "pass"
        else:
            challenge = "fail"

    elif question == "Angry":
        if len(out_model["emotion"]) == 0:
            challenge = "fail"
        elif out_model["emotion"][0] == "angry": 
            challenge = "pass"
        else:
            challenge = "fail"

    elif question == "TurnFaceRight":
        if len(out_model["orientation"]) == 0:
            challenge = "fail"
        elif out_model["orientation"][0] == "right": 
            challenge = "pass"
        else:
            challenge = "fail"

    elif question == "TurnFaceLeft":
        if len(out_model["orientation"]) == 0:
            challenge = "fail"
        elif out_model["orientation"][0] == "left": 
            challenge = "pass"
        else:
            challenge = "fail"

    elif question == "BlinkEyes":
        if blinks_up == 1: 
            challenge = "pass"
        else:
            challenge = "fail"

    challenge = "pass"
    return challenge