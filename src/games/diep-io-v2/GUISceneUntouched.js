import Phaser from 'phaser'

export default class GUISceneUntouched extends Phaser.Scene {
    constructor() {
        super("DisplayUpgrades")
        this.upgradeData = null
        this.tankInfo = {}
    }

    create(data) {
        this.upgradeData = data.value
        this.tankInfo = data.tankInfo
        this.scene.bringToTop()
        this.listUpgrades()
    }

    listUpgrades() {
        const containers = {}
        let id = 1
        for (const tankName of this.upgradeData) {
            const container = this.add.container(Math.floor(Math.random() * (1920 / 1.32)), Math.floor(Math.random() * (1080 / 1.5)))
            const name = this.add.text(0, 0, tankName)
            const rectangle = this.add.rectangle(0, 0, 100, 100, 0x77CCFF)

            name.setOrigin(0.5, -1.5);
            container.add(rectangle)
            container.add(name)
            containers[tankName] = {
                Container: container,
                ID: id
            }
            id++


        }

        for (const containerKey in containers) {
            const container = containers[containerKey].Container
            const id = containers[containerKey].ID
            container.x = 50 + 150 * id
            container.y = 650
        }
    }
}