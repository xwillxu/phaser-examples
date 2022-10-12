import Phaser from 'phaser'

import HealthBar from './HealthBar'

export default class ContainerWithHealthBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, offsetX = 40, offsetY = 50, size = 1) {
        super(scene, x, y, children)
        scene.add.existing(this);
        this.scene = scene;
        this.hp = new HealthBar(scene, x, y, offsetX, offsetY, size);
    }

    damage(amount) {
        if (this.hp.decrease(amount)) {
            return true
        } else {
            return false
        }
    }

    removeHp() {
        this.hp.destroy()
    }

    update() {
        this.hp.update(this.x, this.y)
        if (!this.x || !this.y) {
            this.removeHp()
        }
    }
}