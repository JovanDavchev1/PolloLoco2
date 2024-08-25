class level {
    enemies;
    clouds;
    backgroundObjects;
    collectibles;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, collectibles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectibles = collectibles; // Add collectibles to the level
    }
}