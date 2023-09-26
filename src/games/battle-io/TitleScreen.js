import Phaser from 'phaser'
import start_image from '../../assets/start-word.png'

export default class TitleScreen extends Phaser.Scene {
    constructor() {
        super("Title Screen")
        // The player's name:
        this.name = "User"
        // Player clicks a button to check instructions
        this.instructions = ""
    }

    preload() {

    }
}