class Character extends MovableObject {
    x = 120;
    y = 120;
    hieght = 320
    width = 150
    speed = 5


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
        this.applyGravity()
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause()
          
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight()
                this.walking_sound.play()
                this.otherDirections = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft()
                this.walking_sound.play()
                this.otherDirections = true;
            }

            if (this.world.keyboard.SPACE && !this.isAbovaGround()) {
                //if (this.isOnGround()) {
                this.jump();
                this.jumping_sound.play()
                // }
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isHurth()) {
                this.playAnimation(this.IMAGES_HURTH)
            }
            else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            }
            else if (this.isAbovaGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING)

                }
            }
        }, 100);




    }


}