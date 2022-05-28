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
        }

    }

    create() {
        this.connectToServer()
    }
    update() {

    }
}