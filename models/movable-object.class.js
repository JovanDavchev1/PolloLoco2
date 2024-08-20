class MovableObject extends DrawableObject {

    speed = 0.15
    otherDirections = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAbovaGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

    isAbovaGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 120;
        }
    }

    isOnGround() {
        return this.y >= 120
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.hieght > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.hieght
    }

    hit() {
        this.energy -= 5
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurth() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000
        return timepassed < 2

    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    };
}