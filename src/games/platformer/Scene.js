import Phaser from 'phaser'

import map0 from '../../assets/Platformer-Template.json'
import map1 from '../../assets/Platformer-Template2.json'
import map2 from '../../assets/Platformer-Template3.json'
import texture from '../../assets/texture.extruded.png'
import player_image from '../../assets/dude-cropped.png'
import box_image from '../../assets/box-item-boxed.png'




export default class Scene extends Phaser.Scene {
    constructor() {
        super("game")
    }

    init(props) {
        if (props.level === undefined) {
            this.currentLevel = 0
        } else {

            this.currentLevel = props.level
        }

        if (props.score === undefined) {
            this.score = 0
        } else {
            this.score = props.score
        }

    }


    preload() {
        // Preload

        this.load.image('box', box_image)
        this.load.tilemapTiledJSON('map0', map0)
        this.load.tilemapTiledJSON('map1', map1)
        this.load.tilemapTiledJSON('map2', map2)
        this.load.spritesheet('player', player_image, { frameWidth: 32, frameHeight: 42 });
        this.load.image('texture', texture)
    }

    setupKeys() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.WKey = this.input.keyboard.addKey('W');
        this.AKey = this.input.keyboard.addKey('A');
        this.DKey = this.input.keyboard.addKey('D');



        this.WKey.on('down', function () {
            if (this.playerDead) {
                return

            }
            this.jump()
        }, this);

        this.AKey.on('down', function () {
            if (this.playerDead) {
                return

            }
            this.move_left()
        }, this);

