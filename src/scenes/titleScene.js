class titleScene extends Phaser.Scene {
    constructor() {
        super({key: titleScene});
    }

    preload() {
        this.load.image('bg', 'assets/images/exported-images/backgroundCave.png');
    }

    create () {
        let background = this.add.image(0, 0, 'bg').setOrigin(0);
    }
}

export default titleScene;
