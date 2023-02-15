import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import displayMessage from "../../games/-useful-stuff-/user-inhancements/createMessage/createMessage"

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
        // The player's instuctions
        this.instructionsOne = displayMessage("Hello guest/user welcome to battle.io.", "chat", "Battle.io")
        this.instructionsTwo = displayMessage("The objectives of the game are to fight enemies (both AI, and other guests/users), stay alive for as long as possible, and gain lots of EXP for you team. The team with the most score will win the game!", "chat", "Battle.io")
        this.instructionsThree = displayMessage("Use arrow keys or WASD to move and space key/right click will fight with the regular move. Z Key & X Key can be both used to activate a special attack. Though inbetween attacks there is some reload time.", "chat", "Battle.io")
        this.instructionsFour = displayMessage("You start with a weapon that has mastery 1, to level up your mastery you gain EXP. The reason you want mastery is so that you can use special attacks. ", "chat", "Battle.io")
        this.instructionsFive = displayMessage("You may change your weapon everytime you kill a enemy. Once you switch weapons you keep your mastery for you old weapon (just in case you want to switch back). Your new weapon will have mastery 1 or if you used it before you will get the old mastery.", "chat", "Battle.io")


    }
}