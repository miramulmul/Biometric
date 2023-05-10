import cv2
from difflib import SequenceMatcher
from paddleocr import PaddleOCR

ocr = PaddleOCR(lang='en')
img_path = 'IDE/5.jpg'
id_card = cv2.imread(img_path)
height, width, _ = id_card.shape
id_card = cv2.resize(id_card, (int(width*1.1), int(height * 1.1)))

def substring_after(s, delim):
    return s.partition(delim)[2]

def removeprespace(s):
    if len(s) != 0 and s[0] == ' ':
        return s[1:]
    return s
def check_card(sentence):
    ratio = SequenceMatcher(None, sentence, "INSTITUTO NACIONAL ELECTORAL").ratio()
    if ratio >= 0.9 :
        return 'IDE'
    ratio = SequenceMatcher(None, sentence, "ESTADOS UNIDOS MEXICANOS").ratio()
    if ratio >= 0.9 :
        return 'Passport'


ocr_result = {
    "TIPO": "",
    "APELLIDO": "",
    "NOMBRES": "",
    "FECHA DE NACIMIENTO": "",
    "SEXO": "",
    "DOMICILIO": [
        "",
        "",
        ""
    ],
    "CLAVE DE ELECTOR": "",
    "CURP": "",
    "ANO DE REGISTRO": "",
    "ESTADO": "",
    "MUNICIPIO": "",
    "SECCION": "",
    "LOCALIDAD": "",
    "EMISION": "",
    "VIGENCIA": ""
}

find_name = [
    "CLAVE DE ELECTOR",
    "CURP",
    "ANO DE REGISTRO",
    "ESTADO",
    "MUNICIPIO",
    "SECCION",
    "LOCALIDAD",
    "EMISION",
    "VIGENCIA",
]

result = ocr.ocr(id_card, det = True, rec=True)
for idx in range(len(result)):
    res = result[idx]
    print(res)
    if 'IDE' == check_card(res[0][1][0]):
        ocr_result['TIPO'] = 'IDE'
        ocr_result['APELLIDO'] = res[5][1][0] + ' ' + res[7][1][0]
        ocr_result['NOMBRES'] = res[9][1][0]
        ocr_result['FECHA DE NACIMIENTO'] = res[6][1][0]
        sexo_string = res[8][1][0]; ocr_result['SEXO'] = sexo_string[-1]
        j = 0; i = 11
        while len(substring_after(res[i][1][0], 'ECTOR')) == 0:
            ocr_result['DOMICILIO'][j] = res[i][1][0]
            i = i + 1; j = j + 1
        for k in range(0, 9):
            substr = find_name[k]; flg = 1
            if substr == 'CLAVE DE ELECTOR':
                substr = 'ELECTOR'; flg = 0
            if substr == 'ANO DE REGISTRO':
                substr = 'REGISTRO'; flg = 0
            result = substring_after(res[i][1][0], substr)
            if flg == 1 and len(res[i][1][0].partition(substr)[0]) > 0:
                ocr_result[find_name[k - 1]] += res[i][1][0].partition(substr)[0]
            ocr_result[find_name[k]] = removeprespace(result); i = i + 1

    elif 'Passport' == check_card(res[0][1][0]):
        ocr_result['Type'] = 'Passport'
    else:
        print("Error: Please insert IDE or Passport")

print(ocr_result)