let canvas;
let world;
let keyboard = new Keyboard();

starting_music = new Audio('audio/startmusic.mp3')

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard)
}

function startGame() {
  starting_music.pause()
  initlvl1();
  document.getElementById('menu-conteiner').classList.add('d-none')
  document.getElementById('resetButtonConteiner').classList.remove('d-none')
  world.gameStart();
}

function resetGame() {
  // Re-initialize game
  initlvl1();
  world = new World(canvas, keyboard); // Create a new world
  document.getElementById('resetButtonConteiner').classList.add('d-none')
  document.getElementById('menu-conteiner').classList.remove('d-none'); // Optionally show the menu again
}

function toggleFullScreen() {
  const canvas = document.getElementById('canvas');

  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { // Firefox
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, Opera
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { // IE/Edge
    canvas.msRequestFullscreen();
  }
}

function toggleStartingMusic() {

}
function toggleMusic() {
  const myAudio = document.getElementById('myAudio');
  const musicButton = document.getElementById('musicButton');

  if (myAudio.paused) {
    myAudio.play();
    musicButton.src = 'img/sound off.png'; 
  } else {
    myAudio.pause();
    musicButton.src = 'img/sound-on.png'; 
  }
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

window.onload = init;