import Cookie from "../game-objects/Cookie";

export class CookieFactory {
    static createCookie(scene) {
        
        const handleCreateCookie = () => {

            if (scene.cookies.children.size > 3) return;

            const x = Phaser.Math.Between(scene.gameMap.cookiesArea.startX, scene.gameMap.cookiesArea.endX);
            const y = Phaser.Math.Between(scene.gameMap.cookiesArea.endY, scene.gameMap.cookiesArea.endY);

            scene.cookies.add(new Cookie(scene, x, y, 'cookie'));
        }

        handleCreateCookie()

        scene.time.addEvent({
            delay: 3000, // Генерация каждые 3 секунды
            callback: handleCreateCookie,
            callbackScope: this,
            loop: true,
        });


    }


}