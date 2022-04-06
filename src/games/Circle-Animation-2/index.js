import Phaser from 'phaser'

import Scene from './Scene'

var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: [Scene]
};

export default new Phaser.Game(config)