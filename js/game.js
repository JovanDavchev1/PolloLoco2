let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard)
  


  console.log('my character is', world.character)
  console.log('my enemie is', world.enemies)
  console.log('bacground', world.backgroundObjects)
  console.log('start', world.startingScreen)
}

function startGame() {
  
  if (typeof initlvl1 === 'function') {
      initlvl1();
  } else {
      console.error('initlvl1 function is not defined.');
  }


  document.getElementById('start-game').classList.add('d-none')
  world.gameStart();
}

document.addEventListener("keydown", (e) => {
  if(e.keyCode == 39){
    keyboard.RIGHT = true;
  }
  if(e.keyCode == 37){
    keyboard.LEFT = true;
  }
  if(e.keyCode == 38){
    keyboard.UP = true;
  }
  if(e.keyCode == 40){
    keyboard.DOWN = true;
  }
  if(e.keyCode == 32){
    keyboard.SPACE = true;
  }
  if(e.keyCode == 68){
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {
 
  if(e.keyCode == 39){
    keyboard.RIGHT = false;
  }
  if(e.keyCode == 37){
    keyboard.LEFT = false;
  }
  if(e.keyCode == 38){
    keyboard.UP = false;
  }
  if(e.keyCode == 40){
    keyboard.DOWN = false;
  }
  if(e.keyCode == 32){
    keyboard.SPACE = false;
  }
  if(e.keyCode == 68){
    keyboard.D = false;
  }
});

window.onload = init;