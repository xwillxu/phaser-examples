import Phaser from 'phaser'
import dead_image from '../../assets/you-died.png'

export default class SceneDie extends Phaser.Scene {
    constructor() {
        super("die")
    }

    preload() {
        this.load.image('dead', dead_image)
    }

    create() {
        // Add a image and asign it to a varible
        const dead = this.add.image(0, 0, 'dead')

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(dead, this.add.zone(800, 500, 1600, 800));


    }
}