
class titleSceneClass extends Phaser.Scene {
    constructor() {
        super({key: 'titleScene'});
    }

    preload () { // Preload is called before startup
        this.load.image('bg', 'assets/exported-images/backgroundCave.png'); // For further calculations relative to the game resolution: original image dimensions are 256x144 (10th of 2K)
        this.load.image('plankTiles', 'assets/exported-images/plankTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
        this.load.spritesheet('playerFrames', 'assets/exported-images/player.png', {frameWidth: 16, frameHeight: 16});
        this.load.tilemapTiledJSON('map', 'assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
    }

    create () { // Create is called on game startup
        const map = this.make.tilemap({ key: 'map' });
        //const Player = map.addTilesetImage('Player', 'playerFrames')
        const Planks = map.addTilesetImage('Planks', 'plankTiles'); //                          VV As a String VV                                                       VV Not a string (duh) VV
        const groundLayer = map.createLayer('ground', Planks, 0, 0).setScale(5); //createLayer Order is: '<What you called your layer in Tiled/The JSON>', <wh at you just defined as the TilesetImage (const Planks in line 18), 0, 0 (Coordinate Offset)
        const playerLayer = map.createLayer('player', Player, 0, 0).setScale(5); // unsure what value to put if the game is rendering in FHD -> To do: Calculate World size for FHD mode
        let playerChar = new(Gameobject.Sprite);

        const overlay = this.add.image(0, 0, 'bg').setOrigin(0); // Insert last to render above all
        overlay.setScale(10); // If the resolution is set to 1920x1080px (FHD) then setScale(7.5), if set to 2560x1440 (2K QHD) then setScale(10)

    }

    update () { // Update is called once per frame, wonder if fixedUpdate is also a thing here

    }
}

const config = {
    type: Phaser.WEBGL,
    width: 2560,
    height: 1440,
    backgroundColor: '#000021',
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
    scene: {
        preload: titleSceneClass.preload,
        create: titleSceneClass.create,
        update: titleSceneClass.update
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
};

let titleScene = new titleSceneClass();
let game = new Phaser.Game(config);
game.scene.add('titleScene', titleScene);
game.scene.start('titleScene');
