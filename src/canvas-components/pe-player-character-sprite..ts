import { PEKeyboardHandler } from './pe-keyboard-handler'
import {
  PECharacterSpriteOptions,
  PECharacterSprite,
  PECharacterSpriteDirectionEnum
} from './pe-character-sprite'

export class PEPlayerCharacterSprite extends PECharacterSprite {
  protected characterController: PEKeyboardHandler
  protected _isWalkingAutonymously: boolean = false

  constructor(options: PECharacterSpriteOptions) {
    super(options)
    this.characterController = new PEKeyboardHandler()
    this.characterController.registerKeyControl('ArrowLeft')
    this.characterController.registerKeyControl('ArrowRight')
    this.characterController.registerKeyControl('ArrowUp')
    this.characterController.registerKeyControl('ArrowDown')
  }

  set isWalkingAutonymously(isAutonymous: boolean) {
    this._isWalkingAutonymously = isAutonymous
  }

  get isWalkingAutonymously() {
    return this._isWalkingAutonymously
  }

  update(deltaTime: number) {
    if (!this.isWalkingAutonymously) {
      const isZeroVelocity = this.velocity.x == 0 && this.velocity.y == 0
      if (
        this.characterController.isKeyDown('ArrowLeft') &&
        (isZeroVelocity ||
          (this.toWalkCells.length > 0 &&
            this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.RIGHT))
      ) {
        this.toWalkCells = [{ key: PECharacterSpriteDirectionEnum.LEFT }]
      }
      if (
        this.characterController.isKeyDown('ArrowRight') &&
        (isZeroVelocity ||
          (this.toWalkCells.length > 0 &&
            this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.LEFT))
      ) {
        this.toWalkCells = [{ key: PECharacterSpriteDirectionEnum.RIGHT }]
      }
      if (
        this.characterController.isKeyDown('ArrowUp') &&
        (isZeroVelocity ||
          (this.toWalkCells.length > 0 &&
            this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.DOWN))
      ) {
        this.toWalkCells = [{ key: PECharacterSpriteDirectionEnum.UP }]
      }
      if (
        this.characterController.isKeyDown('ArrowDown') &&
        (isZeroVelocity ||
          (this.toWalkCells.length > 0 &&
            this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.UP))
      ) {
        this.toWalkCells = [{ key: PECharacterSpriteDirectionEnum.DOWN }]
      }
    }
    super.update(deltaTime)
  }
}
