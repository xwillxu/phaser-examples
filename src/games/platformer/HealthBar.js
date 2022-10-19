import Phaser from "phaser"

export default class HealthBar {
    constructor(scene, x, y, offsetX, offsetY, size, maxHp = 100) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.offsetX = offsetX
        this.offsetY = offsetY
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
        this.size = size
        this.value = maxHp;
        this.maxHp = maxHp
        this.p = 76 / maxHp;

        this.draw();

        scene.add.existing(this.bar);
    }

    destroy() {
        this.bar.clear()
        this.bar.destroy()
    }

    update(x, y) {
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
        this.draw()
    }

    setHp(hpAmount) {
        this.value = hpAmount
        this.draw()
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRoundedRect(this.x, this.y, 80 * this.size, 16 * this.size, 10);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRoundedRect(this.x + 2, this.y + 2, 76 * this.size, 12 * this.size, 10);

        const decimal = this.value / this.maxHp

        if (decimal == 1) {
            this.bar.visible = false
        } else {
            this.bar.visible = true
            if (decimal <= 0.3) {
                this.bar.fillStyle(0xff0000)
            } else {
                this.bar.fillStyle(0x00ff00)
            }
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRoundedRect(this.x + 2, this.y + 2, d * this.size, 12 * this.size, 10);
    }

}
