import { PEKeyboardHandler } from './pe-keyboard-handler'
import {
  PECharacterSpriteOptions,
  PECharacterSprite,
  PECharacterSpriteStepKeyEnum
} from './pe-character-sprite'

export class PEPlayerCharacterSprite extends PECharacterSprite {
  protected characterController: PEKeyboardHandler
  protected _isWalkingAutonomously: boolean = false

  constructor(options: PECharacterSpriteOptions) {
    super(options)
    this.characterController = new PEKeyboardHandler()
    this.characterController.registerKeyControl('ArrowLeft')
    this.characterController.registerKeyControl('ArrowRight')
    this.characterController.registerKeyControl('ArrowUp')
    this.characterController.registerKeyControl('ArrowDown')
  }

  set isWalkingAutonomously(isWalkingAutonomously: boolean) {
    this._isWalkingAutonomously = isWalkingAutonomously
  }

  get isWalkingAutonomously() {
    return this._isWalkingAutonomously
  }

  update(deltaTime: number) {
    if (!this.isWalkingAutonomously) {
      const isZeroVelocity = this.velocity.x == 0 && this.velocity.y == 0
      if (
        this.characterController.isKeyDown('ArrowLeft') &&
        (isZeroVelocity ||
          (this.steps.length > 0 &&
            this.currentStep.key == PECharacterSpriteStepKeyEnum.WALK_RIGHT))
      ) {
        this.steps = [{ key: PECharacterSpriteStepKeyEnum.WALK_LEFT }]
      }
      if (
        this.characterController.isKeyDown('ArrowRight') &&
        (isZeroVelocity ||
          (this.steps.length > 0 &&
            this.currentStep.key == PECharacterSpriteStepKeyEnum.WALK_LEFT))
      ) {
        this.steps = [{ key: PECharacterSpriteStepKeyEnum.WALK_RIGHT }]
      }
      if (
        this.characterController.isKeyDown('ArrowUp') &&
        (isZeroVelocity ||
          (this.steps.length > 0 &&
            this.currentStep.key == PECharacterSpriteStepKeyEnum.WALK_DOWN))
      ) {
        this.steps = [{ key: PECharacterSpriteStepKeyEnum.WALK_UP }]
      }
      if (
        this.characterController.isKeyDown('ArrowDown') &&
        (isZeroVelocity ||
          (this.steps.length > 0 &&
            this.currentStep.key == PECharacterSpriteStepKeyEnum.WALK_UP))
      ) {
        this.steps = [{ key: PECharacterSpriteStepKeyEnum.WALK_DOWN }]
      }
    }
    super.update(deltaTime)
  }
}
