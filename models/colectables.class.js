class Collectible extends DrawableObject {


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    constructor(imagePath, x, y, type) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 70; // Set appropriate width for collectible
        this.height = 100; // Set appropriate height for collectible
        this.type = type;
    }
}
