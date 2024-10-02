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
    statusBarBoss = new StatusBarBoss()
    sound_coin_pickup = new Audio('audio/coin.mp3')
    sound_bottle_pickup = new Audio('audio/bottle.mp3')

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        console.log('Game started is ', this.gameStarted)
        this.draw();
        this.setWorld();
        this.sound_coin_pickup.pause()
        this.sound_bottle_pickup.pause()
    }

    setWorld() {
        this.character.world = this;
    }

    gameStart() {
        if (!this.gameStarted) {

            if (!level1) {
                console.error('Level1 is not initialized.');
                return;
            }

            this.level = level1;
            this.gameStarted = true;
            this.run();
            this.draw();
        }
    }

    draw() {
        if (this.gameStarted && !this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.unMovableObjects()
            this.ctx.translate(-this.camera_x, 0);
            this.statusBars()
            this.ctx.translate(this.camera_x, 0);
            this.playerDraw()
            this.ctx.translate(-this.camera_x, 0);
            this.checkCollisions();
            this.checkBottleCollisions();
            requestAnimationFrame(() => this.draw());
        } else if (this.gameOver) {
            this.gameOverDraw()
        } else {
            this.startingScreenDraw()
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

    updateBossStatusBar() {
        let boss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (boss) {
            this.statusBarBoss.setPercentage(boss.energy);
        }
    }

    run() {
        if (this.gameStarted && !this.gameOver) {
            setInterval(() => {
                this.checkCollisions();
                this.checkBottleCollisions();
                this.checkThrowObject();
                this.updateEnemies();
                this.updateBossStatusBar();
                if (this.character.isDead()) {
                    this.gameOver = true;
                }
            }, 100);
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
        this.enemyColision()
        this.colectibleColision()
    }

    checkBottleCollisions() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (typeof enemy.hitByBottle === 'function') {
                        bottle.bottleSplash();
                        enemy.hitByBottle();
                    }
                }
                if (bottle.y >= 380) {
                    bottle.bottleSplash();
                }
            });
        });
    }

    updateEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDeadFlag);
    }

    enemyColision() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDeadFlag && this.character.isColliding(enemy)) {
                if (this.character.isCollidingFromAbove(enemy)) {
                    enemy.die();
                    this.character.speedY = 20;
                    console.log('inside coliding above')
                } else if (!enemy.isDeadFlag) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    colectibleColision() {
        this.level.collectibles.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                if (collectible.type === 'bottle') {
                    this.sound_bottle_pickup.play()
                    this.collectedBottles++;
                    this.statusBarBottles.setPercentage(this.getBottlesPercentage());
                } else if (collectible.type === 'coin') {
                    this.sound_coin_pickup.play()
                    this.collectedCoins++;
                    this.statusBarCoins.setPercentage(this.getCoinsPercentage());
                }
                this.level.collectibles.splice(index, 1);
            }
        });
    }

    statusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBoss);
    }

    unMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.collectibles);
    }

    playerDraw() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
    }

    gameOverDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.gameOverScreen);
    }

    startingScreenDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.startingScreen);

        requestAnimationFrame(() => this.draw());
    }
}

