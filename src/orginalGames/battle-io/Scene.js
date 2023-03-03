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

        this.instructionsSix = displayMessage("There are currently three types of weapons, that each have three types of weapons in each catergory. These weapons in each catergory have different stats, but all belong to the same catergory. The three types of weapons are, swords, long ranged weapons, and abilitys. ", "chat", "Battle.io")

        this.instructionsSixExtra = displayMessage("There are currently three affects for each ability. Light Affect: The speed multiplier is no longer 1 but 1.2. Fire Affect: Deals 8 damage over 2 seconds, if fire affect happens again within the 2 seconds the fire affect just lasts for a longer time. Wind Affect: The knockback multiplier is increased by 1.2, and there is sticky affect which slows down the enemy by a multiplier of 0.9.", "chat", "Battle.io")

        this.instructionsSeven = displayMessage("Sword Catergory: [Double Iron Katana: [Damage: 15, Reload: 0.3secs, Range: 8, Knockback: 10], Emerald Sword: [Damage: 20, Reload: 0.4secs, Range: 7, Knockback: 9], Daggers: [Damage 6, Reload: 0.1secs, Range: 5, Knockback: 4]], Range Catergory: [Crossbow: [Damage: 50, Reload: 1.1secs, Speed: 35, Knockback: 14], Bazooka: [Damage: 99, Reload: 2.1secs, Speed: 25, Knockback: 30], Minigunner: [Damage: 4, Reload: 0.1secs, Speed: 30, Knockback: 2]]", "chat", "Battle.io")

        this.instructionsEight = displayMessage("Ability Catergory: [Light: Player uses the Light Bow: Damage: 20, Reload: 0.5secs, Speed: 50, Knockback: 14, Knockback: 8. Also the player with Light gets the Light Affect. Fire: Uses the Fire sword: Damage: 17, Reload: 0.4secs, Range: 7,  Knockback: 9. Also the player with Fire gets the Fire Affect. Wind: Player uses the Knockback Crossbow: Damage: 25, Reload: 0.7secs, Speed: 50, Knockback: 15. The player with wind also gets the Wind Affect.", "chat", "Battle.io")

        this.instructionsNine = displayMessage("There are currently three teams, you can actively join red team or blue team. The third team is the AI team, the amount of AIs depends on the mean of the player amount of the red team and blue team. The AI team can win and in that case all the players lost. When you win, you will basically become god and it's a free for all.", "chat", "Battle.io")

        this.instructionsTen = displayMessage("Currently the version of this game is 1.0, each new update will have more stuff. This is still a test version though. Updates coming up in an unknown amount of time. Each update should happen about every six months. Each update I'll add more stuff in the game.", "chat", "Battle.io")

        this.instructionsEleven = displayMessage("HAVE FUN!", "happy")


    }
}