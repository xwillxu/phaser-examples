import Phaser from 'phaser'
import start_image from '../../assets/start-button.png'
import start_word_image from '../../assets/start-word.png'


export default class SceneStart extends Phaser.Scene {
    constructor() {
        super("scene-start")
    }

    preload() {
        this.load.image('start', start_image)
        this.load.image('start-word', start_word_image)
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('0x008BDD');

        this.startWord = this.add.sprite(0, 0, 'start-word').setInteractive();
        this.startWord.setScale(2, 2)
        //  Center the picture in the games
        Phaser.Display.Align.In.Center(this.startWord, this.add.zone(500, 400, 1600, 800));

        this.startButton = this.add.sprite(0, 0, 'start').setInteractive();
        this.startButton.setScale(1.9, 1.9)

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(this.startButton, this.add.zone(1100, 400, 1600, 800));

        const self = this

        this.startButton.on('pointerdown', function (pointer) {

            this.setTint(0x008BDD);

            setTimeout(function () { self.scene.start('game') }, 100)

            console.log('clickdown')

        });


        this.startButton.on('pointerup', function (pointer) {

            this.clearTint();

        });
    }
}