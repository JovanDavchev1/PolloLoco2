class Chicken extends MovableObject {
   
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
   
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 500
        this.speed = 0.5 * Math.random() * 0.25
        this.animate()
    }

   

    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 100 / 60)
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 5000 / 60);
       
    }
  
}