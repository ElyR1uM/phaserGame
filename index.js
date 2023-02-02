import Phaser from './src/phaser';
import matter from './src/physics/matter-js/index';
import gameSceneClass from './gameScene';

const config = {
    type: Phaser.WEBGL,
    width: 2560,
    height: 1440,
    backgroundColor: '#000021',
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
    scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
    },
    physics: {
        default: 'matter', //Allows rigidbodies etc that might be useful is I get to implement combat like in Undertale or jsab
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    }
}

let sceneOne = new gameSceneClass();
let game = new Phaser.Game(config);
game.scene.add('gameScene', sceneOne);
game.scene.start('gameScene');
