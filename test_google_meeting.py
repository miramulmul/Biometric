# from __future__ import print_function

# import os.path

# from google.auth.transport.requests import Request
# from google.oauth2.credentials import Credentials
# from google_auth_oauthlib.flow import InstalledAppFlow
# from googleapiclient.discovery import build
# from googleapiclient.errors import HttpError

# # If modifying these scopes, delete the file token.json.
# SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly']


# def main():
#     """Shows basic usage of the Classroom API.
#     Prints the names of the first 10 courses the user has access to.
#     """
#     creds = None
#     # The file token.json stores the user's access and refresh tokens, and is
#     # created automatically when the authorization flow completes for the first
#     # time.
#     if os.path.exists('token.json'):
#         creds = Credentials.from_authorized_user_file('token.json', SCOPES)
#     # If there are no (valid) credentials available, let the user log in.
#     if not creds or not creds.valid:
#         if creds and creds.expired and creds.refresh_token:
#             creds.refresh(Request())
#         else:
#             flow = InstalledAppFlow.from_client_secrets_file(
#                 'credentials.json', SCOPES)
#             creds = flow.run_local_server(port=0)
#         # Save the credentials for the next run
#         with open('token.json', 'w') as token:
#             token.write(creds.to_json())

#     try:
#         service = build('classroom', 'v1', credentials=creds)

#         # Call the Classroom API
#         results = service.courses().list(pageSize=10).execute()
#         courses = results.get('courses', [])

#         if not courses:
#             print('No courses found.')
#             return
#         # Prints the names of the first 10 courses.
#         print('Courses:')
#         for course in courses:
#             print(course['name'])

#     except HttpError as error:
#         print('An error occurred: %s' % error)


# if __name__ == '__main__':
#     main()

# from gcsa.google_calendar import GoogleCalendar

# calendar = GoogleCalendar('your_email@gmail.com')
# for event in calendar:
#     print(event)

import datetime
import pickle
import os.path
from googleapiclient.errors import HttpError
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar']


def main():
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)

    if not os.path.isfile('.eventid'):
        print("[INFO] id file not found so creating one..")
        with open('.eventid','w') as f:
            pass
    else:
        # delete old event
        with open('.eventid','r') as filer:
            idread = filer.read()
            try:
                out = service.events().delete(calendarId='primary', eventId=idread).execute()
            except HttpError as err:
                if err.resp.status == 410:
                    print("[INFO] old event not found")
                else:
                    print("[INFO] unknown error")

    # get date
    date = datetime.date.today()
    date = date.strftime("%Y-%m-%d")

    # Call the Calendar API
    event = {
        'summary': 'gen gmeet link',
        'start': {
            'date': date,  
        },
        'end': {
            'date': date,
        },
        "conferenceData": {
            "createRequest": {
                "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                    },
                "requestId": "abblah"
            },
        },
        # 'attendees': [
        #     {'email': 'lpage@example.com'},
        #     {'email': 'sbrin@example.com'},
        # ],
        # 'reminders': {
        #     'useDefault': False,
        #     'overrides': [
        #     {'method': 'email', 'minutes': 24 * 60},
        #     {'method': 'popup', 'minutes': 10},
        #     ],
        # },
    }

    event = service.events().insert(calendarId='primary', conferenceDataVersion=1, body=event).execute()
    print('Event created: %s' % (event.get('htmlLink')))
    print(event.get('hangoutLink'))
    writeId(event.get('id'))

def writeId(id):
    filew = open('.eventid','w')
    filew.write(id)
    filew.close()

if __name__ == '__main__':
    main()