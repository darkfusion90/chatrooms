import requests
from random import randint

from user_tester import UserRequests
from room_tester import RoomRequests
import util

HOST_URL = 'http://localhost:8000'

COLOR_RESET = '\033[0m'


def print_star_line(color=COLOR_RESET):
    print(color, '*'*120, '\n', COLOR_RESET, sep='')


class UserTester:
    def __init__(self, session):
        self.session = session
        self.user_requests = UserRequests(HOST_URL, session)
        self.user = dict({})
        self.pw = None

    def login(self):
        username = self.user['username']
        password = self.pw
        return self.session.post('{}/api/login'.format(HOST_URL), {'username': username, 'password': password})

    def logout(self):
        return self.session.post('{}/api/logout'.format(HOST_URL))

    def test_create_user(self, username, pw, confirmPw):
        res = self.user_requests.create_user(username, pw, confirmPw)
        self.user = res.json()
        self.pw = username
        print_star_line('\033[32;1m')
        print('Create User:\n', res.status_code, '\t', res.text)
        print('self.user: ', self.user)
        print_star_line('\033[32;1m')

    def test_login(self):
        res = self.login()
        assert(res.status_code == 200)
        self.user = res.json()
        print_star_line('\033[33;1m')
        print('Login User: \n', res.status_code, res.text)
        print('self.user: ', self.user)
        print_star_line('\033[33;1m')

    def test_logout(self):
        res = self.logout()
        print_star_line('\033[34;1m')
        print('Logout: ', res.status_code, res.text)
        print('self.user: ', self.user)
        print_star_line('\033[34;1m')

    def test_get_user(self, after_delete=False):
        userId = None
        without_id = False
        try:
            userId = self.user['userId']
        except KeyError:
            without_id = True

        print_star_line('\033[35;1m')
        print('Get User: (userId -> {})'.format(userId))

        if without_id:
            res = self.user_requests.get_current_user()
        else:
            res = self.user_requests.get_user(userId)

        if after_delete:
            assert(res.status_code == 404)

        print(res.status_code, res.text)
        print('self.user: ', self.user)
        print_star_line('\033[35;1m')

    def test_update_user(self, to_update=['username']):
        updates = dict({})
        for field in to_update:
            updates[field] = UserTester.get_random_updated_field(
                self.user[field])

        res = self.user_requests.update_user(self.user['userId'], updates)
        self.user = res.json()
        print_star_line('\033[36;1m')
        print('Update User: \n', res.status_code, res.text)
        print('self.user: ', self.user)
        print_star_line('\033[36;1m')

    def test_delete_user(self):
        res = self.user_requests.delete_user(self.user['userId'])
        print_star_line('\033[37;1m')
        print('Delete User: \n', res.status_code, res.text)
        print('self.user: ', self.user)
        print_star_line('\033[37;1m')

    @staticmethod
    def get_random_updated_field(field):
        return 'updated-{}-{}'.format(field, randint(1, 1000))


class Tester:
    def __init__(self):
        self.session = requests.session()
        self.user_tester = UserTester(self.session)

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
