class cloud extends MovableObject {
    
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = -150 + Math.random() * 500;
        this.y = 50
        this.width = 500
        this.hieght = 250
        this.animate()
    
    }
    animate() {
        this.moveLeft()
    }
    moveLeft() {
        setInterval( () => {
            this.x -= 0.15;
        }, 100/60)
    }
}