import cv2

from ide_passport.find_face.utils import findFaces
from ide_passport.find_face.utils import resizeImage

def sift(img):
    template = img
    img1 = cv2.cvtColor(template, cv2.COLOR_BGR2RGB)
    img1 = resizeImage(img1)
    face_crop_img_query = findFaces(img1)
    return face_crop_img_query
