import Phaser from 'phaser'

import Scene from './Scene'

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#000000',
    scene: [Scene]
};

export default new Phaser.Game(config)