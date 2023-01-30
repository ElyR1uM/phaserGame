let config = {
    type: Phaser.WEBGL,
    backgroundColor: '#2dab2d',
    width: 1920,
    height: 1080,
    pixelArt: true,
};

class titleSceneClass extends Phaser.Scene {
    constructor() {
        super({key: 'titleScene'});
    }

    preload() {
        this.load.image('bg', './assets/exported-images/backgroundCave.png');
        this.load.image('tilemap', './assets/exported-images/cPathTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
        this.load.tilemaptiledJSON('floor-one', './assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
    }

    create () {
        let background = this.add.image(0, 0, 'bg').setOrigin(0);
        background.setScale(7.5);
    }
}
let titleScene = new titleSceneClass();
let game = new Phaser.Game(config);
game.scene.add('titleScene', titleScene);
game.scene.start('titleScene');
