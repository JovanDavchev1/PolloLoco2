class Chicken extends MovableObject {
    height = 100;
    width = 100;

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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1000 + Math.random() * 500;
        this.y = 350; // Set a default y position
       
        this.speed = 0.5 * Math.random();
        this.energy = 20; // Define energy for the chicken
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 100 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 5000 / 60);
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
        // Handle the chicken's death (remove from the game, play death animation, etc.)
        if (this.world) {
            this.world.level.enemies = this.world.level.enemies.filter(enemy => enemy !== this);
        }
    }
}
