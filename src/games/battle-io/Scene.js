import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import displayMessage from "../-useful-stuff-/user-inhancements/createMessage/createMessage"
// @ts-ignore
import playerImage from "../../assets/battleIoPlayer.png"

export default class Scene extends Phaser.Scene {
    constructor() {
        super("battle-io-phaser")
        // The client's sessionId:
        this.mySessionId = null
        // The serverside room:
        this.serverRoom = null
        // The player list:
        this.players = {}
        // The player's weapons list:
        this.playerWeapons = {}
        // The AI/Enemy list:
        this.enemys = {}
        // The AI/Enemy's weapons list:
        this.enemysWeapoms = {}
        // The list were all the players state info is:
        this.statePlayers = {}
        // The player's name:
        this.name = ""
        // State for the keys:
        this.keystate = {}
        // Mastery for the player:
        this.myMastery = 1
        // Fighting type for the player:
        this.myFightingStyle = "Unknown"
        // The player's weapon name:
        this.myWeapon = "Unknown"
        // Speed multiplier:
        this.speedMultiplier = 1
        // The player's instuctions 1-11:
        this.instructionsOne = displayMessage("Hello guest/user, welcome to battle.io.", "chat", "Battle.io")
        this.instructionsTwo = displayMessage("The objectives of the game are to fight enemies (both AI, and other guests/users), stay alive for as long as possible, and gain lots of EXP for you team. The team with the most score will win the game!", "chat", "Battle.io")
        this.instructionsThree = displayMessage("Use arrow keys or WASD to move and space key/right click will fight with the regular move. To aim, you will need to use your pointer or use the auto-aim ability. Press the E Key for auto attack. Z Key & X Key can be both used to activate a special attack. Though inbetween attacks there is some reload time.", "chat", "Battle.io")
        this.instructionsFour = displayMessage("You start with a weapon that has mastery 1, to level up your mastery you gain EXP. The reason you want mastery is so that you can use special attacks. The Z special attack requires you to click once. While the X attack needs you hold it for some time before realeasing it.", "chat", "Battle.io")
        this.instructionsFive = displayMessage("You may change your weapon everytime you kill a enemy. Once you switch weapons you keep your mastery for you old weapon (just in case you want to switch back). Your new weapon will have mastery 1 or if you used it before you will get the old mastery.", "chat", "Battle.io")
        this.instructionsSix = displayMessage("There are currently three types of weapons, that each have three types of weapons in each catergory. These weapons in each catergory have different stats, but all belong to the same catergory. The three types of weapons are, swords, long ranged weapons, and abilitys. ", "chat", "Battle.io")
        this.instructionsSixExtra = displayMessage("There are currently three affects for each ability. Light Affect: The speed multiplier is no longer 1 but 1.2. Fire Affect: Deals 8 damage over 2 seconds, if fire affect happens again within the 2 seconds the fire affect just lasts for 2 extra seconds. Wind Affect: The knockback multiplier is increased by 1.2.", "chat", "Battle.io")
        this.instructionsSeven = displayMessage("Sword Catergory: [Double Iron Katana: [Damage: 15, Reload: 0.3secs, Range: 8, Knockback: 10], Emerald Sword: [Damage: 20, Reload: 0.4secs, Range: 7, Knockback: 9], Daggers: [Damage 6, Reload: 0.1secs, Range: 5, Knockback: 4]], Range Catergory: [Crossbow: [Damage: 50, Reload: 1.1secs, Speed: 35, Knockback: 14], Bazooka: [Damage: 99, Reload: 2.1secs, Speed: 25, Knockback: 30], Minigunner: [Damage: 4, Reload: 0.1secs, Speed: 30, Knockback: 2]]", "chat", "Battle.io")
        this.instructionsEight = displayMessage("Ability Catergory: [Light: Player uses the Light Bow: Damage: 20, Reload: 0.5secs, Speed: 50, Knockback: 14, Knockback: 8. Also the player with Light gets the Light Affect. Fire: Uses the Fire sword: Damage: 17, Reload: 0.4secs, Range: 7,  Knockback: 9. Also the player with Fire gets the Fire Affect. Wind: Player uses the Knockback Crossbow: Damage: 25, Reload: 0.7secs, Speed: 50, Knockback: 15. The player with wind also gets the Wind Affect.", "chat", "Battle.io")
        this.instructionsNine = displayMessage("There are currently three teams, you can actively join red team or blue team. The third team is the AI team, the amount of AIs depends on the mean of the player amount of the red team and blue team. The AI team can win and in that case all the players lost. When you win, you will basically become god and it's a free for all.", "chat", "Battle.io")
        this.instructionsTen = displayMessage("Currently the version of this game is 1.0, each new update will have more stuff. This is still a test version though. Updates coming up in an unknown amount of time. Each update should happen about every six months. Each update I'll add more stuff in the game.", "chat", "Battle.io")
        this.instructionsEleven = displayMessage("HAVE FUN!", "chat", "Battle.io")
    }

    getUserName() {
        // TODO: V1 menu will be added later.
        prompt("Enter Name", "")?.slice(0, 30)
    }

