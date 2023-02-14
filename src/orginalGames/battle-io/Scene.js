import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"

export default class Scene extends Phaser.Scene {
    constructor() {
        super("battle-io-phaser")
        // The client's sessionId
        this.mySessionId = null
        // The serverside room
        this.serverRoom = null
        // The player list
        this.players = {}
        // The player's weapons list
        this.playerWeapons = {}
        // The AI/Enemy list
        this.enemys = {}
        // The AI/Enemy's weapons list
        this.enemysWeapoms = {}
        // The player's nametag
        this.name = prompt("Hello guest/user welcome to battle.io. The objectives of the game are to fight enemies (both AI, and other guests/users), stay alive for as long as possible, and gain lots of EXP for you team. The team with the most score will win the game! Use arrow keys or WASD to move and space key/right click will fight with the regular move. Z Key & X Key can be both used to activate a special attack. Though inbetween attacks there is some reload.")

    }
}