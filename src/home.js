const socket = new WebSocket('ws://localhost:8000');

const createButton = document.getElementById('create');
const joinButton = document.getElementById('join');
const connectButton = document.getElementById('connect');
const codeInput = document.getElementById('room-code');


createButton.addEventListener('click', (e) => {
  socket.send(JSON.stringify({'room': 'create'}));
});


joinButton.addEventListener('click', (e) => {
  const input = document.getElementById('room-code');
  input.style.display = 'inline';
  createButton.style.display = 'None';
  joinButton.style.display = 'None';
  connectButton.style.display = 'inline';
})


const codeIsValid = (code) => {
  return code.length == 6
}

connectButton.addEventListener('click', (e) => {
  const code = codeInput.value;
  if (codeIsValid(code)) {
    const message = {
      room: {
        join: {
          code: code
        }
      }
    };
    socket.send(JSON.stringify(message));
  }
})


socket.onmessage = (event) => {
  const response = JSON.parse(event.data)
  console.log(response);
  if (response.joined) {
    //window.location.assign(`src/pages/minibattles.html?room=${response.joined}`);
  } else if (response.error) {
    alert(response.error)
  }
}
