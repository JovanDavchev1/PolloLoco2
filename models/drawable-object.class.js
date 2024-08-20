class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0
    y = 340;
    width = 100;
    hieght = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    drawBorder(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "10";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.hieght);
            ctx.stroke();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.hieght);
    }

}