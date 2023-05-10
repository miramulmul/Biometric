import base64
import speech_recognition as sr
import moviepy.editor as mp

recognizer = sr.Recognizer()

def speech_recog(request):
    data = {
        "success": False,
        "message": ""
    }
    if request.method == "POST":
        content = request.json
        # print(content)
        encode_string = content['base64_string']
        type = content['type']
        file_type = content['file_type']

        print(type, file_type)
        deconde_string = base64.b64decode(encode_string)
        file = open("sample_audio/temp." + type, "wb")
        file.write(deconde_string)

        if(file_type == 'video'):
            clip = mp.VideoFileClip("sample_audio/temp." + type)
            clip.audio.write_audiofile("sample_audio/temp.wav",codec='pcm_s16le')
        else :
            clip = mp.AudioFileClip("sample_audio/temp." + type)
            clip.write_audiofile("sample_audio/temp.wav",codec='pcm_s16le')
        
        with sr.AudioFile("sample_audio/temp.wav") as source:
            recorded_audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(
                    recorded_audio, 
                    language="es-MX"
                )
            data['success'] = True
            data['message'] = text
            return data

        except Exception as ex:
            print(ex)
    return data
    