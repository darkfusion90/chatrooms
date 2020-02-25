import requests
from random import randint

from user_tester import UserTester, UserRequests
from room_tester import RoomRequests
import util

HOST_URL = 'http://localhost:8000'


class Tester:
    def __init__(self):
        self.session = requests.session()
        self.user_tester = UserTester(HOST_URL, self.session)

    def update_with_new_session(self):
        self.session = requests.session()

    def run_test(self):
        username = util.get_random_username()
        self.user_tester.test_get_user()
        self.user_tester.test_create_user(username, username, username)
        self.user_tester.test_login()
        self.user_tester.test_get_user()
        self.user_tester.test_update_user()
        self.user_tester.test_logout()
        self.user_tester.test_login()
        self.user_tester.test_delete_user()
        self.user_tester.test_get_user(True)


def bulk_test():
    session = requests.session()
    user_requests = UserRequests(HOST_URL, session)
    room_requests = RoomRequests(HOST_URL, session)

    for i in range(10):
        username = pw = confirmPw = util.get_random_username()
        res = user_requests.create_user(username, pw, confirmPw)
        if(res.status_code is not 200):
            continue

        print('\n\n\033[32;1mCreated User:\033[0m\n', res.json())
        for i in range(10):
            room_res = room_requests.create_room(
                util.get_random_room_name(), 'public')
            print('\n\033[35;1mCreated Room:\033[0m\n', room_res.json())

        session = requests.session()
        user_requests.session = session
        user_requests.session = session

bulk_test()