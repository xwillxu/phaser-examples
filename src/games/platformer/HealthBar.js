import Phaser from "phaser"

export default class HealthBar {
    constructor(scene, x, y, offsetX, offsetY, size) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.offsetX = offsetX
        this.offsetY = offsetY
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
        this.size = size
        this.value = 100;
        this.p = 76 / 100;

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
        this.bar.fillRect(this.x, this.y, 80 * this.size, 16 * this.size);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76 * this.size, 12 * this.size);

        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d * this.size, 12 * this.size);
    }

}
