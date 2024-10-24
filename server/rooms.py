import json
from datetime import datetime


class RoomManager:
    def __init__(self):
        self.rooms = {}
        self.ROOM_SIZE = 2

    def createNewRoom(self):
        now = datetime.now()
        code = ''
        code += ALPHA[now.year % 24]
        code += ALPHA[now.month % 24]
        code += ALPHA[now.day % 24]
        code += ALPHA[now.hour % 24]
        code += ALPHA[now.minute % 24]
        code += ALPHA[now.second % 24]

        if code in self.rooms:
            return code

        self.rooms[code] = []
        return code

    async def try_join_room(self, websocket, code):
        message = {}
        if code not in self.rooms:
            message = {'error': f'Room: {code} does not exist.'}
        elif len(self.rooms[code]) >= self.ROOM_SIZE:
            message = {'error': f'Room: {code} is full.'}
        else:
            self.rooms[code].append(websocket)
            message = {'joined': code}
        await websocket.send(json.dumps(message))


ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
ROOM_MANAGER = RoomManager()


async def handle_room_actions(websocket, message):
    action = message['room']
    if 'join' in action:
        code = action['join']
        await ROOM_MANAGER.try_join_room(websocket, code)
    elif action == 'create':
        code = ROOM_MANAGER.createNewRoom()
        await ROOM_MANAGER.try_join_room(websocket, code)
