import requests
from random import randint

from user_tester import UserTester
from room_tester import RoomRequests
import util

HOST_URL = 'http://localhost:8000'


class Tester:
    def __init__(self):
        self.session = requests.session()
        self.user_tester = UserTester(HOST_URL, self.session)

    def test_user(self):
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


tester = Tester()
tester.test_user()
