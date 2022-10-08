import Phaser from 'phaser'

import HealthBar from './HealthBar'

export default class SpriteWithHealthBar extends Phaser.Physics.Matter.Sprite {

    constructor(scene, x, y, key, frame, options) {
        super(scene.matter.world, x, y, key, frame, options);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setTexture(key);
        this.setFrame(frame);

        this.hp = new HealthBar(scene, x, y);

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
        if (this.body) {
            this.hp.update(this.x, this.y)
        }

    }
}
