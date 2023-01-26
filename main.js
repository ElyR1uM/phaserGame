import titleScene from './src/scenes/titleScene';

const { Phaser } = require("./dist/phaser");

let titleScene = new titleScene();
let config = {
    type: Phaser.WEBGL,
    backgroundColor: '#2dab2d',
    width: 1920,
    height: 1080
};

let game = new Phaser.Game(config);
game.scene.add('titleScene', titleScene);
game.scene.start('titleScene')
