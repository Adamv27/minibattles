import GameEngine from "./engine.js";

const canvas = document.getElementById("game-canvas");
const game = new GameEngine(canvas);

;(() => {
  function main(tFrame) {
    game.stopMain = window.requestAnimationFrame(main);
    game.update(tFrame);
    game.render();
  }

  main();
})();

