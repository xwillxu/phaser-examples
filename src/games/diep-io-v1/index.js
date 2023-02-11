import Phaser from 'phaser'

import Scene from './Scene'

const config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920 / 1.32,
        height: 1080 / 1.5
    },
    physics: {
        default: 'matter',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Scene]
};

export default new Phaser.Game(config)