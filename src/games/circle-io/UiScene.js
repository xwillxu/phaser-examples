import Phaser from 'phaser'

export default class UiScene extends Phaser.Scene {
    constructor() {
        super('UiScene')
        this.stateCircles = null
        this.scoreBoard = null
    }

    create(data) {
        this.stateCircles = data.stateCircles
        this.scene.bringToTop()
    }

    sortArray(array) {
        array.sort((a, b) => b.size - a.size)
        return array
    }

    listClients() {
        // Create if not exist
        if (!this.scoreBoard) {
            // 1. set the scoreboard to a text
            this.scoreBoard = this.add.text(0, 0, '', { font: '30px Courier', fill: '#00ff00' })
            this.scoreBoard.setScrollFactor(0)
        }

        // Update the content
        let data = []
        /*
        
        */

        // }
        for (const key in this.stateCircles) {
            const player = this.stateCircles[key]
            data.push(
                {
                    name: player.name,
                    size: player.size,
                }
            )
        }

        let sortedArray = this.sortArray(data)
        let dataString = []
        for (const item of sortedArray) {
            dataString.push('Name:' + item.name + ' ' + 'Score:' + item.size)
        }
        this.scoreBoard.setText(dataString)
    }

}