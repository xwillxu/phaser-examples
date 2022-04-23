import Phaser from 'phaser'

// Add All The Different Scenes
import Scene from './Scene'
import SceneDie from './SceneDie'
import SceneStart from './SceneStart'

var config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 800
    },
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            enableSleep: false,
            debug: true
        }
    },
    scene: [SceneStart, Scene, SceneDie]
};

export default new Phaser.Game(config)