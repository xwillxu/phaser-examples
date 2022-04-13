import Phaser from 'phaser'

import Scene from './Scene'

var config = {
    width: 800,
    height: 600,
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