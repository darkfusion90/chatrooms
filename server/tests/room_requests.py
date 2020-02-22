import requests

BASE_URL = 'http://localhost:8000'


class RoomRequests:
    def __init__(self, session=requests.session()):
        self.session = session

    def get_room(self, id):
        return self.session.get('{base}/api/rooms/{id}'.format(base=BASE_URL, id=id))

    def get_all_rooms(self):
        return self.session.get('{}/api/rooms'.format(BASE_URL))

    def create_room(self, roomName, roomType):
        return self.session.post('{}/api/rooms'.format(BASE_URL), data={roomName: roomName, roomType: roomType})


class UserRequests:
    def __init__(self, session=requests.session()):
        self.session = session

    def create_user(self, username, password, confirmPassword):
        return self.session.post('{}/api/user'.format(BASE_URL), data={username, password, confirmPassword})

    def get_user(self, id):
        return self.session.get('{base}/api/user/{id}'.format(base=BASE_URL, id=id))

    def delete_user(self, id):
        return self.session.delete('{base}/api/user/{id}'.format(base=BASE_URL, id=id))

    def update_user(self, id, to_update):
        return self.session.patch('{base}/api/user/{id}'.format(base=BASE_URL, id=id), to_update)


class Tester:
    def __init__(self):
        self.session = requests.session()
        self.room_requests = RoomRequests(self.session)
        self.user_requests = RoomRequests(self.session)

    def login(self, username, password):
        return self.session.get('{}/api/login'.format(BASE_URL))


tester = Tester()
