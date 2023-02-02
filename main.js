const config = {
    type: Phaser.WEBGL,
    width: 2560,
    height: 1440,
    backgroundColor: '#212529', //#000021 is a more blue alternative + company colour, maybe use this if I get time to redo the walls' colour scheme
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    plugins: {
        scene: [
          {
            key: "gridEngine",
            plugin: GridEngine,
            mapping: "gridEngine",
          },
        ],
      },
    physics: {
        default: 'arcade'
    }
}

//let cursors;
let playerChar;
let scale = 5;
let cursors;

function preload () { // Preload is called before startup
    this.load.image('bg', 'assets/exported-images/backgroundCave.png'); // For further calculations relative to the game resolution: original image dimensions are 256x144 (10th of 2K)
    this.load.image('plankTiles', 'assets/exported-images/plankTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
    this.load.spritesheet('playerFrames', 'assets/exported-images/player.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('npcFrames', 'assets/exported-images/npc0.png', {frameWidth: 16, frameHeight: 16});
    this.load.tilemapTiledJSON('map', 'assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
}

function create () { // Create is called on game startup
    // Variables

    cursors = this.input.keyboard.createCursorKeys();
    
    
    // Create all visible stuff (Map, Player, etc)
    const map = this.make.tilemap({ key: 'map' });
    const Planks = map.addTilesetImage('Planks', 'plankTiles');
    for (let i = 0; i < map.layers.length; i++) {
      const layer = map.createLayer(i, Planks, 0, 0).setScale(scale);
      layer.setDepth(i);
    }
    playerChar = this.add.sprite(0, 0, 'playerFrames').setScale(scale);
    playerChar.setDepth(2);
    this.cameras.main.startFollow(playerChar, true);
    this.cameras.main.setFollowOffset(-playerChar.width, -playerChar.height);
    const npcSprite = this.add.sprite(0, 0, "npcFrames").setScale(scale);
    //playerChar.setColliderWorldBounds(true);
    //const overlay = this.add.image(0, 0, 'bg').setOrigin(0); // Insert last to render above all
    //overlay.setScale(10); // If the resolution is set to 1920x1080px (FHD) then setScale(7.5), if set to 2560x1440 (2K QHD) then setScale(10)
    const gridEngineConfig = {
        characters: [
          {
            id: 'player',
            sprite: playerChar,
            startPosition: { x: 31, y: 18 },
            speed: 8,
          },
          {
            id: "npc0",
            sprite: npcSprite,
            startPosition: { x: 39, y: 7 },
          },
        ],
    }

    this.gridEngine.create(map, gridEngineConfig);
}

function update () { // Update is called once per frame, wonder if fixedUpdate is also a thing here
    //inputHandler();
    if (cursors.left.isDown) {
      this.gridEngine.move('player', 'left');
    } else if (cursors.right.isDown) {
      this.gridEngine.move('player', 'right');
    } else if (cursors.up.isDown) {
      this.gridEngine.move('player', 'up');
    } else if (cursors.down.isDown) {
      this.gridEngine.move('player', 'down');
    }
}



let game = new Phaser.Game(config);

