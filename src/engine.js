import TileSheet from "./tilesheet.js";

class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stopMain = 0;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.tileSheet = new TileSheet();
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
}

export default GameEngine;
