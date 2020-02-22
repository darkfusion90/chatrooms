import requests
from random import randint

from user_tester import UserRequests
from room_tester import RoomRequests
import util

HOST_URL = 'http://localhost:8000'


class Tester:
    def __init__(self):
        self.session = requests.session()
        self.room_requests = RoomRequests(HOST_URL, self.session)
        self.user_requests = UserRequests(HOST_URL, self.session)

    def login(self, username, password):
        return self.session.post('{}/api/login'.format(HOST_URL), {'username': username, 'password': password})

    def test_user(self):
        username = util.get_random_username()

        create_response = self.user_requests.create_user(
            username, username, username)
        print('*'*30, '\nCreate User:\n', create_response.status_code,
              '\t', create_response.json())

        login_response = self.login(username, username)
        print('*'*30, '\nLogin User: \n',
              login_response.status_code, login_response.text)

        get_response = self.user_requests.get_user(
            create_response.json()['userId'])

        print('*'*30, '\nGet User: \n',
              get_response.status_code, get_response.json())

        update_response = self.user_requests.update_user(
            get_response.json()['userId'], {'username': 'updated-{}-{}'.format(username, randint(1, 1000))})

        print('*'*30, '\nUpdate User: \n',
              update_response.status_code, update_response.json())

        delete_response = self.user_requests.delete_user(
            get_response.json()['userId'])

        print('*'*30, '\nDelete User: \n', delete_response.status_code,
              delete_response.json())


tester = Tester()
tester.test_user()
