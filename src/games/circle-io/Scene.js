import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import UiScene from "./UiScene"

export default class Scene extends Phaser.Scene {
    constructor() {
        super('circle.io-phaser')
        this.myId = null
        this.room = null
        this.circles = {}
        this.stateCircles = {}
        this.orbs = {}
        this.name = prompt('Enter Name')?.slice(0, 7)
    }

    preload() {

    }

    setupKeys() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.WKey = this.input.keyboard.addKey('W');
        this.AKey = this.input.keyboard.addKey('A');
        this.DKey = this.input.keyboard.addKey('D');
        this.SKey = this.input.keyboard.addKey('S');

        this.keystate = {
            'W': false, 'A': false, 'D': false, 'S': false
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

    playerZoom(zoomNumber) {
        this.cameras.main.zoomTo(zoomNumber, 1000)
    }

    setupCamera() {
        let mysessionId = this.myId
        let mycircle = this.circles[mysessionId]
        mycircle.first.setFillStyle(0x00ffff)
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('0x000000');
        this.cameras.main.startFollow(mycircle)
    }

    connectToServer() {
        var host = window.document.location.host.replace(/:.*/, '');
        const serverAdress = location.protocol.replace("http", "ws") + "//" + host + ':' + '2567'

        var client = new Colyseus.Client(serverAdress);

        client.joinOrCreate("circle_io", { name: this.name }).then(room_instance => {
            this.room = room_instance

            this.room.state.clients.onAdd = (player, sessionId) => {
                this.stateCircles[sessionId] = player

                let container = this.add.container(player.x, player.y);
                const circle = this.add.circle(0, 0, 25, 0x6666ff)
                console.log('size', player.size)
                let text = this.add.text(0, 0, `${player.name || "Guest"}`)
                text.setOrigin(0.5, 0.5);
                container.add(circle)
                container.add(text)
                this.listClients()
                this.circles[sessionId] = container
                player.onChange = updateChanges(player, sessionId, this.tweens);
            }

            this.room.state.clients.onRemove = (player, sessionId) => {
                let circle = this.circles[sessionId]
                delete this.stateCircles[sessionId]
                this.listClients()
                circle.destroy()
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

        const updateChanges = (stateObject, sessionId, tweens) => (changes) => {
            // TODO update changes
            let container = this.circles[sessionId]
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
                        console.log('id', sessionId, 'scale', parseInt(value) / 25,)
                        container.setScale(parseInt(value) / 25, parseInt(value) / 25)
                        if (sessionId == this.myId) {
                            let scale = 25 / parseInt(value)
                            const limit = 0.1
                            if (scale < limit) {
                                scale = limit
                            }
                            this.playerZoom(scale)
                        }
                        console.log('statePlayer', this.stateCircles)
                        let player = this.stateCircles[sessionId]
                        player.size = parseInt(value)
                        this.stateCircles[sessionId] = player
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
        this.scene.add('UiScene', UiScene, true, { stateCircles: this.stateCircles })
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
    }
}