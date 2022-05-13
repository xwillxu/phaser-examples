import SpriteWithHealthBar from './SpriteWithHealthBar'

export default class BossSprite extends SpriteWithHealthBar {
    lastShootTime = 0

    shoot(scene, time) {
        const intervalFromLastShot = time - this.lastShootTime
        const limit = 800 - scene.currentLevel * 200
        if (intervalFromLastShot < limit) {
            return
        }

        this.bossBullet(scene)
        this.lastShootTime = time
    }

    bossBullet(scene) {
        if (!this || !this.body) {
            return
        }


        let xDist = scene.playerSprite.x - this.x;
        let yDist = scene.playerSprite.y - this.y;

        let distance = Math.sqrt(xDist * xDist + yDist * yDist)

        if (distance > 800) {
            return
        }

        const projectile_sprite = scene.matter.add.sprite(this.x, this.y, 'laser', 0, {
            isSensor: true, label: 'bossbullet', ignoreGravity: true, frictionAir: 0
        })


        projectile_sprite.setScale(0.06, 0.12)
        const velocity = scene.speed * 1.1
        let angle = Math.atan2(yDist, xDist);
        let velocityX = Math.cos(angle) * velocity
        let velocityY = Math.sin(angle) * velocity

        projectile_sprite.setVelocityX(velocityX)
        projectile_sprite.setVelocityY(velocityY)

        const degree = angle * (180 / Math.PI)

        projectile_sprite.setAngle(degree)

        let range = 700 + scene.currentLevel * 250

        const self = scene

        setTimeout(function () { self.destroy(projectile_sprite) }, range)


    }
}