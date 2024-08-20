class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    enemies;
    throwableObject = [];
    statusBar = new StatusBar();
    gameStarted = false;
    startingScreen = new StartingScreen();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
       
        this.draw();
        this.setWorld();


    }

    setWorld() {
        this.character.world = this;
    }

    gameStart() {
        this.gameStarted = true;
        this.run();
        this.draw();
        this.setWorld();

    }



    draw() {


        if (this.gameStarted == true) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);

            this.ctx.translate(-this.camera_x, 0);
            // Space For fixed objects
            this.addObjectsToMap(this.throwableObject)
            this.addToMap(this.statusBar);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectsToMap(this.level.clouds)
            this.addObjectsToMap(this.level.enemies)

            this.ctx.translate(-this.camera_x, 0);
            self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.addToMap(this.startingScreen)
            self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirections) {
            this.flipImage(mo)
        }


        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);

        if (mo.otherDirections) {
            this.flipImageBack(mo)
        }


    }
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    run() {
        if (this.gameStarted == true) {
            setInterval(() => {
                this.checkCollisions();
                this.checkThrowObject();

            }, 1000)
        }
    }

    checkThrowObject() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(150, this.character.y + 100)
            this.throwableObject.push(bottle);
           
        }
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
                console.log('splash')
                this.throwableObject.splash(); 
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

}