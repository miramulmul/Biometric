
import cv2
import dlib

detector = dlib.get_frontal_face_detector()

def findFaces(image):
    faces = detector(image)
    num_of_faces = len(faces)
    print("Number of Faces:", num_of_faces )
    if (not num_of_faces):
        return None

    for face in faces:
        x1 = face.left()
        y1 = face.top()
        x2 = face.right()
        y2 = face.bottom()
        cv2.rectangle(image, (x1, y1), (x2, y2), (255, 255 , 0), 3)
        face_crop = image[y1:y2, x1:x2]
        return face_crop

def resizeImage(image):
    h, w = image.shape[0:2]
    return cv2.resize(image, (int(w*1.3), int(h*1.3)), cv2.INTER_LINEAR)