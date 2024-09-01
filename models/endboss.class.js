class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;

    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 30
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2700;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 5000 / 60);
        setInterval(() => {
            this.x -= this.speed;
        }, 100 / 60);
    }

    hitByBottle() {
        console.log('Endboss hit by bottle!');
        this.energy -= 100; // Decrease boss's energy by 20, for example
        if (this.energy <= 0) {
            this.die(); // Implement die logic
        }
    }

    die() {
        console.log('Endboss died!');
        // Handle death (remove from game, play death animation, etc.)
    }
}
