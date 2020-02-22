import requests

class RoomRequests:
    def __init__(self, host_url, session=requests.session()):
        self.session = session
        self.base_url = '{}/api/rooms'.format(host_url)

    def get_room(self, id):
        return self.session.get('{base}/{id}'.format(base=self.base_url, id=id))

    def get_all_rooms(self):
        return self.session.get(self.base_url)

    def create_room(self, roomName, roomType):
        data = {roomName, roomType}
        return self.session.post(self.base_url, data=data)


