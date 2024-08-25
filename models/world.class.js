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
    collectibles = [];
    collectedBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        console.log('Game started is ', this.gameStarted)
        this.draw();
        this.setWorld();


    }

    setWorld() {
        this.character.world = this;
    }

    gameStart() {
        if (!this.gameStarted) {
            // Ensure level1 is initialized before starting the game
            if (!level1) {
                console.error('Level1 is not initialized.');
                return;
            }
            this.level = level1; // Use the globally initialized level1
            this.gameStarted = true;
            this.run();
            this.draw();
        }
    }

    draw() {


        if (this.gameStarted == true) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.collectibles); // Draw collectibles
            
            this.ctx.translate(-this.camera_x, 0);
            // Space For fixed objects
            
            this.addToMap(this.statusBar);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObject)
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
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.collectedBottles--; // Decrease the count of collected bottles
            console.log('Bottle thrown! Remaining:', this.collectedBottles);
    
            // Check if the thrown bottle collides with any enemy
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    console.log('splash');
                    bottle.splash(); // Assuming splash is a method of ThrowableObject
                }
            });
        }
    }
    


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
        this.level.collectibles.forEach((collectible, index) => {
            if (this.character.isColliding(collectible) && collectible.type === 'bottle') {
                this.collectedBottles++;
                this.level.collectibles.splice(index, 1); // Remove the collected bottle
                console.log('Bottle collected! Total:', this.collectedBottles);
            } else if (this.character.isColliding(collectible) && collectible.type === 'coin') {
                // Handle coin collection (if needed)
            }
        });
    }

}