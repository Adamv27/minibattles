const socket = new WebSocket('ws://localhost:8000');

const createButton = document.getElementById('create');
const joinButton = document.getElementById('join');
const connectButton = document.getElementById('connect');
const codeInput = document.getElementById('room-input');
const roomCode = document.getElementById('room-code');
const canvas = document.getElementById('game-canvas');

createButton.addEventListener('click', (e) => {
  socket.send(JSON.stringify({'room': 'create'}));
});


const hideHome = () => {
  createButton.style.display = 'None';
  joinButton.style.display = 'None';
}

joinButton.addEventListener('click', (e) => {
  codeInput.style.display = 'inline';
  connectButton.style.display = 'inline';
  hideHome();
})


const codeIsValid = (code) => {
  return code.length == 6
}

connectButton.addEventListener('click', (e) => {
  const code = codeInput.value;
  if (codeIsValid(code)) {
    const message = {
      room: {
        join: code
      }
    };
    socket.send(JSON.stringify(message));
  }
})


const setupGame = code => {
  hideHome();
  connectButton.style.display = 'none';
  codeInput.style.display = 'none';
  canvas.style.display = 'inline';
  roomCode.style.display = 'inline';
  roomCode.textContent = code;
}

socket.onmessage = (event) => {
  const response = JSON.parse(event.data)
  if (response.joined) {
    setupGame(response.joined);
  } else if (response.error) {
    console.log(response.error);
  }
}
