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

        map.setCollisionByProperty({ collides: true });

        this.matter.world.convertTilemapLayer(layer)
        this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);



        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = true;

        this.playerSprite = this.matter.add.sprite(0, 0, 'player', 4)

        var M = Phaser.Physics.Matter.Matter;

        var playerBody = M.Bodies.rectangle(100, 100, 32, 42)

        this.playerSprite.setBody(playerBody)
        this.playerSprite.setFixedRotation()
        this.playerSprite.setPosition(100, 100)

        this.matter.add.image(600, 2500, 'box')


        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
        });


    }

    update() {
        // Update
        this.playerSprite.anims.play('idle', true);
    }
}