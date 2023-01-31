
class titleSceneClass extends Phaser.Scene {
    constructor() {
        super({key: 'titleScene'});
    }

    preload () {
        this.load.image('bg', 'assets/exported-images/backgroundCave.png'); // For further calculations relative to the game resolution: original image dimensions are 256x144 (10th of 2K)
        this.load.image('tiles', 'assets/exported-images/cPathTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
        this.load.tilemapTiledJSON('map', 'assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
    }

    create () {
        const map = this.make.tilemap({ key: 'map' });
        const Planks = map.addTilesetImage('Planks', 'tiles'); //                           As a String                                     Not a string (duh)
        const layers = map.createLayer('ground', Planks, 0, 0).setScale(5); //Layer Order is: '<What you called your layer in Tiled/The JSON>', <what you just defined as the TilesetImage (const Planks in line 18), 0, 0 (Coordinate Offset)

        //const overlay = this.add.image(0, 0, 'bg').setOrigin(0);
        //overlay.setScale(10); // If the resolution is set to 1920x1080px (FHD) then setScale(7.5), if set to 2560x1440 (2K QHD) then setScale(10)
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 2560,
    height: 1440,
    backgroundColor: '#000021',
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
    scene: {
        preload: titleSceneClass.preload,
        create: titleSceneClass.create,
        update: titleSceneClass.update
    }
};

let titleScene = new titleSceneClass();
let game = new Phaser.Game(config);
game.scene.add('titleScene', titleScene);
game.scene.start('titleScene');
