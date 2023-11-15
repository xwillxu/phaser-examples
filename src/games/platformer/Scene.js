import Phaser from 'phaser'
import SpriteWithHealthBar from './SpriteWithHealthBar'
import BossSprite from './BossSprite'
import random from '../-useful-stuff-/math/randomMinimumMaximum'

// @ts-ignore
import map0 from '../../assets/Platformer-Template.json'
// @ts-ignore
import map1 from '../../assets/Platformer-Template2.json'
// @ts-ignore
import map2 from '../../assets/Platformer-Template3.json'
// @ts-ignore
import map3 from '../../assets/Platformer-Template5.json'
// @ts-ignore
import map4 from '../../assets/Platformer-Template4.json'
// @ts-ignore
import bossMap from '../../assets/Boss-Map.json'
// @ts-ignore
import texture from '../../assets/texture.extruded.png'
// @ts-ignore
import player_image from '../../assets/dude-cropped.png'
// @ts-ignore
import player_image2 from '../../assets/dude-cropped-red.png'
// @ts-ignore
import player_image3 from '../../assets/dude-cropped-blue.png'
// @ts-ignore
import box_image from '../../assets/Battle.io Skins/Crepes.png'
// @ts-ignore
import slimeBlue from '../../assets/slimeBlue.png'
// @ts-ignore
import slimeBossSprite from '../../assets/SlimeMonster.png'
// @ts-ignore
import iceBossSprite from '../../assets/IceMonster.png'
// @ts-ignore
import snowBossSprite from '../../assets/WhiteSlimeMonster.png'
// @ts-ignore
import lavaBossSprite from '../../assets/RedSlimeMonster.png'
// @ts-ignore
import rockBossSprite from '../../assets/BlackSlimeMonster.png'
// @ts-ignore
import bossLaser from '../../assets/laser.png'
// @ts-ignore
import missleItem from '../../assets/MultiShotItem.png'
// @ts-ignore
import slimeBlue_move from '../../assets/slimeBlue_move.png'
// @ts-ignore
import gameover from '../../assets/gameover1.wav'
// @ts-ignore
import backmusic from '../../assets/background-music.wav'
// @ts-ignore
import slimeGreen from '../../assets/slimeGreen.png'
// @ts-ignore
import slimeGreen_move from '../../assets/slimeGreen_move.png'
// @ts-ignore
import slimePurple from '../../assets/slimePurple.png'
// @ts-ignore
import slimePurple_move from '../../assets/slimePurple_move.png'
// @ts-ignore
import slimeBlock from '../../assets/slimeBlock.png'

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
        if (props.bulletCount === undefined) {
            this.bulletCount = 1
        } else {
            this.bulletCount = props.bulletCount
        }
        if (props.spriteChoice === undefined) {
            this.spriteChoice = 0
        } else {
            this.spriteChoice = props.spriteChoice
        }

    }


    preload() {
        // Preload

        this.load.image('box', box_image)
        this.load.image('slimeBoss', slimeBossSprite)
        this.load.image('iceBoss', iceBossSprite)
        this.load.image('snowBoss', snowBossSprite)
        this.load.image('lavaBoss', lavaBossSprite)
        this.load.image('rockBoss', rockBossSprite)
        this.load.image('laser', bossLaser)
        this.load.image('missle', missleItem)
        this.load.image('slimeB', slimeBlue)
        this.load.image('slimeB2', slimeBlue_move)
        this.load.image('slimeG', slimeGreen)
        this.load.image('slimeG2', slimeGreen_move)
        this.load.image('slimeP', slimePurple)
        this.load.image('slimeP2', slimePurple_move)
        this.load.image('slimeBlock', slimeBlock)
        this.load.tilemapTiledJSON('map0', map0)
        this.load.tilemapTiledJSON('map1', map1)
        this.load.tilemapTiledJSON('map2', map2)
        this.load.tilemapTiledJSON('map3', map3)
        this.load.tilemapTiledJSON('map4', map4)
        this.load.tilemapTiledJSON('map5', bossMap)
        if (this.spriteChoice == 0) {
            this.load.spritesheet('player', player_image, { frameWidth: 32, frameHeight: 42 });
        } else if (this.spriteChoice == 1) {
            this.load.spritesheet('player', player_image2, { frameWidth: 32, frameHeight: 42 });
        } else if (this.spriteChoice == 2) {
            this.load.spritesheet('player', player_image3, { frameWidth: 32, frameHeight: 42 });
        }
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
            // @ts-ignore
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
        this.score += 50
    }

    nextLevel() {

        this.scene.restart({ level: this.currentLevel + 1, score: this.score, bulletCount: this.bulletCount })
    }

    youWon() {
        let text = this.add.text(730, 375, 'Win!', {
            fontSize: '50px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            // @ts-ignore
            fill: 'green'
        });

        text.setScrollFactor(0);

        const self = this

        setTimeout(function () { self.scene.start('die') }, 3000)


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
            key: 'slimeanimsblue',
            frames: [
                { key: 'slimeB' },
                { key: 'slimeB2' },
            ],
            frameRate: 2,
            repeat: Infinity
        });

        this.anims.create({
            key: 'slimeanimsgreen',
            frames: [
                { key: 'slimeG' },
                { key: 'slimeG2' },
            ],
            frameRate: 2,
            repeat: Infinity
        });

        this.anims.create({
            key: 'slimeanimspurple',
            frames: [
                { key: 'slimeP' },
                { key: 'slimeP2' },
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
        if (this.bulletCount > 36) this.bulletCount = 36
        for (let x = 0; x < this.bulletCount; x++) {
            const projectile_sprite = this.matter.add.sprite(this.playerSprite.x, this.playerSprite.y, 'box', 0, {
                isSensor: false, label: 'bullet', ignoreGravity: true, gravityScale: { x: 0, y: 0 }, frictionAir: 0, friction: 0
            })
            projectile_sprite.setScale(0.33, 0.33)
            const velocity = this.speed * 1.5

            let xDist = targetX - this.playerSprite.x;
            let yDist = targetY - this.playerSprite.y;
            let angle = Math.atan2(yDist, xDist)
            let velocityX = Math.cos(angle) * velocity
            let velocityY = Math.sin(angle) * velocity

            projectile_sprite.setVelocityX(velocityX)
            projectile_sprite.setVelocityY(velocityY)

            const self = this

            setTimeout(function () { self.destroy(projectile_sprite) }, 3000)
        }
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

        let slimeImage
        let slimeColor
        let randomPercent = Math.random() * 100
        if (randomPercent <= 33.333333333) {
            slimeImage = 'slimeB'
            slimeColor = 'blue'
        }

        if (randomPercent > 33.333333333 && randomPercent <= 66.666666666) {
            slimeImage = 'slimeG'
            slimeColor = 'green'
        }

        if (randomPercent > 66.666666666) {
            slimeImage = 'slimeP'
            slimeColor = 'purple'
        }

        const enemy = new SpriteWithHealthBar(this, posX, posY, slimeImage, 0, {
            isSensor: false, label: 'enemy', friction: 0, restitution: 1, frictionAir: 0
        })

        enemy.setMass(10)
        enemy.setScale(1, 1)

        const velocity = Math.random() * 20 - 10
        enemy.setVelocityX(velocity)
        enemy.setFixedRotation()
        enemy.anims.play('slimeanims' + slimeColor, false)

        this.enemyList.push(enemy)
    }

    slimeBlock() {
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
        const enemy = new SpriteWithHealthBar(this, posX, posY, 'slimeBlock', 0, {
            isSensor: false, label: 'slimeBlock', friction: 0, restitution: 0, frictionAir: 0
        })

        enemy.setMass(100)
        enemy.setScale(1.2, 1.2)

        const velocity = random(40, 70)
        enemy.setVelocityX(velocity)

        this.enemyList.push(enemy)
    }

    MultiShoot() {
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

        const MultiShotItem = this.matter.add.sprite(posX, posY, 'missle', 0, {
            isSensor: false, label: 'item', friction: 0, restitution: 0, frictionAir: 0
        })

        MultiShotItem.setScale(0.1, 0.1)


    }

    createBoss() {
        const offset = 256
        let posX = Math.random() * 3334 + offset
        let posY = Math.random() * 3330 + 300 - offset

        // Get the position of all the tiles if overlapping redo. 
        let canSpawn = false
        while (canSpawn == false) {
            const tile = this.map.getTileAtWorldXY(posX, posY)

            if (tile == null) {
                canSpawn = true
                break;
            }
            posX = Math.random() * 3334 + offset
            posY = 3330 - offset

        }

        let bossSkin
        let randomPercent = Math.random() * 100
        if (randomPercent <= 20) {
            bossSkin = 'slimeBoss'
        } else if (randomPercent > 20 && randomPercent <= 40) {
            bossSkin = 'iceBoss'
        } else if (randomPercent > 40 && randomPercent <= 60) {
            bossSkin = 'snowBoss'
        } else if (randomPercent > 60 && randomPercent <= 80) {
            bossSkin = 'lavaBoss'
        } else if (randomPercent > 80) {
            bossSkin = 'rockBoss'
        }

        const boss = new BossSprite(this, posX, posY, bossSkin, 0, {
            isSensor: false, label: 'boss', friction: 0, restitution: 0.1, frictionAir: 0
        })

        boss.setMass(100)
        boss.setScale(0.4 + this.currentLevel / 10, 0.4 + this.currentLevel / 10)

        const velocity = Math.random() * 20 - 10
        boss.setVelocityX(velocity)
        boss.setFixedRotation()


        this.bossList.push(boss)

    }



    setupCollision() {
        this.matter.world.on('collisionstart', function (event) {

            for (const pair of event.pairs) {
                let bodyA = pair.bodyA;
                let bodyB = pair.bodyB;
                // @ts-ignore
                if (bodyA == this.playerSprite.body) {
                    const tile = bodyB.gameObject?.tile

                    if (tile && tile.properties.die) {
                        // @ts-ignore
                        this.die()
                    }
                }// @ts-ignore
                if (bodyB == this.playerSprite.body) {
                    const tile = bodyA.gameObject?.tile

                    if (tile && tile.properties.die) {
                        // @ts-ignore
                        this.die()
                    }
                }

                let enemyHit = null
                let slimeHit = null

                if (bodyA.label == 'bullet' && bodyB.label == 'enemy') {
                    enemyHit = bodyB
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)

                }

                if (bodyB.label == 'bullet' && bodyA.label == 'enemy') {
                    enemyHit = bodyA
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)

                }

                if (bodyA.label == 'bullet' && bodyB.label == 'slimeBlock') {
                    slimeHit = bodyB
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)

                }

                if (bodyB.label == 'bullet' && bodyA.label == 'slimeBlock') {
                    slimeHit = bodyA
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)

                }

                // Process enemy hp bar
                if (enemyHit) {
                    const result = enemyHit.gameObject?.damage(25)
                    if (result === true) {
                        enemyHit.gameObject?.removeHp()
                        // Enemy has zero hp now
                        enemyHit.gameObject?.destroy()
                        // @ts-ignore
                        this.matter.world.remove(enemyHit)
                        // @ts-ignore
                        // Earn Score
                        this.score += 20
                        // @ts-ignore
                        // Respawn Enemy
                        this.enemy()
                    }
                }

                if (slimeHit) {
                    const result = slimeHit.gameObject?.damage(6.75)
                    if (result === true) {
                        slimeHit.gameObject?.removeHp()
                        // Enemy has zero hp now
                        slimeHit.gameObject?.destroy()
                        // @ts-ignore
                        this.matter.world.remove(slimeHit)
                        // @ts-ignore
                        // Earn Score
                        this.score += 50
                        // @ts-ignore
                        // Respawn Enemy
                        this.slimeBlock()
                    }
                }

                let bossHit = null

                if (bodyA.label == 'bullet' && bodyB.label == 'boss') {
                    bossHit = bodyB
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)

                }

                if (bodyB.label == 'bullet' && bodyA.label == 'boss') {
                    bossHit = bodyA
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)

                }

                // Process enemy hp bar
                if (bossHit) {
                    const result = bossHit.gameObject?.damage(5)
                    if (result === true) {
                        bossHit.gameObject?.removeHp()
                        // Enemy has zero hp now
                        bossHit.gameObject?.destroy()
                        // @ts-ignore
                        this.matter.world.remove(bossHit)
                        // @ts-ignore
                        // Earn Score
                        this.score += 500
                        // @ts-ignore
                        if (this.currentLevel == 5) this.bossKilled += 1
                        // Killed 20 Bosses? You Win!
                        // @ts-ignore
                        if (this.bossKilled >= 20) {
                            // @ts-ignore
                            this.youWon()
                        }

                        else {
                            // Respawn Enemy
                            // @ts-ignore
                            this.createBoss()
                        }
                    }
                }

                if (bodyA.label == 'bullet' && bodyB.label == 'bossbullet') {
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)

                }

                if (bodyB.label == 'bullet' && bodyA.label == 'bossbullet') {
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)

                }
                // @ts-ignore
                if (bodyA == this.playerSprite.body && bodyB.label == 'bossbullet') {
                    // @ts-ignore
                    this.die()
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)

                }
                // @ts-ignore
                if (bodyB == this.playerSprite.body && bodyA.label == 'bossbullet') {
                    // @ts-ignore
                    this.die()
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)

                }
                // @ts-ignore
                if (bodyA == this.playerSprite.body && bodyB.label == 'item') {
                    // @ts-ignore
                    this.bulletCount += 2
                    bodyB.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyB)

                }
                // @ts-ignore
                if (bodyB == this.playerSprite.body && bodyA.label == 'item') {
                    // @ts-ignore
                    this.bulletCount += 2
                    bodyA.gameObject?.destroy()
                    // @ts-ignore
                    this.matter.world.remove(bodyA)

                }
                // @ts-ignore
                if (bodyA == this.playerSprite.body) {
                    const tile = bodyB.gameObject?.tile

                    if (tile && tile.properties.collides) {
                        this.canJump = true
                    }
                }// @ts-ignore
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
                        this.nextLevel()

                    }
                }
                if (bodyB == this.playerSprite.body) {
                    const tile = bodyA.gameObject?.tile
                    if (tile && tile.properties.next_map) {
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

        for (let x = 0; x < 10; x++) {
            this.slimeBlock()
        }

    }

    loopBoss() {
        let bossSpawn = (this.currentLevel + 1) * 3
        if (this.currentLevel == 4) {
            bossSpawn = 17
        }
        for (let x = 0; x < bossSpawn; x++) {
            this.createBoss()
        }
    }


    create() {
        // Create
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");

        this.enemyList = []
        this.bossList = []

        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
            fontSize: '20px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            // @ts-ignore
            fill: '#000000'
        });

        this.scoreText.setScrollFactor(0);

        this.playerDead = false

        this.bossKilled = 0


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
        // @ts-ignore
        let M = Phaser.Physics.Matter.Matter;

        let playerBody = M.Bodies.rectangle(100, 100, 32, 42)
        this.playerSprite.setMass(10)
        this.playerSprite.setBody(playerBody)
        this.playerSprite.setFixedRotation()
        this.playerSprite.setPosition(200, 200)

        this.speed = 16
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
        this.loopBoss();
        for (let x = 0; x < 100; x++) {
            this.MultiShoot()
        }

    }

    update(time) {
        // Update
        for (const boss of this.bossList) {
            boss?.update()
            boss?.shoot(this, time)
        }

        for (const enemy of this.enemyList) {
            enemy.update()
        }

        this.scoreText.setText(`Score: ${this.score}`)
        this.scoreText.depth = 100

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






    }
}