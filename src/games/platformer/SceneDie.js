import Phaser from 'phaser'
import dead_image from '../../assets/you-died.png'
import restart_image from '../../assets/restart-button.png'
import restart_word_image from '../../assets/restart-word.png'

export default class SceneDie extends Phaser.Scene {
    constructor() {
        super("die")
    }

    preload() {
        this.load.image('dead', dead_image)
        this.load.image('restart', restart_image)
        this.load.image('restart-word', restart_word_image)
    }

    create() {
        // Add a image and asign it to a varible
        const dead = this.add.image(0, 0, 'dead')

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(dead, this.add.zone(600, 600, 1600, 800));

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#DD0000");

        this.restartWord = this.add.sprite(0, 0, 'restart-word').setInteractive();
        this.restartWord.setScale(2, 2)
        //  Center the picture in the games
        Phaser.Display.Align.In.Center(this.restartWord, this.add.zone(800, 330, 1600, 800));

        this.restartButton = this.add.sprite(0, 0, 'restart').setInteractive();
        this.restartButton.setScale(0.12, 0.12)

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(this.restartButton, this.add.zone(1000, 600, 1600, 800));

        const self = this

        this.restartButton.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);

            setTimeout(function () { self.scene.start('Game') }, 100)

        });

        // this.restartButton.on('pointerout', function (pointer) {

        //     this.clearTint();

        // });

        this.restartButton.on('pointerup', function (pointer) {

            this.clearTint();

        });

    }
}