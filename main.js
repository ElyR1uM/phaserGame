let config = {
    type: Phaser.WEBGL,
    backgroundColor: '#2dab2d',
    width: 2560,
    height: 1440,
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
};

class titleSceneClass extends Phaser.Scene {
    constructor() {
        super({key: 'titleScene'});
    }

    preload() {
        this.load.image('bg', './assets/exported-images/backgroundCave.png'); // For further calculations relative to the game resolution: original image dimensions are 256x144 (10th of 2K)
        this.load.image('tilemap', './assets/exported-images/cPathTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
        this.load.tilemapTiledJSON('floor-one', './assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
    }

    create () {
        let background = this.add.image(0, 0, 'bg').setOrigin(0);
        background.setScale(10); // If the resolution is set to 1920x1080px (FHD) then setScale(7.5), if set to 2560x1440 (2K QHD) then setScale(10)
    }
}
let titleScene = new titleSceneClass();
let game = new Phaser.Game(config);
game.scene.add('titleScene', titleScene);
game.scene.start('titleScene');
