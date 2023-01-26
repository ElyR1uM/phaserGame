const { Phaser } = require("./dist/phaser");

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('cPathTiles', 'assets/exported-images/cPathTiles.png');
    this.load.image('UI', 'assets/exported-images/backgroundCave.png');
}

function create ()
{
    this.add.image(0, 0,'UI').setOrigin(0, 0);
    const map = this.make.tilemap({ data:Array, tileWidth: 16, tileHeight: 16});
}

function update ()
{
}
