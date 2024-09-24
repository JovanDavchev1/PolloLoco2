class Character extends MovableObject {

    invincible = false;
    invincibilityDuration = 2000

    x = 120;
    y = 120;
    height = 320
    width = 150
    speed = 15

    idleTimer = null;
    longIdleTimer = null;
    isMoving = false;
    idleForAfterSecond = false;
    idleForAfterFourSeconds = false;
    throwableObject = new ThrowableObject()

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",

    ];


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURTH = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('audio/Walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3')

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURTH);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity()
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
                this.otherDirections = false;
                this.isMoving = true;
                this.resetIdleTimers();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirections = true;
                this.isMoving = true;
                this.resetIdleTimers();
            }

            if (this.world.keyboard.SPACE && !this.isAbovaGround()) {
                this.jump();
                this.jumping_sound.play();
                this.isMoving = true;
                this.resetIdleTimers();
            }

            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE) {
                this.isMoving = false;
                this.startIdleTimers();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isHurth()) {
                this.playAnimation(this.IMAGES_HURTH);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isAbovaGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.idleForAfterFourSeconds) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else if (this.idleForAfterSecond) {
                this.playAnimation(this.IMAGES_IDLE);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    handleIdleState() {
        if (!this.isMoving) {
            this.startIdleTimers();
        }
    }

    startIdleTimers() {
        if (!this.idleTimer) {
            this.idleTimer = setTimeout(() => {
                if (!this.isMoving) {
                    this.idleForAfterSecond = true;
                    this.idleForAfterFourSeconds = false; 
                }
            }, 1000);
        }

        if (!this.longIdleTimer) {
            this.longIdleTimer = setTimeout(() => {
                if (!this.isMoving) {
                    this.idleForAfterSecond = false; 
                    this.idleForAfterFourSeconds = true;
                }
            }, 4000);
        }
    }

    resetIdleTimers() {
        clearTimeout(this.idleTimer);
        clearTimeout(this.longIdleTimer);
        this.idleTimer = null;
        this.longIdleTimer = null;
        this.idleForAfterSecond = false;
        this.idleForAfterFourSeconds = false; 
    }
}

