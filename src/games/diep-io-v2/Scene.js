import Phaser from 'phaser'
import * as Colyseus from "colyseus.js"
import UiScene from "./UiScene"
import GUISceneUntouched from "./GUISceneUntouched.js"
import ContainerWithHealthBar from "../platformer/ContainerWithHealthBar"

export default class Scene extends Phaser.Scene {
    constructor() {
        super('diep.io-2-phaser')
        // This Cilents SessionId
        this.myId = null
        // ServerSide Room
        this.room = null
        // sessionId is the key and value is an array of world id of circles
        this.playerCircles = {}
        this.circles = {}
        // bullets player shoot
        this.bullets = {}
        // Get all the Players From the state
        this.statePlayers = {}
        // Orbs That spawn all Over The Map
        this.orbs = {}
        // Make Sure the Name is Not to long
        this.name = prompt('Enter Name')?.slice(0, 30)
        // Spliting Utilties
        this.canSplit = true
        // Keyboard Utilties
        this.autoShoot = false
        this.pointerPosX = 0
        this.pointerPosY = 0
        this.shootInterval = 0
        this.keystate = {}
        this.tankInfo = null
        this.guiSceneCreated = false
        this.myLevel = 0
    }

    setupKeys() {
        // Get All Keyboard Stuff
        this.cursors = this.input.keyboard.createCursorKeys()
        this.WKey = this.input.keyboard.addKey('W');
        this.AKey = this.input.keyboard.addKey('A');
        this.DKey = this.input.keyboard.addKey('D');
        this.SKey = this.input.keyboard.addKey('S');
        this.EKey = this.input.keyboard.addKey('E');
        this.SpaceKey = this.input.keyboard.addKey('Space');

        // Make then Accesseble
        this.keystate = {
            'W': false, 'A': false, 'D': false, 'S': false, 'E': false, 'Space': false
        }

        // Set Off Varibles To Send Changes To State
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
        this.SKey.on('down', function () {
            this.keystate.S = true
        }, this);

        this.SKey.on('up', function () {
            this.keystate.S = false
        }, this);

        this.EKey.on('down', function () {
            this.keystate.E = true
            this.switchAutoShoot()
        }, this);

        this.EKey.on('up', function () {
            this.keystate.E = false
        }, this);
        this.SpaceKey.on('down', function () {
            this.keystate.Space = true
        }, this)

        this.SpaceKey.on('up', function () {
            this.keystate.Space = false
        }, this)

    }

