import SpriteWithHealthBar from './SpriteWithHealthBar'

export default class BossSprite extends SpriteWithHealthBar {
    lastShootTime = 0

    shoot(scene, time) {
        console.log('Works')
        const intervalFromLastShot = time - this.lastShootTime
        const limit = 300
        if (intervalFromLastShot < limit) {
            return
        }

        this.bossBullet(scene)
        this.lastShootTime = time
    }

    bossBullet(scene) {
        if (!scene.boss || !scene.boss.body) {
            return
        }
        const projectile_sprite = scene.matter.add.sprite(scene.boss.x, scene.boss.y, 'laser', 0, {
            isSensor: true, label: 'bossbullet', ignoreGravity: true, frictionAir: 0
        })


        projectile_sprite.setScale(0.06, 0.12)
        const velocity = scene.speed * 1.1

        let xDist = scene.playerSprite.x - scene.boss.x;
        let yDist = scene.playerSprite.y - scene.boss.y;
        let angle = Math.atan2(yDist, xDist);
        let velocityX = Math.cos(angle) * velocity
        let velocityY = Math.sin(angle) * velocity

        projectile_sprite.setVelocityX(velocityX)
        projectile_sprite.setVelocityY(velocityY)

        const degree = angle * (180 / Math.PI)

        projectile_sprite.setAngle(degree)

        const self = scene

        setTimeout(function () { self.destroy(projectile_sprite) }, 10000)


    }
}