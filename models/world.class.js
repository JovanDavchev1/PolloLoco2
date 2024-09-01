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
    statusBarBottles = new BottlesStatusBar();
    statusBarCoins = new CoinsStatusBar();
    maxCoins = 10;
    collectedCoins = 0;
    maxBottles = 10;
    gameOver = false; // Flag to check if the game is over
    gameOverScreen = new GameOverScreen()
    debug = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        console.log('Game started is ', this.gameStarted)
        this.draw();
        this.setWorld();
        this.statusBarBottles.setPercentage(this.getBottlesPercentage());

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
        if (this.gameStarted && !this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.collectibles);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.addToMap(this.statusBarBottles);
            this.addToMap(this.statusBarCoins);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObject);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);

            this.ctx.translate(-this.camera_x, 0);

            this.checkCollisions(); // Move collision check here
            this.checkBottleCollisions(); // Move bottle collision check here

            requestAnimationFrame(() => this.draw());
        } else if (this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addToMap(this.gameOverScreen);
            // Stop the game loop
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.addToMap(this.startingScreen);
            requestAnimationFrame(() => this.draw());
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
        if (this.gameStarted && !this.gameOver) {
            setInterval(() => {
                this.checkCollisions();
                this.checkBottleCollisions();
                this.checkThrowObject();
                this.updateEnemies();
                if (this.character.isDead()) {
                    this.gameOver = true;
                }
            }, 100); // Check every 100 milliseconds
        }
    }



    getBottlesPercentage() {
        return (this.collectedBottles / this.maxBottles) * 100;
    }

    getCoinsPercentage() {
        return (this.collectedCoins / this.maxCoins) * 100;
    }

    checkThrowObject() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this);
            this.throwableObject.push(bottle);
            this.collectedBottles--; // Decrease the count of collected bottles
            this.statusBarBottles.setPercentage(this.getBottlesPercentage());
            console.log('Bottle thrown! Remaining:', this.collectedBottles);
        }
    }

    checkCollisions() {
        // Check collisions with enemies first
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Character hit by enemy! Energy:', this.character.energy);
            }
        });

        // Check for collectible collisions
        this.level.collectibles.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                if (collectible.type === 'bottle') {
                    this.collectedBottles++;
                    this.statusBarBottles.setPercentage(this.getBottlesPercentage());
                    console.log('Bottle collected! Total:', this.collectedBottles);
                } else if (collectible.type === 'coin') {
                    this.collectedCoins++;
                    this.statusBarCoins.setPercentage(this.getCoinsPercentage());
                    console.log('Coin collected! Total:', this.collectedCoins);
                }
                // Remove the collected item from the world
                this.level.collectibles.splice(index, 1);
            }
        });

        // Remove dead chickens

    }

    checkBottleCollisions() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    console.log('Collision detected with:', enemy.constructor.name);
                    if (typeof enemy.hitByBottle === 'function') {
                        bottle.bottleSplash(); // Trigger splash effect
                        enemy.hitByBottle();  // Call hitByBottle method
                    } else {
                        console.warn(`Enemy of type ${enemy.constructor.name} does not have a hitByBottle method.`);
                    }
                }
            });
        });
    }

    updateEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDeadFlag);
    }




}