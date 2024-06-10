export class ResourceLoader {
    static preload(scene) {
        // Загружаем статичные изображения
        scene.load.image('map', 'src/game/assets/map.png');
        scene.load.image('cookie', 'src/game/assets/cookies/1.png');
        scene.load.image('car-front', 'src/game/assets/car/front.png');
        scene.load.image('car-back', 'src/game/assets/car/back.png');
        scene.load.image('car-left', 'src/game/assets/car/left.png');
        scene.load.image('car-right', 'src/game/assets/car/right.png');
        scene.load.image('loading', 'src/game/assets/car/loading.png');
        scene.load.image('loading-vert', 'src/game/assets/car/loading-vert.png');

        // Загружаем спрайты
        scene.load.spritesheet('hero',
            'src/game/assets/spritesheets/cook-sprite-full.png',
            { frameWidth: 60, frameHeight: 90 }
        );
    }
}