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
        array.sort((a, b) => b.score - a.score)
        return array
    }

    listClients() {
        // Create if not exist
        if (!this.scoreBoard) {
            // 1. set the scoreboard to a text
            this.scoreBoard = this.add.text(20, 20, '', { font: '24px Courier', fill: '#00ff00' })
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
                    score: player.score,
                }
            )
        }

        console.log('data', data)

        let sortedArray = this.sortArray(data)
        let sortedTopThree = sortedArray.slice(0, 5)
        let dataString = []
        for (const item of sortedTopThree) {
            dataString.push('Name:' + item.name + ' ' + 'Score:' + item.score)
        }
        this.scoreBoard.setText(dataString)
    }

}