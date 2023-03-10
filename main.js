const config = {
    type: Phaser.WEBGL,
    width: 2560,
    height: 1440,
    backgroundColor: '#212529', //#000021 is a more blue alternative + company colour, maybe use this if I get time to redo the walls' colour scheme
    pixelArt: true, // Definetly never delete this, Upscaling an image so much with pixel interpolation enabled costs resources and looks horrifying
    scene: {
        preload: preload,
        create: create,
        update: update,
        timer: timer,
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

let game = new Phaser.Game(config)
//let cursors;
let playerChar
let npcSprite
let scale = 5
let keys
let coinStore = []
let counterText
let x
let y
let map
let timeLeft

function preload () { // Preload is called before startup
    this.load.image('dialogue', 'assets/exported-images/dialogueBox0.png')
    this.load.image('plankTiles', 'assets/exported-images/plankTiles.png') //Load resources for the tilemap JSON (Definetly load before dbnF1.json)
    this.load.audio('coinCollect', 'assets/sfx/coinCollect.wav')
    this.load.audio('soundtrack', 'assets/sfx/base.wav')
    this.load.spritesheet('playerFrames', 'assets/exported-images/player.png', {frameWidth: 16, frameHeight: 16})
    this.load.spritesheet('npcFrames', 'assets/exported-images/npc0.png', {frameWidth: 16, frameHeight: 16})
    this.load.spritesheet('coinFrames', 'assets/exported-images/coin.png', {frameWidth: 16, frameHeight: 16})
    this.load.tilemapTiledJSON('map', 'assets/exported-tilemaps/dbnF1.json') //Load the tilemap
}

function create () { // Create is called on game startup
    // Variables
    keys = this.input.keyboard.addKeys('W, A, S, D, R')
    const counterCam = this.cameras.add(0, 0, 160, 180)
    const mainCam = this.cameras.main
    const timerCam = this.cameras.add(780, 0, 160, 90)
    timeLeft = 180
    
    this.anims.create({
      key: 'coinSpin',
      frames: this.anims.generateFrameNumbers('coinFrames', {
        start: 0,
        end: 12,
      }),
      frameRate: 12,
      repeat: -1,
    });
    // Create all visible stuff (Map, Player, etc)
    map = this.make.tilemap({ key: 'map' })
    const Planks = map.addTilesetImage('Planks', 'plankTiles')
    for (let i = 0; i < map.layers.length; i++) {
      const layer = map.createLayer(i, Planks, 0, 0).setScale(scale)
      layer.setDepth(i)
    }
    playerChar = this.add.sprite(0, 0, 'playerFrames').setScale(scale)
    playerChar.setDepth(2)
    mainCam.startFollow(playerChar, true)
    mainCam.setFollowOffset(-playerChar.width, -playerChar.height)
    npcSprite = this.add.sprite(0, 0, "npcFrames").setScale(scale)
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
    coinStore = [ //if you want to add your own coins, I added a snippet file (.vscode\phaserSnippets.code-snippets) with a snippet that adds "visible: true" when you type 'vb'
     //so it won't be as tedious to do
      {x: 3, y: 1, visible: true}, 
      {x: 6, y: 17, visible: true},
      {x: 2, y: 17, visible: true},
      {x: 9, y: 18, visible: true},
      {x: 11, y: 3, visible: true},
      {x: 13, y: 11, visible: true},
      {x: 14, y: 16, visible: true},
      {x: 16, y: 9, visible: true},
      {x: 17, y: 3, visible: true},
      {x: 19, y: 10, visible: true},
      {x: 23, y: 2, visible: true},
      {x: 24, y: 17, visible: true},
      {x: 28, y: 3, visible: true},
      {x: 28, y: 20, visible: true},
      {x: 29, y: 13, visible: true},
      {x: 35, y: 2, visible: true},
      {x: 41, y: 3, visible: true},
      {x: 41, y: 7, visible: true},
      {x: 42, y: 21, visible: true},
      {x: 42, y: 23, visible: true},
      {x: 43, y: 26, visible: true},
      {x: 45, y: 7, visible: true},
      {x: 45, y: 12, visible: true},
      {x: 50, y: 26, visible: true},
      {x: 51, y: 9, visible: true},
      {x: 53, y: 26, visible: true},
      {x: 54, y: 11, visible: true},
      {x: 59, y: 13, visible: true},
      {x: 60, y: 26, visible: true},
      {x: 63, y: 16, visible: true},
      {x: 65, y: 23, visible: true},
      {x: 69, y: 19, visible: true}
    ]
    console.log(map.getObjectLayer('coins')['objects'].length);
    let coinArrayPos = 0;
    x = coinStore[coinArrayPos].x
    y = coinStore[coinArrayPos].y
    for (let i = 0; i < map.getObjectLayer('coins')['objects'].length; i++) {
      coinArrayPos = i + 1
      x = coinStore[i].x
      y = coinStore[i].y
      let coinSpr = this.add.sprite(0, 0, 'coinFrames')
      coinSpr.anims.play('coinSpin', true)
      coinSpr.scale = scale
      gridEngineConfig.characters.push({
        id: `coin${x}#${y}`,
        sprite: coinSpr,
        startPosition: { x, y },
      })
    }
      this.data.set('coins', 0)
      counterText = this.add.text(0, 0, ['Coins collected: ', this.data.get('coins') + '/2',  'F11 recommended \n You only have 3 \n Minutes. \n Good Luck!'])
    mainCam.ignore(counterText, )
    timerCam.ignore (counterText)
    this.gridEngine.create(map, gridEngineConfig)
    this.gridEngine.follow('npc0', 'player', -1, true)
    let bgm = this.sound.play('soundtrack', {volume: 0.5, loop: true})
    
}

function update () { // Update is called once per frame, wonder if fixedUpdate is also a thing here
  if (keys.A.isDown) {
    this.gridEngine.move('player', 'left')
  } else if (keys.D.isDown) {
    this.gridEngine.move('player', 'right')
  } else if (keys.W.isDown) {
    this.gridEngine.move('player', 'up')
  } else if (keys.S.isDown) {
    this.gridEngine.move('player', 'down')
  }
  if (keys.R.isDown) {
    this.sound.removeAll()
    this.scene.restart()
  }
  let playerPos
    let npc0Pos
    playerPos = this.gridEngine.getPosition('player')
    npc0Pos = this.gridEngine.getPosition('npc0')
    let coin = coinStore.find((coin) => coin.visible && coin.x == playerPos.x && coin.y == playerPos.y) ?? null
    if (playerPos.x == npc0Pos.x && playerPos.y == npc0Pos.y) {
      this.sound.removeAll()
      this.scene.restart()
    }
    if (coin != null && playerPos.x == coin.x && playerPos.y == coin.y) {
      let coinTarget = this.gridEngine.getSprite(`coin${coin.x}#${coin.y}`)
      if (coinTarget.visible) {this.gridEngine.removeCharacter(`coin${coin.x}#${coin.y}`)
      coinTarget.visible = false
      this.data.values.coins += 1
      counterText.setText(['Coins collected: ', this.data.get('coins') + '/2', 'F11 recommended \n You only have 3 \n Minutes. \n Good Luck!'])
      if (this.data.values.coins == map.getObjectLayer('coins')['objects'].length) {
        this.sound.removeAll()
        this.scene.restart() }
      }
      coin.visible = false
      this.sound.play('coinCollect')
    }
  }
  
  function timer() {
    if (timeLeft >= 0) {
    timeLeft -= 1
  }
  if (timeLeft <= 0) {
    this.sound.removeAll()
    this.scene.restart() // Added this here aswell to simply enhance performance by reducing all the checks for variables done every frame.
  }
}

setInterval(function() { 
  timer()
}, 1000)