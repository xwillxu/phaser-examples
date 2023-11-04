import Phaser from 'phaser'
// @ts-ignore
import start_image from '../../assets/start-button.png'
// @ts-ignore
import start_word_image from '../../assets/start-word.png'
// @ts-ignore
import playerChoice1 from '../../assets/dude-cropped.png'
// @ts-ignore
import playerChoice2 from '../../assets/dude-cropped-red.png'
// @ts-ignore
import playerChoice3 from '../../assets/dude-cropped-blue.png'
// @ts-ignore
import ContainerWithHealthBar from './ContainerWithHealthBar'


export default class SceneStart extends Phaser.Scene {
    constructor() {
        super("scene-start")
    }

    preload() {
        this.load.image('start', start_image)
        this.load.image('start-word', start_word_image)
        this.load.spritesheet('playerImage1', playerChoice1, { frameWidth: 32, frameHeight: 42 })
        this.load.spritesheet('playerImage2', playerChoice2, { frameWidth: 32, frameHeight: 42 })
        this.load.spritesheet('playerImage3', playerChoice3, { frameWidth: 32, frameHeight: 42 })
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('0x008BDD');

        this.startWord = this.add.sprite(0, 0, 'start-word').setInteractive();
        this.startWord.setScale(2, 2)
        //  Center the picture in the games
        Phaser.Display.Align.In.Center(this.startWord, this.add.zone(500, 250, 1600, 800));

        this.startButton = this.add.sprite(0, 0, 'start').setInteractive();
        this.startButton.setScale(1.9, 1.9)

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(this.startButton, this.add.zone(1100, 250, 1600, 800));

        this.player1 = this.add.sprite(300, 500, 'playerImage1', 4).setInteractive();
        this.player1.setScale(3, 3)

        this.player2 = this.add.sprite(700, 500, 'playerImage2', 4).setInteractive();
        this.player2.setScale(2, 2)

        this.player3 = this.add.sprite(1100, 500, 'playerImage3', 4).setInteractive();
        this.player3.setScale(2, 2)

        this.selectedSprite = 0

        const self = this

        this.player1.on('pointerdown', function (pointer) {
            self.selectedSprite = 0
            self.player1.setScale(3, 3)
            self.player2.setScale(2, 2)
            self.player3.setScale(2, 2)
        });

        this.player2.on('pointerdown', function (pointer) {
            self.selectedSprite = 1
            self.player2.setScale(3, 3)
            self.player1.setScale(2, 2)
            self.player3.setScale(2, 2)

        });

        this.player3.on('pointerdown', function (pointer) {
            self.selectedSprite = 2
            self.player3.setScale(3, 3)
            self.player2.setScale(2, 2)
            self.player1.setScale(2, 2)

        });

        this.startButton.on('pointerdown', function (pointer) {

            this.setTint(0x008BDD);

            setTimeout(function () { self.scene.start('game', { level: 0, score: 0, spriteChoice: self.selectedSprite }) }, 100)

        });


        this.startButton.on('pointerup', function (pointer) {

            this.clearTint();

        });
    }
}