    switchAutoShoot() {
        if (!this.autoShoot) {
            this.shootInterval = setInterval(() => this.shoot(), 250)
            this.autoShoot = true
        } else {
            clearInterval(this.shootInterval)
            this.autoShoot = false
        }
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
            this.room.send("split")
            this.canSplit = false
            setTimeout(() => this.canSplit = true, 500)
        }
    }

    sendUpgradeInfo(tankName) {
        this.myTankName = tankName
        this.room.send("upgrade", tankName)
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
        // Make sure that the zoom number does not go over limit
        let sight = !this.tankInfo[this.myTankName]?.sight ? 1 : this.tankInfo[this.myTankName].sight
        const zoomNumber = 1 / biggestScale
        const zoomToUse = zoomNumber > (0.1 * Number(sight)) ? zoomNumber : (0.1 * Number(sight))

        this.cameras.main.zoomTo(zoomToUse, 1000)
    }

    startFollowPlayer(seconds) {
        // Timeout is needed the could not find it because phaser is still generating.
        setTimeout(() => {
            this.setupCamera()
            this.playerZoom()
        }, seconds)
    }

    setupCamera() {
        // Get the playerCircles of this client
        const playerCircles = this.findMyCircles()
        // Get a random circle
        let mycircle = playerCircles[0]
        // Undefined end loop
        if (!mycircle) return
        // Set the fill style for client's circles
        for (const playerCircle of playerCircles) {
            playerCircle.getAt(1).setFillStyle(0x00b0e1)
        }
        // Set the background color and start following the circle
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('0xCDCDCD');
        this.cameras.main.startFollow(mycircle)
    }

    findMyCircles() {
        // Get the ids
        const worldIds = this.playerCircles[this.myId]
        // Create circles array given to caller
        const circles = []
        // If worldIds undefined return nothing.
        if (!worldIds) return circles
        // Main loop to add circles to circles(array)
        for (const key in this.circles) {
            if (worldIds.indexOf(key) !== -1) circles.push(this.circles[key])
        }
        // Give all the info back to the caller
        return circles
    }

    generatePolygon(sides, object, size, color) {
        const angleIncrease = 360 / sides

        const points = []
        for (let i = 0; i < sides; i++) {
            const iPoint = new Phaser.Geom.Point(0, 0)
            const radian = Phaser.Math.DegToRad(angleIncrease * i + angleIncrease / 2)
            points.push(Phaser.Math.RotateTo(iPoint, 0, 0, radian, size))
        }
        const poly = this.add.polygon(0, 0, points, color)
        poly.x = poly.x + poly.displayOriginX;
        poly.y = poly.y + poly.displayOriginY;
        return poly
    }

    setupHp(container, value) {
        container.hp?.setHp(value)
    }

    displayUpgrades(change, level) {
        if (!change.value) return
        const newChange = JSON.parse(String(change.value))
        if (!this.scene.get("DisplayUpgrades")) {
            this.scene.add("DisplayUpgrades", GUISceneUntouched, true, { value: newChange, tankInfo: this.tankInfo })
        }
        const tankName = this.scene.get("DisplayUpgrades").listUpgrades(newChange)
        return tankName
    }

    connectToServer() {
        var host = window.document.location.host.replace(/:.*/, '');
        let serverAdress = location.protocol.replace("http", "ws") + "//" + host + ':' + '2567'
        if (host.indexOf('localhost') === -1) {
            serverAdress = 'wss://ws.imini.app'
        }

        var client = new Colyseus.Client(serverAdress);

        client.joinOrCreate("diep_io_v2", { name: this.name }).then(room_instance => {
            this.room = room_instance
            this.room.state.listen("tanks", (currentValue, previousValue) => {
                this.tankInfo = !!currentValue ? JSON.parse(currentValue) : {}
            });

            this.room.state.players.onAdd = (player, sessionId) => {
                this.statePlayers[sessionId] = player

                player.onChange = (playerChanges) => {
                    if (this.myId != sessionId) return
                    console.log(this.myId, sessionId)
                    for (const change of playerChanges) {
                        if (change.field == "tankUpgradeNames") {
                            this.displayUpgrades(change)
                        }
                    }
                }

                this.room.state.playerCircles.onAdd = (playerCircle, worldId) => {
                    const player = this.statePlayers[playerCircle.playerId]
                    if (!player) return
                    let container = new ContainerWithHealthBar(this, playerCircle.x, playerCircle.y, [], 77, -75, 2, playerCircle.hp);
                    let initialColor = 0xf04f54
                    // You will know that the playerCircle Belongs With This Player If The Players SessionId is The PlayerCircles PlayerId
                    if (playerCircle.playerId == this.myId) initialColor = 0x00B1DE
                    // Get tank attributes
                    const circle = this.add.circle(0, 0, 25, initialColor)
                    let text = this.add.text(0, 0, `${player?.name || "Guest"}`)
                    const turret = this.add.rectangle(0, 0, 45, 25, 0xa9a9a9)
                    turret.setOrigin(-0.1, 0.5)
                    text.setOrigin(0.5, 0.5);
                    container.add(turret)
                    container.add(circle)
                    container.add(text)
                    this.listClients()
                    this.circles[worldId] = container
                    if (typeof this.playerCircles[playerCircle.playerId] === 'undefined') {
                        this.playerCircles[playerCircle.playerId] = []
                    }
                    this.playerCircles[playerCircle.playerId].push(worldId)

                    // Very Long but safe proof
                    this.startFollowPlayer(500)
                    this.startFollowPlayer(1000)
                    this.startFollowPlayer(1500)
                    this.startFollowPlayer(2000)
                    this.startFollowPlayer(2500)
                    this.startFollowPlayer(3000)
                    this.startFollowPlayer(3500)
                    this.startFollowPlayer(4000)
                    this.startFollowPlayer(4500)
                    this.startFollowPlayer(5000)
                    this.startFollowPlayer(5500)
                    this.startFollowPlayer(6000)
                    this.startFollowPlayer(6500)
                    this.startFollowPlayer(7000)
                    this.startFollowPlayer(7500)
                    this.startFollowPlayer(8000)
                    this.startFollowPlayer(8500)
                    this.startFollowPlayer(9000)
                    this.startFollowPlayer(9500)
                    this.startFollowPlayer(10000)
                    this.startFollowPlayer(10500)
                    this.startFollowPlayer(11000)
                    this.startFollowPlayer(11500)
                    this.startFollowPlayer(12000)
                    this.startFollowPlayer(12500)
                    this.startFollowPlayer(13000)
                    this.startFollowPlayer(13500)
                    this.startFollowPlayer(14000)
                    this.startFollowPlayer(14500)
                    this.startFollowPlayer(15000)
                    this.startFollowPlayer(15500)
                    this.startFollowPlayer(16000)
                    this.startFollowPlayer(16500)
                    this.startFollowPlayer(17000)
                    this.startFollowPlayer(17500)
                    this.startFollowPlayer(18000)
                    this.startFollowPlayer(18500)
                    this.startFollowPlayer(19000)
                    this.startFollowPlayer(19500)
                    this.startFollowPlayer(20000)
                    playerCircle.onChange = updateChanges(playerCircle, worldId, this.tweens, this.circles, 25);
                }

                this.room.state.playerBullets.onAdd = (playerBullet, worldId) => {
                    let initialColor = 0xf04f54
                    if (playerBullet.playerId == this.myId) initialColor = 0x00b0e1
                    const bullet = this.add.circle(playerBullet.x, playerBullet.y, playerBullet.size / 2, initialColor)
                    this.bullets[worldId] = bullet
                    playerBullet.onChange = updateChanges(playerBullet, worldId, this.tweens, this.bullets, playerBullet.size / 2)

                }

                this.room.state.playerBullets.onRemove = (playerBullet, worldId) => {
                    let bullet = this.bullets[worldId]
                    bullet?.destroy()
                    delete this.bullets[worldId]

                    const currentPlayerCircles = this.playerCircles[playerBullet.playerId]
                    const newPlayerCircleIds = currentPlayerCircles.filter(x => x != worldId)
                    this.playerCircles[playerBullet.playerId] = newPlayerCircleIds
                }

                this.room.state.players.onRemove = (player, sessionId) => {
                    delete this.statePlayers[sessionId]
                    this.listClients()
                }

                this.room.state.playerCircles.onRemove = (playerCircle, worldId) => {
                    let circle = this.circles[worldId]
                    circle?.removeHp()
                    circle?.destroy()
                    delete this.circles[worldId]

                    const currentPlayerCircles = this.playerCircles[playerCircle.playerId]
                    const newPlayerCircleIds = currentPlayerCircles.filter(x => x != worldId)
                    this.playerCircles[playerCircle.playerId] = newPlayerCircleIds

                    this.setupCamera()
                }

                this.room.state.orbs.onAdd = (orb, id) => {
                    let orb2 = new ContainerWithHealthBar(this, orb.x, orb.y, [], 40 * orb.hpBarSizeMultiplier, -50 * orb.hpBarSizeMultiplier, orb.hpBarSizeMultiplier, orb.hp)

                    switch (orb.type) {
                        case 'rectangle':
                            orb2.add(this.add.rectangle(0, 0, 30, 30, 0xfff123))
                            break;
                        case 'triangle':
                            orb2.add(this.generatePolygon(3, orb, 30, 0xfc7676))
                            break;
                        case 'pentagon':
                            orb2.add(this.generatePolygon(5, orb, 50, 0x768cfc))
                            break;
                        case 'alphaPentagon':
                            orb2.add(this.generatePolygon(5, orb, 250, 0x768cfc))
                            break;
                    }
                    this.orbs[id] = orb2
                    orb.onChange = updateChanges(orb2, id, this.tweens, this.orbs);
                }

                this.room.state.orbs.onRemove = (orb, id) => {
                    let orb2 = this.orbs[id]
                    orb2.removeHp()
                    orb2.destroy()
                }

                this.room.state.walls.onAdd = (wall, id) => this.add.rectangle(wall.x, wall.y, wall.width, wall.height, 0xBBBBBB)


                this.myId = this.room.sessionId
            }

            const updateChanges = (stateObject, worldId, tweens, dictionary, baseSize) => (changes) => {
                // TODO update changes
                if (!dictionary) return
                let container = dictionary[worldId]
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
                        case 'angle':
                            container.setAngle(Phaser.Math.RadToDeg(value))
                            break;
                        case 'hp':
                            this.setupHp(container, value)
                            break;
                        case 'size':
                            container.setScale(parseInt(value) / baseSize, parseInt(value) / baseSize)
                            this.playerZoom()
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
                    duration: 190,
                    ease: 'Power1'
                });
            }
        })
    }

    listClients() {
        // Create And Update The Leader Board
        this.scene.get('UiScene').listClients();
    }

    setupUiScene() {
        // Setup the UI sence used for the leaderboard
        this.scene.add('UiScene', UiScene, true, { statePlayers: this.statePlayers })
    }

    shoot() {
        if (!this.room) return
        const targetXY = {
            targetX: this.pointerPosX,
            targetY: this.pointerPosY,
        }
        this.room.send("shoot", targetXY)
    }

    create() {
        // Call some functions
        this.connectToServer()
        this.setupKeys()
        this.setupUiScene()
        this.input.on('pointerdown', function (pointer) {
            if (this.autoShoot) return
            this.shoot()
        }, this);

        this.input.on('pointermove', function (pointer) {
            if (!this.room) return
            const targetXY = {
                targetX: pointer.worldX,
                targetY: pointer.worldY,
            }
            this.pointerPosX = targetXY.targetX
            this.pointerPosY = targetXY.targetY
            this.room.send("pointermove", targetXY)
        }, this);


    }

    update() {
        // Call the functions that use the keyboard events to move the player.

        if (!this.room) return


        for (const containerId in this.circles) {
            const container = this.circles[containerId]
            container.update()
        }

        for (const orbId in this.orbs) {
            const orb = this.orbs[orbId]
            orb.update()
        }

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
