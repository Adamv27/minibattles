import json
import asyncio
import websockets
from collections import defaultdict
from rooms import handle_room_actions 


async def handler(websocket, path):
    async for message in websocket:
        print(message)
        if message == 'Connection Established':
            continue
        try:
            message = json.loads(message)
            if 'room' in message:
                await handle_room_actions(websocket, message)
        except:
            print('Socket Closed') 
        print()


server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
