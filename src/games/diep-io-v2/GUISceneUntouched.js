import Phaser from 'phaser'

export default class GUISceneUntouched extends Phaser.Scene {
    constructor() {
        super("DisplayUpgrades")
        this.upgradeData = null
        this.tankInfo = {}
        this.pointerPosX = 0
        this.pointerPosY = 0
        this.pointerdown = false
    }

    create(data) {
        this.upgradeData = data.value
        this.tankInfo = data.tankInfo
        this.scene.bringToTop()
    }

    listUpgrades() {
        const containers = {}
        let id = 1
        let upgradeOptionName
        for (const tankName of this.upgradeData) {
            const container = this.add.container()
            const name = this.add.text(0, 0, tankName)
            const rectangle = this.add.rectangle(0, 0, 100, 100, 0x77CCFF).setInteractive()

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
            const containerRectangle = container.getAt(0)
            containerRectangle.on("pointerdown", () => {
                // debugger
                // Happens 1 min later or something
                upgradeOptionName = containerKey
                // Need to call on the main scene when this happens
                this.scene.get("diep.io-2-phaser").sendUpgradeInfo(upgradeOptionName)
            })
        }

        console.log(upgradeOptionName)
    }
}