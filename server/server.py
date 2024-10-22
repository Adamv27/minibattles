import asyncio
import websockets


async def handler(websocket, path):
    data = await websocket.recv()
    reply = f'Data recieved as: {data}!'
    print(reply)
    await websocket.send(reply)


server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
