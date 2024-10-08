class SmallChicken extends MovableObject {

    height = 50;
    width = 50;
    isDeadFlag = false;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    sound_chicken_die = new Audio('audio/diechiocken.mp3')

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1000 + Math.random() * 500;
        this.y = 377;
        this.speed = 1.5 * Math.random();
        this.energy = 10;
        this.animate();
        this.sound_chicken_die.pause()
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
        this.energy -= 20;
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        this.sound_chicken_die.play()
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
            return false;
        }
    }
}
