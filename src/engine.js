import TileSheet from "./tilesheet.js";

class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stopMain = 0;

    this.events = [];
    
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;

    this.tileSheet = new TileSheet();
    
    this.socket = new WebSocket("ws://localhost:8000");
    this.socket.addEventListener('open', (event) => {
      this.socket.send('Connection Established');
    })

    this.socket.addEventListener('message', (event) => {
      console.log(event.data);
    })
  }

  handleEvents() {
    this.events.forEach((event) => {
      console.log(event);
    })
    this.events = [];
  }

  update(tFrame) {
  
  }

  render() {
    this.resize();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio;
    
    this.canvas.width = rect.width * pixelRatio;
    this.canvas.height = rect.height * pixelRatio;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  enqueueEvent(event) {
    this.events.push(event);
  }
}

export default GameEngine;
