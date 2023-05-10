import cv2
from id_card_cropping.cropped_img.utlis import correctPerspective
def cropping(img):
    img1 = cv2.cvtColor(img , cv2.COLOR_BGR2RGB)
    final_img = correctPerspective(img1)
    final_img = cv2.cvtColor(final_img , cv2.COLOR_BGR2RGB)
    return final_img
