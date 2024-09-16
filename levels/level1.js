
let level1;

function initlvl1() {
    const COIN_IMAGE = 'img/8_coin/coin_1.png';
    const BOTTLE_IMAGE_LEFT = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    const BOTTLE_IMAGE_RIGHT = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';

    console.log('start')

  
    

    level1 = new level(

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ],
        [

        ]

    );

    level1.collectibles.push(
        new Collectible(COIN_IMAGE, 200, 350, 'coin'),
        new Collectible(BOTTLE_IMAGE_LEFT, 400, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 600, 350, 'coin'),
        new Collectible(BOTTLE_IMAGE_LEFT, 800, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 750, 350, 'coin'),
        new Collectible(COIN_IMAGE, 800, 150, 'coin'),
        new Collectible(COIN_IMAGE, 850, 150, 'coin'),
        new Collectible(COIN_IMAGE, 900, 150, 'coin'),
        new Collectible(COIN_IMAGE, 950, 150, 'coin'),
        new Collectible(COIN_IMAGE, 1000, 150, 'coin'),
        new Collectible(BOTTLE_IMAGE_RIGHT, 1100, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 1200, 350, 'coin'),
        new Collectible(BOTTLE_IMAGE_RIGHT, 1300, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 1400, 350, 'coin'),
        new Collectible(BOTTLE_IMAGE_LEFT, 1500, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 1600, 350, 'coin'),
        new Collectible(BOTTLE_IMAGE_LEFT, 1100, 350, 'bottle'),
        new Collectible(BOTTLE_IMAGE_RIGHT, 1200, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 1200, 250, 'coin'),
        new Collectible(BOTTLE_IMAGE_RIGHT, 1300, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 1350, 200, 'coin'),
        new Collectible(BOTTLE_IMAGE_LEFT, 1450, 350, 'bottle'),
        new Collectible(COIN_IMAGE, 1600, 150, 'coin'),
        new Collectible(BOTTLE_IMAGE_LEFT, 1700, 350, 'bottle')
    );
    
   
}

