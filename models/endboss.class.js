class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  speed = 10;
  attack = false;
  direction = 'left';
  energy = 100;
  active = true;
  statusBarEndBoss = new StatusBarBoss();
  isHurt = false; // New flag for managing hurt state

  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30
  };

  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png"
  ];

  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png"
    
  ];

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

  hadFirstContact = false;
  join_sound = new Audio('audio/boss.mp3');

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);

    this.x = 2700;
    this.animate();
  }

  animate() {
    let i = 0;
    let spawningFinished = false;
    let animationInterval = setInterval(() => {
      if (world.gameEnd) {
        clearInterval(animationInterval);
        return;
      }

      if (!spawningFinished && this.hadFirstContact) {
        if (i < this.IMAGES_ALERT.length * 3) {
          this.playAnimation(this.IMAGES_ALERT);
          if (i === 0) {
            this.join_sound.play();
          }
          i++;
        } else {
          spawningFinished = true;
        }
      } else if (this.hadFirstContact && !this.isHurt) { // Only move when not hurt
        this.endbossMove();
      }

      this.handleDeath();

      if (world.character.x > 2100 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
      }
    }, 100);
  }

  endbossMove() {
    if (this.energy <= 0) return;
    this.playAnimation(this.IMAGES_WALKING);

    if (this.direction === 'left') {
      if (this.x > 2100) {
        this.moveLeft();
      } else {
        this.direction = 'right';
        this.otherDirection = true;
      }
    } else if (this.direction === 'right') {
      if (this.x < 2700) {
        this.moveOtherDirection();
      } else {
        this.direction = 'left';
        this.otherDirection = false;
      }
    }
  }

  moveOtherDirection() {
    this.x += this.speed;
    this.otherDirection = true;
  }

  hitByBottle() {
    if (this.energy <= 0 || this.isInvulnerable) return;

    this.energy -= 35;
    world.bossEnergie -= 35;
    this.statusBarEndBoss.setPercentage(this.energy);

    if (this.energy > 0) {
      this.handleHurt();
    } else {
      this.die();
    }

    this.isInvulnerable = true;
    setTimeout(() => {
      this.isInvulnerable = false;
    }, 500);
  }

  handleHurt() {
    if (this.isHurt) return;

    this.isHurt = true;
    this.speed = 0;

    let hurtFrameIndex = 0;
    const hurtAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
      hurtFrameIndex++;

      if (hurtFrameIndex >= this.IMAGES_HURT.length * 3) {
        clearInterval(hurtAnimationInterval);
        this.isHurt = false;
        this.speed = 10; t
        this.randomMovement();
      }
    }, 250);
  }


  handleDeath() {
    if (this.energy <= 0 && this.active) {
      this.active = false;
      this.speed = 0;
      this.currentImage = 0;
      let frameIndex = 0;
      const totalFrames = this.IMAGES_DEAD.length;

      const deathAnimation = () => {
        if (frameIndex < totalFrames) {
          this.playAnimation(this.IMAGES_DEAD);
          frameIndex++;
          setTimeout(deathAnimation, 200);
        } else {
          world.gameEnd = true;
        }
      };
      deathAnimation();
    }
  }
  die() {
    return this.energy <= 0;
  }
}
