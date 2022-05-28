import Phaser from 'phaser'

import Scene from './Scene'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
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