import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import UiScene from "./UiScene"
import displayMessage from "../-useful-stuff-/user-inhancements/createMessage/createMessage"

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
        let serverAdress = location.protocol.replace("http", "ws") + "//" + host + ':' + '2567'
        if (host.indexOf('localhost') === -1) {
            serverAdress = 'wss://ws.imini.app'
        }

        var client = new Colyseus.Client(serverAdress);

        client.joinOrCreate("circle_io_v1", { name: this.name }).then(room_instance => {
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
                // Get the phaser circle or object
                let circle = this.circles[sessionId]

                // Delete Player from our client state where all the players are stored
                delete this.stateCircles[sessionId]

                // Update leaderboard
                this.listClients()

                // Destroy the Phaser Object linked to the state player
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
        // @ts-ignorenore
        this.scene.get('UiScene').listClients();
    }

    setupUiScene() {
        this.scene.add('UiScene', UiScene, true, { stateCircles: this.stateCircles })
    }

    instructions() {
        // The player's instuctions 1-11:
        this.instructionsOne = displayMessage(`Hello User, welcome to Battle.io, here arer the instructions:`, "chat", "Battle.io")
        this.instructionsTwo = displayMessage("The objectives of the game are to fight enemies (both AI, and other guests/users), stay alive for as long as possible, and gain lots of EXP for you team. The team with the most score will win the game!", "chat", "Battle.io")
        this.instructionsThree = displayMessage("Use arrow keys or WASD to move and space key/right click will fight with the regular move. To aim, you will need to use your pointer or use the auto-aim ability. Press the E Key for auto attack. Z Key & X Key can be both used to activate a special attack. Though inbetween attacks there is some reload time. You will need to use a Range Catergory Weapon with the X move unlocked to press F key for auto-aim.", "chat", "Battle.io")
        this.instructionsFour = displayMessage("You start with a weapon that has mastery 1, to level up your mastery you gain EXP. The reason you want mastery is so that you can use special attacks. The Z special attack requires you to click once. While the X attack needs you hold it for some time before realeasing it.", "chat", "Battle.io")
        this.instructionsFive = displayMessage("You may change your weapon everytime you kill another player or animal. Once you switch weapons you keep your mastery for you old weapon (just in case you want to switch back). Your new weapon will have mastery 1 or if you used it before you will get the old mastery.", "chat", "Battle.io")
        this.instructionsSix = displayMessage("There are currently three types of weapons, that each have three types of weapons in each catergory. These weapons in each catergory have different stats, but all belong to the same catergory. The three types of weapons are, swords, long ranged weapons, and abilitys. ", "chat", "Battle.io")
        this.instructionsSixExtra = displayMessage("There are currently three affects for each ability. Light Affect: The speed multiplier is no longer 1 but 1.2. Fire Affect: Deals 8 damage over 2 seconds, if fire affect happens again within the 2 seconds the fire affect just lasts for 2 extra seconds. Wind Affect: The knockback multiplier is increased by 1.2.", "chat", "Battle.io")
        this.instructionsSeven = displayMessage("Sword Catergory: [Diamond Katanas: [Damage: 20, Reload: 0.2 secs, Range: 9, Knockback: 9], Emerald Sword: [Damage: 20, Reload: 0.3secs, Range: 10, Knockback: 10], Daggers: [Damage 8, Reload: 0.1secs, Range: 5, Knockback: 5]], Range Catergory: [Crossbow: [Damage: 50, Reload: 0.9secs, Speed: 35, Knockback: 14], Bazooka: [Damage: 100, Reload: 2.0secs, Speed: 25, Knockback: 30], Minigunner: [Damage: 1, Reload: 0.02secs, Speed: 30, Knockback: 2]]", "chat", "Battle.io")
        this.instructionsEight = displayMessage("Ability Catergory: [Light: Player uses the Light Bow: Damage: 20, Reload: 0.5secs, Speed: 50, Knockback: 14, Knockback: 8. Also the player with Light gets the Light Affect.] [Fire: Uses the Fire sword: Damage: 17, Reload: 0.4secs, Range: 7,  Knockback: 9. Also the player with Fire gets the Fire Affect.] [Wind: Player uses the Knockback Crossbow: Damage: 25, Reload: 0.7secs, Speed: 50, Knockback: 15. The player with wind also gets the Wind Affect.]", "chat", "Battle.io")
        this.instructionsNine = displayMessage("There are currently three teams, you can actively join red team or blue team. The third team is the AI team, the amount of AIs depends on the mean of the player amount of the red team and blue team. The AI team can win and in that case all the players lost. When you win, you will basically become god and it's a free for all.", "chat", "Battle.io")
        this.instructionsTen = displayMessage("Currently the version of this game is 1.0, each new update will have more stuff. This is still a test version though. Updates coming up in an unknown amount of time. Each update should happen about every six months. Each update I'll add more stuff in the game.", "chat", "Battle.io")
        this.instructionsEleven = displayMessage("HAVE FUN!", "chat", "Battle.io")
    }

    create() {
        this.connectToServer()
        this.setupKeys()
        this.setupUiScene()
        this.instructions()
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