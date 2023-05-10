import cv2
import easyocr
from PIL import Image

def IDE_PASS_OCR():
    reader = easyocr.Reader(['en'])

    id_card = Image.open('photo_2023-04-10_17-55-32.png')
    width, height = id_card.size
    id_card.resize((1024, 1024)).save('photo_2023-04-10_17-55-321.png', quality=100)

    result = reader.readtext('photo_2023-04-10_17-34-46.jpg')

    print(result)