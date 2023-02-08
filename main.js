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
let npcSprite;
let coinSpr;
let scale = 5;
let keys;
const coinStore = [
  {x: 29, y: 13, visible: true}, // array 0, length 1
  {x: 19, y: 13, visible: true} // array 1, length 2
]
let coinCounter;
let x;
let y;
let map;

function preload () { // Preload is called before startup
    this.load.image('bg', 'assets/exported-images/backgroundCave.png'); // For further calculations relative to the game resolution: original image dimensions are 256x144 (10th of 2K)
    this.load.image('dialogue', 'assets/exported-images/dialogueBox0.png')
    this.load.image('plankTiles', 'assets/exported-images/plankTiles.png'); //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
    this.load.spritesheet('playerFrames', 'assets/exported-images/player.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('npcFrames', 'assets/exported-images/npc0.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('coinFrames', 'assets/exported-images/coin.png', {frameWidth: 16, frameHeight: 16});
    this.load.tilemapTiledJSON('map', 'assets/exported-tilemaps/dbnF1.json'); //Load the tilemap
}

function create () { // Create is called on game startup
    // Variables

    keys = this.input.keyboard.addKeys('W, A, S, D, E, R');
    
    
    // Create all visible stuff (Map, Player, etc)
    map = this.make.tilemap({ key: 'map' });
    const Planks = map.addTilesetImage('Planks', 'plankTiles');
    for (let i = 0; i < map.layers.length; i++) {
      const layer = map.createLayer(i, Planks, 0, 0).setScale(scale);
      layer.setDepth(i);
    }
    playerChar = this.add.sprite(0, 0, 'playerFrames').setScale(scale);
    playerChar.setDepth(2);
    this.cameras.main.startFollow(playerChar, true);
    this.cameras.main.setFollowOffset(-playerChar.width, -playerChar.height);
    npcSprite = this.add.sprite(0, 0, "npcFrames").setScale(scale);
    //playerChar.setColliderWorldBounds(true);
    const entities = {
      player: {x: 31, y: 18},
      npc0: {x: 39, y: 7 }
    }
    const gridEngineConfig = {
      characters: [
          {
            id: 'player',
            sprite: playerChar,
            startPosition: {x: entities.player.x, y: entities.player.y},
            speed: 8,
            collides:{
              collisionGroups: ['cg1'],
            }
          },
          {
            id: 'npc0',
            sprite: npcSprite,
            startPosition: { x: entities.npc0.x, y: entities.npc0.y },
            speed: 6,
            collides: {
              collisionGroups: ['cg2']
            },
          },
        ],
    }
    let coinArrayPos = 0;
    x = coinStore[coinArrayPos].x;
    y = coinStore[coinArrayPos].y;
    console.log(map.getObjectLayer('coins')['objects'])
    for (let i = 0; i < map.getObjectLayer('coins')['objects'].length; i++) {
      console.log("current iteration: ", i);
      
      console.log("coinArrayPos: ", coinArrayPos);
      coinArrayPos = i + 1;
      console.log("coinArrayPos: ", coinArrayPos);
      x = coinStore[i].x;
      y = coinStore[i].y;
      coinSpr = this.add.sprite(0, 0, 'coinFrames');
      coinSpr.scale = scale;
      gridEngineConfig.characters.push({
        id: `coin${x}#${y}`,
        sprite: coinSpr,
        startPosition: { x, y },
      })
    }
      coinCounter = 0;
    
    console.log(gridEngineConfig)
    this.gridEngine.create(map, gridEngineConfig);
    
}

function update () { // Update is called once per frame, wonder if fixedUpdate is also a thing here
    if (keys.A.isDown) {
      this.gridEngine.move('player', 'left');
    } else if (keys.D.isDown) {
      this.gridEngine.move('player', 'right');
    } else if (keys.W.isDown) {
      this.gridEngine.move('player', 'up');
    } else if (keys.S.isDown) {
      this.gridEngine.move('player', 'down');
    }
    if (keys.E.isDown) {
        this.gridEngine.follow('npc0', 'player', -1, true);
    }
    if (keys.R.isDown) {
      this.scene.restart();
    }
    let playerPos;
    let npc0Pos;
    let coin = coinStore.find((coin) => coin.visible) ?? null
    npc0Pos = this.gridEngine.getPosition('npc0');
    playerPos = this.gridEngine.getPosition('player');
    if (playerPos.x == npc0Pos.x && playerPos.y == npc0Pos.y) {this.scene.restart();}
    if (coin != null && playerPos.x == coin.x && playerPos.y == coin.y) {
      let coinTarget = this.gridEngine.getSprite(`coin${coin.x}#${coin.y}`)
      console.log('coinTarget', coinTarget)
      if (coinTarget.visible) {this.gridEngine.removeCharacter(`coin${coin.x}#${coin.y}`)
      // coinSpr.visible = false;
      coinTarget.visible = false;
      coinCounter = coinCounter + 1;
      console.log('Collected!', coinCounter);
    }
    console.log('coin ', coinStore)
    coin.visible = false;
    console.log(this.gridEngine)
    }
}

let game = new Phaser.Game(config);
