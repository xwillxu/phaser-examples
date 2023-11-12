import Phaser from 'phaser'

export default class GUISceneUntouched extends Phaser.Scene {
    constructor() {
        super("DisplayUpgrades")
        this.upgradeData = null
        this.tankInfo = {}
        this.pointerPosX = 0
        this.pointerPosY = 0
        this.oldContainers = []
    }

    create(data) {
        this.upgradeData = data.value
        this.tankInfo = data.tankInfo
        this.scene.bringToTop()
    }

    listUpgrades(data) {
        for (const oldContainer of this.oldContainers) {
            oldContainer.destroy()
        }
        this.upgradeData = data
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
            this.oldContainers.push(container)
            id++


        }

        for (const containerKey in containers) {
            const container = containers[containerKey].Container
            const id = containers[containerKey].ID
            container.x = 50 + 150 * id
            container.y = 650
            const containerRectangle = container.getAt(0)
            containerRectangle.on("pointerdown", () => {
                for (const container of this.oldContainers) {
                    container.destroy()
                }
                console.log("Hello, I'm a diep.io v2 tank that is called the", containerKey, "which has better stats than the previous tank.")
                upgradeOptionName = containerKey
                // @ts-ignore
                this.scene.get("diep.io-3-phaser").sendUpgradeInfo(upgradeOptionName)
            })
        }
    }
}