class Chicken extends MovableObject {
    height = 100;
    width = 100;
    isDeadFlag = false; // Flag to indicate if the chicken is dead

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); // Load the death image
        this.x = 1000 + Math.random() * 500;
        this.y = 350;
        this.speed = 0.5 * Math.random();
        this.energy = 20; // Chicken's energy
        this.animate();
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDeadFlag) {
                this.x -= this.speed;
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (!this.isDeadFlag) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    hitByBottle() {
        console.log('Chicken hit by bottle!');
        this.energy -= 20; // Decrease the chicken's energy
        if (this.energy <= 0) {
            this.die(); // Handle chicken death
        }
    }

    die() {
        console.log('Chicken died!');
        this.isDeadFlag = true; 
        this.speed = 0; 
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);

        this.playAnimation(this.IMAGES_DEAD); 

       
        setTimeout(() => {
            if (this.world) {
                this.world.level.enemies = this.world.level.enemies.filter(enemy => enemy !== this);
            }
        }, 1000);
    }

    isColliding(mo) {
        if (this.isDeadFlag) {
            return false; // Skip collision if the chicken is dead
        }
    }
}
