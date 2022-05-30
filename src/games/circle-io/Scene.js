import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"

export default class Scene extends Phaser.Scene {
    constructor() {
        super('circle.io-phaser')
        this.players = {}
        this.myId = null
        this.room = null
        this.circles = {}
        this.name = prompt('Enter Name')
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

    setupCamera() {
        let mysessionId = this.myId
        let mycircle = this.circles[mysessionId]
        mycircle.setFillStyle(0x00ffff)
        this.cameras.main.startFollow(mycircle)
    }

    connectToServer() {
        var host = window.document.location.host.replace(/:.*/, '');
        const serverAdress = location.protocol.replace("http", "ws") + "//" + host + ':' + '2567'

        var client = new Colyseus.Client(serverAdress);

        client.joinOrCreate("circle_io", { name: this.name }).then(room_instance => {
            this.room = room_instance


            this.room.state.clients.onAdd = (player, sessionId) => {
                this.players[sessionId] = player
                const circle = this.add.circle(player.x, player.y, 50, 0x6666ff)
                this.circles[sessionId] = circle
                player.onChange = updateChanges(player, sessionId);
            }

            this.room.state.clients.onRemove = function (player, sessionId) {
                let circle = this.circles[sessionId]
                delete this.players[sessionId]
                circle.destroy()
            }

            this.myId = this.room.sessionId
        })

        const updateChanges = (stateObject, sessionId) => (changes) => {
            console.log("stateObject", stateObject, "sessionId", sessionId, "changes", changes)
            // TODO update changes
            let circle = this.circles[sessionId]
            console.log('circle', circle)
            if (!circle) return
            circle.setRadius(50)
            this.setupCamera()

            changes.forEach(({ field, value }) => {
                switch (field) {
                    case 'x':
                        circle.x = parseInt(value);
                        break;
                    case 'y':
                        circle.y = parseInt(value);
                        break;
                }
            });
        }

    }

    create() {
        this.connectToServer()
        this.setupKeys()
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