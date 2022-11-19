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
    }

    listUpgrades() {
        const containers = {}
        for (const tankName of this.upgradeData) {
            const container = this.add.container(0, 0)
            const rectangle = this.add.rectangle(0, 0, 200, 200, 0x77CCFF)
            const name = this.add.text(0, 0, tankName)
            container.add(name)
            container.add(rectangle)
            containers[tankName] = container
        }
    }
}