import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import displayMessage from "../-useful-stuff-/user-inhancements/createMessage/createMessage"
import UiScene from "../circle-io-v1/UiScene"
// @ts-ignore
import playerImage from "../../assets/Battle.io Skins/Etheral.png"

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
    }

    getUserName() {
        // TODO: Menu
        this.name = prompt("Enter Name", "")?.slice(0, 30)
    }

    preload() {
        this.load.image("playerImage", playerImage)
        this.load.spritesheet('boom', 'assets/sprites/explosion.png', { frameWidth: 128, frameHeight: 128, endFrame: 23 });
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
                player.onChange = updateChanges(player, sessionId, this.tweens, this.players)

            }
        })

        const updateChanges = (stateObject, worldId, tweens, dictionary) => (changes) => {
            if (!dictionary) return
            let container = dictionary[worldId] //TODO: dict stuff
            if (!container) return
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
                    case 'score':
                        this.listClients()
                        break;
                }
            })

            tweens.add({
                targets: container,
                x: targetX,
                y: targetY,
                duration: 200,
                ease: 'Power2'
            });
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

    sendToRoomAttack(fightingStyle, weapon, mastery, moveType, time = 0) {
        const specialAttackObject = {
            fightingStyle: fightingStyle,
            weapon: weapon,
            mastery: mastery,
            moveType: moveType,
            time: time
        }
        this.room.send("specialAttack", specialAttackObject)


    }

    startTimerMove(fightingStyle, weapon, mastery, moveType) {
        let time = 0
        const timeInterval = setInterval(() => {
            time += 0.1
        }, 100)
        if (time <= 3) {
            clearInterval(timeInterval)
            this.sendToRoomAttack(fightingStyle, weapon, mastery, moveType, time)
        }
        if (!this.keystate.X) {
            clearInterval(timeInterval)
            this.sendToRoomAttack(fightingStyle, weapon, mastery, moveType, time)
        }

    }

    listClients() {
        // @ts-ignore
        this.scene.get('UiScene').listClients();
    }

    setupUiScene() {
        this.scene.add('UiScene', UiScene, true, { stateCircles: this.statePlayers })
    }

    instructions() {
        // The player's instuctions 1-11:
        alert(`Hello ${this.name}, welcome to Battle.io, here are the instructions: The objectives of the game are to fight enemies (both AI, and other guests/users), stay alive for as long as possible, and gain lots of EXP for you team. The team with the most score will win the game! Use arrow keys or WASD to move and space key/right click will fight with the regular move. To aim, you will need to use your pointer or use the auto-aim ability. Press the E Key for auto attack. Z Key & X Key can be both used to activate a special attack. Though inbetween attacks there is some reload time. You will need to use a Range Catergory Weapon with the X move unlocked to press F key for auto-aim. You start with a weapon that has mastery 1, to level up your mastery you gain EXP. The reason you want mastery is so that you can use special attacks. The Z special attack requires you to click once. While the X attack needs you hold it for some time before realeasing it. You may change your weapon everytime you kill another player or animal. Once you switch weapons you keep your mastery for you old weapon (just in case you want to switch back). Your new weapon will have mastery 1 or if you used it before you will get the old mastery. There are currently three types of weapons, that each have three types of weapons in each catergory. These weapons in each catergory have different stats, but all belong to the same catergory. The three types of weapons are, swords, long ranged weapons, and abilitys. There are currently three affects for each ability. Light Affect: The speed multiplier is no longer 1 but 1.2. Fire Affect: Deals 8 damage over 2 seconds, if fire affect happens again within the 2 seconds the fire affect just lasts for 2 extra seconds. Wind Affect: The knockback multiplier is increased by 1.2.`)
        // this.instructionsOne = displayMessage(`Hello ${this.name}, welcome to Battle.io, here are the instructions:`, "chat", "Battle.io")
        // this.instructionsTwo = displayMessage("The objectives of the game are to fight enemies (both AI, and other guests/users), stay alive for as long as possible, and gain lots of EXP for you team. The team with the most score will win the game!", "chat", "Battle.io")
        // this.instructionsThree = displayMessage("Use arrow keys or WASD to move and space key/right click will fight with the regular move. To aim, you will need to use your pointer or use the auto-aim ability. Press the E Key for auto attack. Z Key & X Key can be both used to activate a special attack. Though inbetween attacks there is some reload time. You will need to use a Range Catergory Weapon with the X move unlocked to press F key for auto-aim.", "chat", "Battle.io")
        // this.instructionsFour = displayMessage("You start with a weapon that has mastery 1, to level up your mastery you gain EXP. The reason you want mastery is so that you can use special attacks. The Z special attack requires you to click once. While the X attack needs you hold it for some time before realeasing it.", "chat", "Battle.io")
        // this.instructionsFive = displayMessage("You may change your weapon everytime you kill another player or animal. Once you switch weapons you keep your mastery for you old weapon (just in case you want to switch back). Your new weapon will have mastery 1 or if you used it before you will get the old mastery.", "chat", "Battle.io")
        // this.instructionsSix = displayMessage("There are currently three types of weapons, that each have three types of weapons in each catergory. These weapons in each catergory have different stats, but all belong to the same catergory. The three types of weapons are, swords, long ranged weapons, and abilitys. ", "chat", "Battle.io")
        // this.instructionsSixExtra = displayMessage("There are currently three affects for each ability. Light Affect: The speed multiplier is no longer 1 but 1.2. Fire Affect: Deals 8 damage over 2 seconds, if fire affect happens again within the 2 seconds the fire affect just lasts for 2 extra seconds. Wind Affect: The knockback multiplier is increased by 1.2.", "chat", "Battle.io")
        this.instructionsSeven = displayMessage("Sword Catergory: [Diamond Katanas: [Damage: 20, Reload: 0.2 secs, Range: 9, Knockback: 9], Emerald Sword: [Damage: 20, Reload: 0.3secs, Range: 10, Knockback: 10], Daggers: [Damage 8, Reload: 0.1secs, Range: 5, Knockback: 5]], Range Catergory: [Crossbow: [Damage: 50, Reload: 0.9secs, Speed: 35, Knockback: 14], Bazooka: [Damage: 100, Reload: 2.0secs, Speed: 25, Knockback: 30], Minigunner: [Damage: 1, Reload: 0.02secs, Speed: 30, Knockback: 2]]", "chat", "Battle.io")
        this.instructionsEight = displayMessage("Ability Catergory: [Light: Player uses the Light Bow: Damage: 20, Reload: 0.5secs, Speed: 50, Knockback: 14, Knockback: 8. Also the player with Light gets the Light Affect.] [Fire: Uses the Fire sword: Damage: 17, Reload: 0.4secs, Range: 7,  Knockback: 9. Also the player with Fire gets the Fire Affect.] [Wind: Player uses the Knockback Crossbow: Damage: 25, Reload: 0.7secs, Speed: 50, Knockback: 15. The player with wind also gets the Wind Affect.]", "chat", "Battle.io")
        this.instructionsNine = displayMessage("There are currently three teams, you can actively join red team or blue team. The third team is the AI team, the amount of AIs depends on the mean of the player amount of the red team and blue team. The AI team can win and in that case all the players lost. When you win, you will basically become god and it's a free for all.", "chat", "Battle.io")
        this.instructionsTen = displayMessage("Currently the version of this game is 1.0, each new update will have more stuff. This is still a test version though. Updates coming up in an unknown amount of time. Each update should happen about every six months. Each update I'll add more stuff in the game.", "chat", "Battle.io")
        this.instructionsEleven = displayMessage("HAVE FUN!", "chat", "Battle.io")
    }

    create() {
        this.getUserName()
        this.connectToServer()
        this.setupKeys()

        if (this.name != null || this.name != "User") {
            this.instructions()
        }


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

        if (this.keystate.X) {
            this.startTimerMove(this.myFightingStyle, this.myWeapon, this.myMastery, "X")
        }

        if (this.keystate.Z) {
            this.sendToRoomAttack(this.myFightingStyle, this.myWeapon, this.myMastery, "Z")
        }
    }
}









































































//                           👾👾👾 THANKS FOR SCROLLING DOWN FOR NOTHING! 👾👾👾

//                           👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾
//                           👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾
//                           👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾 