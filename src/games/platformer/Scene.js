import Phaser from 'phaser'

import map from '../../assets/Platformer-Template.json'
import texture from '../../assets/texture.png'
import player_image from '../../assets/dude-cropped.png'
import box_image from '../../assets/box-item-boxed.png'


export default class Scene extends Phaser.Scene {
    constructor() {
        super("Platformer Template")
    }

    preload() {
        // Preload

        this.load.image('box', box_image)
        this.load.tilemapTiledJSON('map', map)
        this.load.spritesheet('player', player_image, { frameWidth: 32, frameHeight: 42 });
        this.load.image('texture', texture)
    }

    create() {
        // Create

        const map = this.make.tilemap({ key: 'map' })
        var abc = 'daddy'
        var def = 'xwill'
        var line = 'loves'
        var sentence = abc + ' ' + line + ' ' + def

        console.log(sentence, 'Map Data', "Daddy Is Teaching Xwill Javascript")
    }

    update() {
        // Update
    }
}