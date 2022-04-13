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

        this.score = 0

        var map = this.make.tilemap({ key: 'map' })
        var tileset = map.addTilesetImage('texture')
        var layer = map.createLayer('Tile Layer 1', tileset, 0, 0)

        this.matter.world.convertTilemapLayer(layer)
        this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);

        console.log(layer)

        const animals = [
            { 'name': 'Shark', 'text': 'is dangerous' },
            { 'name': 'Orca', 'text': 'is cute' },
            { 'name': 'Moray Eel', 'text': 'is sneaky' },
            { 'name': 'Octopus', 'text': 'is smart' },
        ]


        for (const animal of animals) {
            console.log(animal.name + ' ' + animal.text)
        }



    }

    update() {
        // Update
    }
}