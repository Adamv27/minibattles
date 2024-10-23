import json
import asyncio
import websockets
from collections import defaultdict


OPEN_ROOMS = defaultdict(list)
ROOM_LIMIT = 2


async def try_create_room(websocket):
    room = 'ABCDEF'
    print('Created room: ABCDEF')
    OPEN_ROOMS[room].append(websocket)
    message = {'joined': room}
    await websocket.send(json.dumps(message))


async def try_join_room(websocket, room):
    message = {}
    if room not in OPEN_ROOMS:
        message = {'error': f'Room: {room} does not exist.'}
    
    elif len(OPEN_ROOMS[room]) < ROOM_LIMIT:
        OPEN_ROOMS[room].append(websocket)
        message = {'joined': room}
    else:
        message = {'error': f'Room: {room} is full.'}
    print(message) 
    await websocket.send(json.dumps(message))

async def handle_room_actions(websocket, message):
    action = message['room']
    if 'join' in action:
        code = action['join']['code']
        await try_join_room(websocket, code)
    elif action == 'create':
        await try_create_room(websocket)


async def handler(websocket, path):
    async for message in websocket:
        try:
            message = json.loads(message)
            print(message)
            if 'room' in message:
                await handle_room_actions(websocket, message)
        except:
            print('Socket Closed') 


server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
