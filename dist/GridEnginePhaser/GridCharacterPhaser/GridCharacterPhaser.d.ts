import { GridTilemap } from "./../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { CharacterData, WalkingAnimationMapping } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharacterAnimation } from "../../GridCharacter/CharacterAnimation/CharacterAnimation";
import { Direction } from "../../Direction/Direction";
export declare class GridCharacterPhaser {
    private charData;
    private scene;
    private tilemap;
    private layerOverlay;
    private customOffset;
    private engineOffset;
    private sprite?;
    private layerOverlaySprite?;
    private container?;
    private newSpriteSet$;
    private destroy$;
    private gridCharacter;
    private walkingAnimationMapping?;
    private animation?;
    constructor(charData: CharacterData, scene: Phaser.Scene, tilemap: GridTilemap, layerOverlay: boolean);
    destroy(): void;
    getGridCharacter(): GridCharacter;
    setSprite(sprite?: Phaser.GameObjects.Sprite): void;
    getSprite(): Phaser.GameObjects.Sprite | undefined;
    getLayerOverlaySprite(): Phaser.GameObjects.Sprite | undefined;
    setContainer(container?: Phaser.GameObjects.Container): void;
    getContainer(): Phaser.GameObjects.Container | undefined;
    getEngineOffset(): Vector2;
    getOffsetX(): number;
    getOffsetY(): number;
    getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined;
    turnTowards(direction: Direction): void;
    getAnimation(): CharacterAnimation | undefined;
    setAnimation(animation: CharacterAnimation): void;
    update(delta: number): void;
    private updatePixelPos;
    private getGameObj;
    private createChar;
    private updateGridChar;
    private resetAnimation;
    private updateOverlaySprite;
    private updateDepth;
    private setDepth;
    private getPaddedPixelDepth;
    private getTransitionLayer;
}
