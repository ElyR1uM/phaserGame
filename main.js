const config = {
    type: Phaser.WEBGL,
    width: 2560,
    height: 1440,
    backgroundColor: '#000021',
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade'
    }
};

let cursors;
let playerChar;
let scale = 5;

function preload () { // Preload is called before startup
    this.load.image('bg', 'assets/exported-images/backgroundCave.png'); // For further calculations relative to the game resolution: original image dimensions are 256x144 (10th of 2K)
    this.load.image('plankTiles', 'assets/exported-images/plankTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
    this.load.spritesheet('playerFrames', 'assets/exported-images/player.png', {frameWidth: 16, frameHeight: 16});
    this.load.tilemapTiledJSON('map', 'assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
}

function create () { // Create is called on game startup
    // Variables
    cursors = this.input.keyboard.createCursorKeys();
    
    
    // Create all visible stuff (Map, Player, etc)
    const map = this.make.tilemap({ key: 'map' });
    //const Player = map.addTilesetImage('Player', 'playerFrames');
    //let playerLayer = map.createLayer('player', Player, 0, 0).setScale(scale); // unsure what value to put if the game is rendering in FHD -> To do: Calculate World size for FHD mode
    const Planks = map.addTilesetImage('Planks', 'plankTiles'); //                          VV As a String VV                                                       VV Not a string (duh) VV
    const groundLayer = map.createLayer('ground', Planks, 0, 0).setScale(scale); //createLayer Order is: '<What you called your layer in Tiled/The JSON>', <wh at you just defined as the TilesetImage (const Planks in line 18), 0, 0 (Coordinate Offset)
    playerChar = this.physics.add.sprite(104 * scale, 72 * scale, 'playerFrames')/*.setOrigin(0)*/.setScale(scale); // How to translate the 16x16 grid of the tilemap into the WQHD Canvas of the game: (N - .5, -1 if you have setOrigin to 0) Tiles times the scale var.
    playerChar.setCollideWorldBounds(true);
    //const overlay = this.add.image(0, 0, 'bg').setOrigin(0); // Insert last to render above all
    //overlay.setScale(10); // If the resolution is set to 1920x1080px (FHD) then setScale(7.5), if set to 2560x1440 (2K QHD) then setScale(10)
}

function inputHandler () {
    if (cursors.left.isDown) {
        playerChar.setVelocityX(-200);
    } 
    if (cursors.right.isDown) {
        playerChar.setVelocityX(200);
    }
    if (!cursors.left.isDown && !cursors.right.isDown || cursors.left.isDown && cursors.right.isDown) {
        playerChar.setVelocityX(0);
    }
    if (cursors.up.isDown) {
        playerChar.setVelocityY(-200);
    }
    if (cursors.down.isDown) {
        playerChar.setVelocityY(200);
    }
    if (!cursors.up.isDown && !cursors.down.isDown || cursors.up.isDown && cursors.down.isDown) {
        playerChar.setVelocityY(0);
    }
}

function update () { // Update is called once per frame, wonder if fixedUpdate is also a thing here
    inputHandler();
}



let game = new Phaser.Game(config);