    preload() {
        this.load.image("playerImage", playerImage)
    }

    connectToServer() {
        var host = window.document.location.host.replace(/:.*/, '');
        let serverAdress = location.protocol.replace("http", "ws") + "//" + host + ':' + '2567'
        if (host.indexOf('localhost') === -1) {
            serverAdress = 'wss://ws.imini.app'
        }

        var client = new Colyseus.Client(serverAdress);

        client.joinOrCreate("battle_io", { name: this.name }).then(room_instance => {
            this.room = room_instance

            this.room.state.players.onAdd = (player, sessionId) => {
                this.statePlayers[sessionId] = player

                const playerContainer = this.add.container(player.x, player.y, [])
                const playerMainBody = this.add.sprite(0, 0, "playerImage", 0)
                playerContainer.add(playerMainBody)

                const playerName = this.add.text(0, 0, `${this.name || "User"}`)
                playerName.setOrigin(0.5, 0.5)
                playerContainer.add(playerName)

                this.players[sessionId] = playerContainer
                player.onChange = this //TODO: function 

            }
        })

        const updateChanges = (stateObject, sessionId, tweens) => (changes) => {
        }
    }

    setupKeys() {
        // Create all the keys that will be used:
        this.cursors = this.input.keyboard.createCursorKeys()
        this.WKey = this.input.keyboard.addKey("W")
        this.AKey = this.input.keyboard.addKey("A")
        this.SKey = this.input.keyboard.addKey("S")
        this.DKey = this.input.keyboard.addKey("D")
        this.EKey = this.input.keyboard.addKey("E")
        this.ZKey = this.input.keyboard.addKey("Z")
        this.XKey = this.input.keyboard.addKey("X")

        // Make the keys created accessible:
        this.keystate = {
            "W": false, "A": false, "S": false, "D": false, "E": false, "Z": false, "X": false
        }

        // Add the events that will trigger the changes in the state for all the keys:
        this.WKey.on("down", () => {
            this.keystate.W = true
        }, this)

        this.WKey.on("up", () => {
            this.keystate.W = false
        }, this)

        this.AKey.on("down", () => {
            this.keystate.A = true
        }, this)

        this.AKey.on("up", () => {
            this.keystate.A = false
        }, this)

        this.SKey.on("down", () => {
            this.keystate.S = true
        }, this)

        this.SKey.on("up", () => {
            this.keystate.S = false
        }, this)

        this.DKey.on("down", () => {
            this.keystate.D = true
        }, this)

        this.DKey.on("up", () => {
            this.keystate.D = false
        }, this)

        this.EKey.on("down", () => {
            this.keystate.E = true
        }, this)

        this.EKey.on("up", () => {
            this.keystate.E = false
        }, this)

        this.ZKey.on("down", () => {
            this.keystate.Z = true
        }, this)

        this.ZKey.on("up", () => {
            this.keystate.Z = false
        }, this)

        this.XKey.on("down", () => {
            this.keystate.X = true
        }, this)

        this.XKey.on("up", () => {
            this.keystate.X = false
        }, this)

    }

    up() {
        const speed = 7 * this.speedMultiplier
        var movement = { y: speed }
        this.room.send("move", movement);
    }

    left() {
        const speed = -7 * this.speedMultiplier
        var movement = { x: speed }
        this.room.send("move", movement);
    }

    down() {
        const speed = -7 * this.speedMultiplier
        var movement = { y: speed }
        this.room.send("move", movement);
    }

    right() {
        const speed = 7 * this.speedMultiplier
        var movement = { x: speed }
        this.room.send("move", movement);
    }


    sendToRoomAttackZ(fightingStyle, weapon, mastery) {
        const specialAttackZObject = {
            fightingStyle: fightingStyle,
            weapon: weapon,
            mastery: mastery
        }
        this.room.send("specialAttackZ", specialAttackZObject)

    }


    sendToRoomAttackX(fightingStyle, weapon, mastery, time) {

        const specialAttackXObject = {
            fightingStyle: fightingStyle,
            weapon: weapon,
            mastery: mastery,
            time: time
        }
        this.room.send("specialAttackX", specialAttackXObject)


    }

    startTimerXMove(fightingStyle, weapon, mastery) {
        let time;
        const timeInterval = setInterval(() => {
            time += 0.1
        }, 100)
        if (!this.keystate.X) {
            clearInterval(timeInterval)
            this.sendToRoomAttackX(fightingStyle, weapon, mastery, time)
        }

    }


    create() {
        this.getUserName()
        this.connectToServer()
        this.setupKeys()
    }

    update() {
        if (this.cursors.up.isDown || this.keystate.W == true) {
            this.up()
        }

        if (this.cursors.left.isDown || this.keystate.A == true) {
            this.left()
        }

        if (this.cursors.down.isDown || this.keystate.S == true) {
            this.down()
        }

        if (this.cursors.right.isDown || this.keystate.D == true) {
            this.right()
        }


        if (this.keystate.Z) {
            this.sendToRoomAttackZ()
        }
        if (this.keystate.X) {
            this.startTimerXMove()
        }
    }
}