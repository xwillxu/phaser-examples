import SpriteWithHealthBar from './SpriteWithHealthBar'

export default class BossSprite extends SpriteWithHealthBar {
    lastShootTime = 0

    shoot(scene, time) {
        console.log('Works')
        const intervalFromLastShot = time - this.lastShootTime
        const limit = 350
        if (intervalFromLastShot < limit) {
            return
        }

        scene.bossBullet()
        this.lastShootTime = time
    }
}