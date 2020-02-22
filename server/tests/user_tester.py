import requests
import util


class UserRequests:
    def __init__(self, host_url, session=requests.session()):
        self.session = session
        self.base_url = '{}/api/user'.format(host_url)

    def create_user(self, username, password, confirmPassword):
        data = {
            'username': username,
            'password': password,
            'confirmPassword': confirmPassword
        }
        return self.session.post('http://localhost:8000/api/register', data=data)

    def get_user(self, id):
        return self.session.get('{base}/{id}'.format(base=self.base_url, id=id))

    def get_current_user(self):
        return self.session.get(self.base_url)

    def delete_user(self, id):
        return self.session.delete('{base}/{id}'.format(base=self.base_url, id=id))

    def update_user(self, id, to_update):
        return self.session.patch('{base}/{id}'.format(base=self.base_url, id=id), to_update)


class UserTester:
    def __init__(self, host_url, session):
        self.host_url = host_url
        self.session = session
        self.user_requests = UserRequests(host_url, session)
        self.user = dict({})
        self.pw = None

    def login(self):
        username = self.user['username']
        password = self.pw
        return self.session.post('{}/api/login'.format(self.host_url), {'username': username, 'password': password})

    def logout(self):
        return self.session.post('{}/api/logout'.format(self.host_url))

    def test_create_user(self, username, pw, confirmPw):
        res = self.user_requests.create_user(username, pw, confirmPw)
        self.user = res.json()
        self.pw = username
        util.print_star_line('\033[32;1m')
        print('Create User:\n', res.status_code, '\t', res.text)
        print('self.user: ', self.user)
        util.print_star_line('\033[32;1m')

    def test_login(self):
        res = self.login()
        assert(res.status_code == 200)
        self.user = res.json()
        util.print_star_line('\033[33;1m')
        print('Login User: \n', res.status_code, res.text)
        print('self.user: ', self.user)
        util.print_star_line('\033[33;1m')

    def test_logout(self):
        res = self.logout()
        util.print_star_line('\033[34;1m')
        print('Logout: ', res.status_code, res.text)
        print('self.user: ', self.user)
        util.print_star_line('\033[34;1m')

    def test_get_user(self, after_delete=False):
        userId = None
        without_id = False
        try:
            userId = self.user['userId']
        except KeyError:
            without_id = True

        util.print_star_line('\033[35;1m')
        print('Get User: (userId -> {})'.format(userId))

        if without_id:
            res = self.user_requests.get_current_user()
        else:
            res = self.user_requests.get_user(userId)

        if after_delete:
            assert(res.status_code == 404)

        print(res.status_code, res.text)
        print('self.user: ', self.user)
        util.print_star_line('\033[35;1m')

    def test_update_user(self, to_update=['username']):
        updates = dict({})
        for field in to_update:
            updates[field] = UserTester.get_random_updated_field(
                self.user[field])

        res = self.user_requests.update_user(self.user['userId'], updates)
        self.user = res.json()
        util.print_star_line('\033[36;1m')
        print('Update User: \n', res.status_code, res.text)
        print('self.user: ', self.user)
        util.print_star_line('\033[36;1m')

    def test_delete_user(self):
        res = self.user_requests.delete_user(self.user['userId'])
        util.print_star_line('\033[37;1m')
        print('Delete User: \n', res.status_code, res.text)
        print('self.user: ', self.user)
        util.print_star_line('\033[37;1m')

    @staticmethod
    def get_random_updated_field(field):
        return 'updated-{}-{}'.format(field, randint(1, 1000))
