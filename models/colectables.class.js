class Collectible extends DrawableObject {

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    BOTTLE_IMAGES = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ]

    constructor(imagePath, x, y, type) {
        super();
        this.loadImage(imagePath);
        this.loadImages(this.BOTTLE_IMAGES)
        this.x = x;
        this.y = y;
        this.width = 70; 
        this.height = 100; 
        this.type = type;

        // Animate the bottle if the type is 'bottle'
        if (this.type === 'bottle') {
            this.animateBottle();
        }
    }

    animateBottle() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGES);
        }, 500); // Toggle every 500ms
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }
}
