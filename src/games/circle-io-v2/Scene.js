import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import UiScene from "./UiScene"

export default class Scene extends Phaser.Scene {
    constructor() {
        super('circle.io-phaser')
        this.myId = null
        this.cameraCircle = null
        this.room = null
        // sessionId is the key and value is an array of world id of circles
        this.playerCircles = {}
        this.circles = {}
        this.statePlayers = {}
        this.orbs = {}
        this.name = prompt('Enter Name')?.slice(0, 20)

        this.canSplit = true
    }

    preload() {

    }

    setupKeys() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.WKey = this.input.keyboard.addKey('W');
        this.AKey = this.input.keyboard.addKey('A');
        this.DKey = this.input.keyboard.addKey('D');
        this.SKey = this.input.keyboard.addKey('S');
        this.SpaceKey = this.input.keyboard.addKey('Space');

        this.keystate = {
            'W': false, 'A': false, 'D': false, 'S': false, 'Space': false
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

        this.SKey.on('down', function () {
            this.keystate.S = true
        }, this);

        this.SKey.on('up', function () {
            this.keystate.S = false
        }, this);

        this.SpaceKey.on('down', function () {
            this.keystate.Space = true
        }, this)

        this.SpaceKey.on('up', function () {
            this.keystate.Space = false
        }, this)

    }


    up() {
        var movement = { y: -7 }

        this.room.send("move", movement);
    }

    down() {
        var movement = { y: 7 }

        this.room.send("move", movement);
    }

    right() {
        var movement = { x: 7 }

        this.room.send("move", movement);
    }

    left() {
        var movement = { x: -7 }

        this.room.send("move", movement);
    }

    split() {
        if (this.canSplit) {

            this.canSplit = false

            var player = this.circles[this.myId]

            this.room.send("split", player)

            setTimeout(() => { this.canSplit = true }, 500)

        }
    }

    playerZoom() {
        // Calculate based on the biggest circle the player has
        const myCircles = this.findMyCircles()
        const circleScales = []
        let biggestScale = 0
        for (const circle of myCircles) {
            circleScales.push(circle.scaleX)
        }
        for (const scale of circleScales) {
            if (scale >= biggestScale) {
                biggestScale = scale
            }
        }

        const zoomNumber = 1 / biggestScale
        const zoomToUse = zoomNumber > 0.1 ? zoomNumber : 0.1

        this.cameras.main.zoomTo(zoomToUse, 1000)
    }

    setupCamera() {
        const playerCircles = this.findMyCircles()
        let mycircle = playerCircles[0]
        if (!mycircle) return

        this.cameraCircle = mycircle
        for (const playerCircle of playerCircles) {
            playerCircle.first?.setFillStyle(0x00ffff)
        }
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('0x000000');
        this.cameras.main.startFollow(mycircle)
    }

    findMyCircles() {
        const worldIds = this.playerCircles[this.myId]
        const circles = []
        if (!worldIds) return circles
        for (const key in this.circles) {
            if (worldIds.indexOf(key) !== -1) circles.push(this.circles[key])
        }
        return circles
    }

    connectToServer() {
        var host = window.document.location.host.replace(/:.*/, '');
        let serverAdress = location.protocol.replace("http", "ws") + "//" + host + ':' + '2567'
        if (host.indexOf('localhost') === -1) {
            serverAdress = 'wss://ws.imini.app'
        }

        var client = new Colyseus.Client(serverAdress);

        client.joinOrCreate("circle_io_v2", { name: this.name }).then(room_instance => {
            this.room = room_instance

            this.room.state.players.onAdd = (player, sessionId) => {
                this.statePlayers[sessionId] = player
            }

            this.room.state.playerCircles.onAdd = (playerCircle, worldId) => {
                const player = this.statePlayers[playerCircle.playerId]

                let container = this.add.container(playerCircle.x, playerCircle.y);
                const circle = this.add.circle(0, 0, 25, 0x6666ff)
                let text = this.add.text(0, 0, `${player.name || "Guest"}`)
                text.setOrigin(0.5, 0.5);
                container.add(circle)
                container.add(text)
                this.listClients()
                this.circles[worldId] = container
                if (typeof this.playerCircles[playerCircle.playerId] === 'undefined') {
                    this.playerCircles[playerCircle.playerId] = []
                }
                this.playerCircles[playerCircle.playerId].push(worldId)
                playerCircle.onChange = updateChanges(playerCircle, worldId, this.tweens);
            }


            this.room.state.players.onRemove = (player, sessionId) => {
                delete this.statePlayers[sessionId]
                this.listClients()
            }

            this.room.state.playerCircles.onRemove = (playerCircle, worldId) => {
                let circle = this.circles[worldId]
                circle.destroy()
                delete this.circles[worldId]

                const currentPlayerCircles = this.playerCircles[playerCircle.playerId]
                const newPlayerCircleIds = currentPlayerCircles.filter(x => x != worldId)
                this.playerCircles[playerCircle.playerId] = newPlayerCircleIds

                this.setupCamera()
            }

            this.room.state.orbs.onAdd = (orb, id) => {
                const orb2 = this.add.circle(orb.x, orb.y, 20, 0x1cfc03)
                this.orbs[id] = orb2
                orb.onChange = updateChanges(orb2, id);
            }

            this.room.state.orbs.onRemove = (orb, id) => {
                let orb2 = this.orbs[id]
                orb2.destroy()
            }

            this.myId = this.room.sessionId
        })

        const updateChanges = (stateObject, worldId, tweens) => (changes) => {
            // TODO update changes
            let container = this.circles[worldId]
            if (!container) return
            this.setupCamera()
            let targetX = container.x
            let targetY = container.y

            changes.forEach(({ field, value }) => {
                switch (field) {
                    case 'x':
                        targetX = parseInt(value);
                        break;
                    case 'y':
                        targetY = parseInt(value);
                        break;
                    case 'size':
                        container.setScale(parseInt(value) / 25, parseInt(value) / 25)
                        this.playerZoom()
                        // if (worldId == this.myId) {
                        //     let scale = 25 / parseInt(value)
                        //     const limit = 0.1
                        //     if (scale < limit) {
                        //         scale = limit
                        //     }
                        //     this.playerZoom(scale)
                        // }
                        // console.log('statePlayer', this.statePlayers)
                        // let player = this.circles[worldId]
                        // player.size = parseInt(value)
                        // this.statePlayers[worldId] = player
                        this.listClients()
                        break;
                    case 'score':
                        this.listClients()
                        break;
                }
            });

            tweens.add({
                targets: container,
                x: targetX,
                y: targetY,
                duration: 200,
                ease: 'Power2'
            });
        }
    }

    listClients() {
        this.scene.get('UiScene').listClients();
    }

    setupUiScene() {
        this.scene.add('UiScene', UiScene, true, { statePlayers: this.statePlayers })
    }


    create() {
        this.connectToServer()
        this.setupKeys()
        this.setupUiScene()
    }

    update() {
        if (this.cursors.left.isDown || this.keystate.A == true) {
            this.left()
        }

        if (this.cursors.right.isDown || this.keystate.D == true) {
            this.right()
        }

        if (this.cursors.up.isDown || this.keystate.W == true) {
            this.up()
        }

        if (this.cursors.down.isDown || this.keystate.S == true) {
            this.down()
        }

        if (this.cursors.space.isDown || this.keystate.Space == true) {
            this.split()
        }
    }
}