        this.DKey.on('down', function () {
            if (this.playerDead) {
                return

            }
            this.move_right()
        }, this);

    }


    move_left() {
        this.playerSprite.setVelocityX(-this.speed)
        this.playerSprite.anims.play('left', true);
    }

    move_right() {
        this.playerSprite.setVelocityX(this.speed)
        this.playerSprite.anims.play('right', true);
    }

    jump() {
        this.playerSprite.setVelocityY(-this.speed)
        this.playerSprite.anims.play('idle', true);
    }

    setupCamera() {
        this.cameras.main.startFollow(this.playerSprite)
    }



    scoreDetector() {
        this.matter.world.on('collisionstart', function (event) {
            let bodyA = event.pairs[0].bodyA;
            let bodyB = event.pairs[0].bodyB;
            if (bodyA == this.playerSprite.body) {
                const tile = bodyB.gameObject.tile
                if (tile && tile.properties.score) {
                    console.log('Score')
                    this.scoreAdd(bodyB)


                }
            }
            if (bodyB == this.playerSprite.body) {
                const tile = bodyA.gameObject.tile
                if (tile && tile.properties.score) {
                    console.log('Score')
                    this.scoreAdd(bodyA)

                }
            }
        }, this)
    }

    die() {
        let text = this.add.text(730, 375, 'Die', {
            fontSize: '50px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            fill: 'red'
        });

        text.setScrollFactor(0);

        const self = this

        if (this.playerDead == false) {
            setTimeout(function () { self.scene.start('die') }, 3000)
        }

        this.playerDead = true

    }

    levelDetector() {
        this.matter.world.on('collisionstart', function (event) {
            let bodyA = event.pairs[0].bodyA;
            let bodyB = event.pairs[0].bodyB;
            if (bodyA == this.playerSprite.body) {
                const tile = bodyB.gameObject.tile
                if (tile && tile.properties.next_map) {
                    console.log('Next Map')
                    this.nextLevel()


                }
            }
            if (bodyB == this.playerSprite.body) {
                const tile = bodyA.gameObject.tile
                if (tile && tile.properties.next_map) {
                    console.log('Next Map')
                    this.nextLevel()

                }
            }
        }, this)
    }

    scoreAdd(body) {
        // Remove from the tilemap
        this.map.removeTile(body.gameObject.tile)

        // Remove from the world
        this.matter.world.remove(body)

        // Increase Score
        this.score += 10
    }

    nextLevel() {
        if (this.currentLevel >= 2) {
            this.youWon()
            return
        }

        this.scene.restart({ level: this.currentLevel + 1, score: this.score })

    }

    youWon() {
        let text = this.add.text(350, 250, 'Win', {
            fontSize: '50px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            fill: 'green'
        });

        text.setScrollFactor(0);

        this.playerDead = true
    }

    setupAnimation() {


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

    }

    mouseClick() {
        this.input.on('pointerdown', function (pointer) {
            if (this.playerDead == false) {
                this.shoot(pointer.worldX, pointer.worldY)
            }


        }, this);
    }

    shoot(targetX, targetY) {

        const projectile_sprite = this.matter.add.sprite(this.playerSprite.x, this.playerSprite.y, 'box', 0, {
            isSensor: false, label: 'bullet'
        })
        projectile_sprite.setScale(0.5, 0.5)
        const velocity = this.speed * 2

        let xDist = targetX - this.playerSprite.x;
        let yDist = targetY - this.playerSprite.y;
        let angle = Math.atan2(yDist, xDist);
        let velocityX = Math.cos(angle) * velocity
        let velocityY = Math.sin(angle) * velocity

        projectile_sprite.setVelocityX(velocityX)
        projectile_sprite.setVelocityY(velocityY)
    }

    enemy() {
        const offset = 100
        const posX = Math.random() * 1100 + offset
        const posY = Math.random() * 800 + offset
        const enemy = this.matter.add.sprite(posX, posY, 'box', 0, {
            isSensor: false, label: 'enemy'
        })
        enemy.setScale(1, 1)

        const velocity = Math.random() * 200 - 100
        enemy.setVelocityX(velocity)

    }

    setupCollision() {
        this.matter.world.on('collisionstart', function (event) {
            let bodyA = event.pairs[0].bodyA;
            let bodyB = event.pairs[0].bodyB;
            if (bodyA == this.playerSprite.body) {
                const tile = bodyB.gameObject.tile
                if (tile && tile.properties.die) {
                    console.log('Die')
                    this.die()
                }
            }
            if (bodyB == this.playerSprite.body) {
                const tile = bodyA.gameObject.tile
                if (tile && tile.properties.die) {
                    console.log('Die')
                    this.die()
                }
            }

            if (bodyA.label == 'bullet' && bodyB.label == 'enemy') {
                bodyA.gameObject.destroy()
                bodyB.gameObject.destroy()
                this.matter.world.remove(bodyA)
                this.matter.world.remove(bodyB)
                console.log('hit')

            }

            if (bodyB.label == 'bullet' && bodyA.label == 'enemy') {
                bodyA.gameObject.destroy()
                bodyB.gameObject.destroy()
                this.matter.world.remove(bodyA)
                this.matter.world.remove(bodyB)
                console.log('ai')

            }

        }, this)


    }

    create() {
        // Create
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");


        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
            fontSize: '20px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            fill: '#000000'
        });

        this.scoreText.setScrollFactor(0);

        this.playerDead = false

        const mapKey = 'map' + this.currentLevel
        const map = this.make.tilemap({ key: mapKey })
        this.map = map
        let tileset = map.addTilesetImage('texture', 'texture', 128, 128, 1, 2)

        map.setCollisionByProperty({ collides: true });
        let layer = map.createLayer('Tile Layer 1', tileset, 0, 0)

        this.matter.world.convertTilemapLayer(layer)
        this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);

        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;

        this.playerSprite = this.matter.add.sprite(0, 0, 'player', 4)

        let M = Phaser.Physics.Matter.Matter;

        let playerBody = M.Bodies.rectangle(100, 100, 32, 42)

        this.playerSprite.setBody(playerBody)
        this.playerSprite.setFixedRotation()
        this.playerSprite.setPosition(200, 200)

        this.speed = 10

        // Spawn Enemys
        for (let x = 0; x < 10; x++) {
            this.enemy()
            console.log(x)

        }

        // Setup Stuff
        this.setupKeys();
        this.setupCamera();
        this.setupCollision();
        this.setupAnimation();
        this.scoreDetector();
        this.levelDetector();
        this.mouseClick();

    }

    update() {
        // Update
        if (this.playerDead) {
            return

        }

        let isIdle = true

        if (this.cursors.left.isDown) {
            this.move_left()
            isIdle = false
        }

        if (this.cursors.right.isDown) {
            this.move_right()
            isIdle = false
        }

        if (this.cursors.up.isDown) {
            this.jump()
            isIdle = false
        }

        if (isIdle) {
            this.playerSprite.anims.play('idle', true);
        }

        this.scoreText.setText(`Score: ${this.score}`)



    }
}