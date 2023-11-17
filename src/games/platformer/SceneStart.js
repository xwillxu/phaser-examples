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
import backgroundImage1 from '../../assets/Pancake Platformer/Death-to-boss.JPG'
// @ts-ignore
import backgroundImage2 from '../../assets/Pancake Platformer/Money-Heaven.JPG'
// @ts-ignore
import backgroundImage3 from '../../assets/Pancake Platformer/Multishoot-heaven.JPG'
// @ts-ignore
import backgroundImage4 from '../../assets/Pancake Platformer/Pancake-Emoji.JPG'
// @ts-ignore
import backgroundImage5 from '../../assets/Pancake Platformer/Pancake-Emoji2.JPG'
// @ts-ignore
import backgroundImage6 from '../../assets/Pancake Platformer/Slime-and-bullet.JPG'
// @ts-ignore
import backgroundImage7 from '../../assets/Pancake Platformer/With-Boss.JPG'
import { setTimeout } from 'worker-timers'


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
        this.load.image('backgroundImage1', backgroundImage1)
        this.load.image('backgroundImage2', backgroundImage2)
        this.load.image('backgroundImage3', backgroundImage3)
        this.load.image('backgroundImage4', backgroundImage4)
        this.load.image('backgroundImage5', backgroundImage5)
        this.load.image('backgroundImage6', backgroundImage6)
        this.load.image('backgroundImage7', backgroundImage7)
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

        let number = 0

        const backgroundImageList = [
            'backgroundImage1',
            'backgroundImage2',
            'backgroundImage3',
            'backgroundImage4',
            'backgroundImage5',
            'backgroundImage6',
            'backgroundImage7'
        ]

        let backgroundImage = backgroundImageList[number]

        this.backgroundSprite = this.add.sprite(0, 0, String(backgroundImage))
        setTimeout(this.createNewNumber(number), 5000)

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
    createNewNumber(number) {
        const newNumber = number + 1
        return newNumber
    }
}