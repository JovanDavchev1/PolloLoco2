class ThrowableObject extends MovableObject {

    splash = false;
    throwAnimation;
    splashAnimation;
    currentFrame = 0;
    world;
    width = 70;
    height = 100; 
    characher;
    movingToTheRight = true;
    movingToTheLeft = false;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;

        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.world = world;
        this.trow();
        this.animate();
    };

    animate() {
        setInterval(() => {
            if (this.splash == true) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH)
                this.speedY = 0;
                this.speedX = 0;
                this.acceleration = 0;
            } else {
                this.playAnimation(this.IMAGES_ROTATING)
            }

        }, 100);
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        this.throwAnimation = setInterval(() => {
            if (!this.splash) {
                this.x += 10;
            }
        }, 25);
    }

    bottleSplash() {

        this.splash = true;
        clearInterval(this.throwAnimation);
        this.acceleration = 0;
        this.speedY = 0;
        this.speedX = 0;
        this.splashTimeout = setTimeout(() => {
            const index = this.world.throwableObject.indexOf(this);
            if (index > -1) {
                this.world.throwableObject.splice(index, 1);
            }
        }, 200);
    }


}