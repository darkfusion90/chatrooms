import requests

BASE_URL = 'http://localhost:8000'


class RoomRequests:
    def __init__(self, session=requests.session()):
        self.session = session
        self.base_url = '{}/api/rooms'.format(BASE_URL)

    def get_room(self, id):
        return self.session.get('{base}/{id}'.format(base=self.base_url, id=id))

    def get_all_rooms(self):
        return self.session.get(self.base_url)

    def create_room(self, roomName, roomType):
        data = {roomName, roomType}
        return self.session.post(self.base_url, data=data)


class UserRequests:
    def __init__(self, session=requests.session()):
        self.session = session
        self.base_url = '{}/api/user'.format(BASE_URL)

    def create_user(self, username, password, confirmPassword):
        data = {username, password, confirmPassword}
        return self.session.post(self.base_url, data=data)

    def get_user(self, id):
        return self.session.get('{base}/{id}'.format(base=self.base_url, id=id))

    def delete_user(self, id):
        return self.session.delete('{base}/{id}'.format(base=self.base_url, id=id))

    def update_user(self, id, to_update):
        return self.session.patch('{base}/{id}'.format(base=self.base_url, id=id), to_update)


class Tester:
    def __init__(self):
        self.session = requests.session()
        self.room_requests = RoomRequests(self.session)
        self.user_requests = RoomRequests(self.session)

    def login(self, username, password):
        return self.session.get('{}/api/login'.format(BASE_URL))


tester = Tester()
