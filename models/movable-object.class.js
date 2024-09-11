class MovableObject extends DrawableObject {

    speed = 0.15
    otherDirections = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    invincible = false;
    invincibilityDuration = 2000

    

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
        if (this.isDeadFlag) {
            return false; 
        }
        const buffer = 10; // Buffer size
        return this.x + this.width - this.offset.right + buffer > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom + buffer > mo.y + mo.offset.top &&
            this.x + this.offset.left - buffer < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top - buffer < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        if (this.invincible) return; // Ignore hits if invincible

        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.invincible = true;
            setTimeout(() => this.invincible = false, this.invincibilityDuration); // Reset invincibility after duration
        }
    }


    isHurth() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 2000; // Adjust the cooldown time to 2 seconds
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