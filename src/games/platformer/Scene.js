import Phaser from 'phaser'
import SpriteWithHealthBar from './SpriteWithHealthBar'

import map0 from '../../assets/Platformer-Template.json'
import map1 from '../../assets/Platformer-Template2.json'
import map2 from '../../assets/Platformer-Template3.json'
import texture from '../../assets/texture.extruded.png'
import player_image from '../../assets/dude-cropped.png'
import box_image from '../../assets/box-item-boxed.png'
import slimeBlue from '../../assets/slimeBlue.png'
import slimeBlue_move from '../../assets/slimeBlue_move.png'
import gameover from '../../assets/gameover1.wav'
import backmusic from '../../assets/background-music.wav'
import HealthBar from './HealthBar'





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
        this.load.image('slime', slimeBlue)
        this.load.image('slime2', slimeBlue_move)
        this.load.tilemapTiledJSON('map0', map0)
        this.load.tilemapTiledJSON('map1', map1)
        this.load.tilemapTiledJSON('map2', map2)
        this.load.spritesheet('player', player_image, { frameWidth: 32, frameHeight: 42 });
        this.load.image('texture', texture)
        this.load.audio('gameover', gameover)
        this.load.audio('back-music', backmusic)
    }

    setupKeys() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.WKey = this.input.keyboard.addKey('W');
        this.AKey = this.input.keyboard.addKey('A');
        this.DKey = this.input.keyboard.addKey('D');

        this.keystate = {
            'W': false, 'A': false, 'D': false
        }



        this.WKey.on('down', function () {
            this.keystate.W = true
        }, this);

        this.WKey.on('up', function () {
            this.keystate.W = false
        }, this);

        this.AKey.on('down', function () {
            this.keystate.A = true
        }, this);

        this.AKey.on('up', function () {
            this.keystate.A = false
        }, this);

        this.DKey.on('down', function () {
            this.keystate.D = true
        }, this);

        this.DKey.on('up', function () {
            this.keystate.D = false
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
        const speed = this.speed * 1.3
        this.playerSprite.setVelocityY(-speed)
        this.playerSprite.anims.play('idle', true);
        this.canJump = false
    }

    setupCamera() {
        this.cameras.main.startFollow(this.playerSprite)
    }


    die() {

        clearInterval(this.musicPlay)

        this.music.stop()

        let text = this.add.text(700, 375, 'Game Over', {
            fontSize: '50px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            fill: 'red'
        });

        text.setScrollFactor(0);
        let sound = this.sound.add('gameover')
        sound.play()

        const self = this

        if (this.playerDead == false) {
            setTimeout(function () { self.scene.start('die') }, 3000)
        }

        this.playerDead = true

    }


    scoreAdd(body) {
        // Remove from the tilemap
        this.map.removeTile(body.gameObject?.tile)

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
        let text = this.add.text(730, 375, 'Win!', {
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


        // Slime Animation
        this.anims.create({
            key: 'slimeanims',
            frames: [
                { key: 'slime' },
                { key: 'slime2' },
            ],
            frameRate: 2,
            repeat: Infinity
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

        const self = this

        setTimeout(function () { self.destroy(projectile_sprite) }, 3000)
    }

    enemy() {
        const offset = 100
        let posX = Math.random() * 7936 + offset
        let posY = Math.random() * 4608 + offset

        // Get the position of all the tiles if overlapping redo. 
        let canSpawn = false
        while (canSpawn == false) {
            const tile = this.map.getTileAtWorldXY(posX, posY)

            if (tile == null) {
                canSpawn = true
                break;
            }
            posX = Math.random() * 7936 + offset
            posY = Math.random() * 4608 + offset

        }

        const enemy = new SpriteWithHealthBar(this, posX, posY, 'slime', 0, {
            isSensor: false, label: 'enemy', friction: 0, restitution: 1, frictionAir: 0
        })
        enemy.setScale(1, 1)

        const velocity = Math.random() * 20 - 10
        enemy.setVelocityX(velocity)
        enemy.setFixedRotation()
        enemy.anims.play('slimeanims', false)

        this.enemyList.push(enemy)
    }

    setupCollision() {
        this.matter.world.on('collisionstart', function (event) {

            for (const pair of event.pairs) {
                let bodyA = pair.bodyA;
                let bodyB = pair.bodyB;

                if (bodyA == this.playerSprite.body) {
                    const tile = bodyB.gameObject?.tile

                    if (tile && tile.properties.die) {
                        this.die()
                    }
                }
                if (bodyB == this.playerSprite.body) {
                    const tile = bodyA.gameObject?.tile

                    if (tile && tile.properties.die) {
                        this.die()
                    }
                }

                let enemyHit = null

                if (bodyA.label == 'bullet' && bodyB.label == 'enemy') {
                    enemyHit = bodyB
                    bodyA.gameObject?.destroy()
                    this.matter.world.remove(bodyA)
                    this.score += 10

                }

                if (bodyB.label == 'bullet' && bodyA.label == 'enemy') {
                    enemyHit = bodyA
                    bodyB.gameObject?.destroy()
                    this.matter.world.remove(bodyB)
                    this.score += 10

                }

                // Process enemy hp bar
                if (enemyHit) {
                    const result = enemyHit.gameObject?.damage(50)
                    if (result === true) {
                        enemyHit.gameObject?.removeHp()
                        // Enemy has zero hp now
                        enemyHit.gameObject?.destroy()
                        this.matter.world.remove(enemyHit)
                    }
                }

                if (bodyA == this.playerSprite.body) {
                    const tile = bodyB.gameObject?.tile

                    if (tile && tile.properties.collides) {
                        this.canJump = true
                    }
                }
                if (bodyB == this.playerSprite.body) {
                    const tile = bodyA.gameObject?.tile

                    if (tile && tile.properties.collides) {
                        this.canJump = true
                    }
                }
            }

        }, this)
    }

    levelDetector() {
        this.matter.world.on('collisionstart', function (event) {
            for (const pair of event.pairs) {
                let bodyA = pair.bodyA;
                let bodyB = pair.bodyB;

                if (bodyA == this.playerSprite.body) {
                    const tile = bodyB.gameObject?.tile
                    if (tile && tile.properties.next_map) {
                        console.log('Next level')
                        this.nextLevel()

                    }
                }
                if (bodyB == this.playerSprite.body) {
                    const tile = bodyA.gameObject?.tile
                    if (tile && tile.properties.next_map) {
                        console.log('Next level')
                        this.nextLevel()

                    }
                }
            }

        }, this)
    }

    scoreDetector() {
        this.matter.world.on('collisionstart', function (event) {
            for (const pair of event.pairs) {
                let bodyA = pair.bodyA;
                let bodyB = pair.bodyB;
                if (bodyA == this.playerSprite.body) {
                    const tile = bodyB.gameObject?.tile
                    if (tile && tile.properties.score) {
                        this.scoreAdd(bodyB)


                    }
                }
                if (bodyB == this.playerSprite.body) {
                    const tile = bodyA.gameObject?.tile
                    if (tile && tile.properties.score) {
                        this.scoreAdd(bodyA)

                    }
                }
            }

        }, this)
    }

    playMusic() {
        this.music = this.sound.add('back-music')

        const self = this

        if (this.currentLevel == 0) {
            this.music.play()

            this.musicPlay = setInterval(function () {
                self.music.play()
            }, 15500)

        }
    }

    destroy(body) {
        body.destroy()
        this.matter.world.remove(body)
    }

    createEnemy() {
        // Spawn Enemys
        for (let x = 0; x < 50; x++) {
            this.enemy()

        }

    }


    create() {
        // Create
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");

        this.enemyList = []

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

        this.canJump = false

        // Setup Stuff
        this.setupKeys();
        this.setupCamera();
        this.setupCollision();
        this.scoreDetector();
        this.levelDetector();
        this.setupAnimation();
        this.mouseClick();
        this.createEnemy();
        this.playMusic();


    }

    update() {
        // Update
        if (this.playerDead) {
            return

        }

        let isIdle = true

        if (this.cursors.left.isDown || this.keystate.A == true) {
            this.move_left()
            isIdle = false
        }

        if (this.cursors.right.isDown || this.keystate.D == true) {
            this.move_right()
            isIdle = false
        }

        if (this.cursors.up.isDown || this.keystate.W == true) {
            if (this.canJump != false) {
                this.jump()
                isIdle = false
            }

        }

        if (isIdle) {
            this.playerSprite.anims.play('idle', true);
        }

        this.scoreText.setText(`Score: ${this.score}`)
        this.scoreText.depth = 100

        for (const enemy of this.enemyList) {
            enemy.update()
        }

    }
}