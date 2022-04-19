import Phaser from 'phaser'

import Scene from './Scene'

var config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 800
    },
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            enableSleep: false,
            debug: true
        }
    },
    scene: [Scene]
};

export default new Phaser.Game(config)