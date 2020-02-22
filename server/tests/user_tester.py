import requests


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
