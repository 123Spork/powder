import {
  PEAnimatedSpriteInterface,
  PEAnimatedSpriteOptions,
  PEAnimatedSprite
} from './pe-animated-sprite'



export enum PECharacterSpriteStepKeyEnum {
    STAND_STILL = 0,
    WALK_UP = 1,
    WALK_DOWN = 2,
    WALK_LEFT = 3,
    WALK_RIGHT = 4
  }
  
export interface PECharacterSpriteStep {
  key: PECharacterSpriteStepKeyEnum
  value?: any
}

export interface PECharacterSpriteInterface extends PEAnimatedSpriteInterface {
  queueStep: (pathSep: PECharacterSpriteStep) => void
}

export interface PECharacterSpriteOptions extends PEAnimatedSpriteOptions {
  walkSpeed: number
  isLoopingPath?: boolean
}

export class PECharacterSprite extends PEAnimatedSprite
  implements PECharacterSpriteInterface {
  protected _walkSpeed: number
  protected _isLoopingPath: boolean
  protected steps: PECharacterSpriteStep[] = []
  protected currentStepHandled: boolean = true

  constructor(options: PECharacterSpriteOptions) {
    super(options)
    this._walkSpeed = options.walkSpeed
    this._isLoopingPath = options.isLoopingPath || false
  }

  set walkSpeed(speed: number) {
    this._walkSpeed = speed
  }

  get walkSpeed() {
    return this._walkSpeed
  }

  get isLoopingPath() {
    return this._isLoopingPath
  }

  set isLoopingPath(isLoopingPath: boolean) {
    this._isLoopingPath = isLoopingPath
  }

  get currentStep() {
    return this.steps[0]
  }

  private spoolNextStep() {
    this.currentStepHandled = true
    if (this.isLoopingPath) {
      this.steps.push(this.steps.splice(0, 1)[0])
    } else {
      this.steps.splice(0, 1)
    }
  }

  public queueStep(step: PECharacterSpriteStep) {
    this.steps = this.steps.concat(this.generatePathQueueElement(step))
  }

  private generatePathQueueElement(
    pathStep: PECharacterSpriteStep
  ): PECharacterSpriteStep[] {
    switch (pathStep.key) {
      case PECharacterSpriteStepKeyEnum.STAND_STILL:
        return [
          {
            key: PECharacterSpriteStepKeyEnum.STAND_STILL,
            value: typeof pathStep.value !== 'undefined' ? pathStep.value : 1000
          }
        ]
      case PECharacterSpriteStepKeyEnum.WALK_LEFT:
        return new Array(
          typeof pathStep.value !== 'undefined' ? pathStep.value : 1
        ).fill({
          key: PECharacterSpriteStepKeyEnum.WALK_LEFT,
          value: {
            x: -1 * this.walkSpeed,
            y: 0
          }
        })
      case PECharacterSpriteStepKeyEnum.WALK_RIGHT:
        return new Array(
          typeof pathStep.value !== 'undefined' ? pathStep.value : 1
        ).fill({
          key: PECharacterSpriteStepKeyEnum.WALK_RIGHT,
          value: {
            x: 1 * this.walkSpeed,
            y: 0
          }
        })
      case PECharacterSpriteStepKeyEnum.WALK_UP:
        return new Array(
          typeof pathStep.value !== 'undefined' ? pathStep.value : 1
        ).fill({
          key: PECharacterSpriteStepKeyEnum.WALK_UP,
          value: {
            x: 0,
            y: -1 * this.walkSpeed
          }
        })
      case PECharacterSpriteStepKeyEnum.WALK_DOWN:
        return new Array(
          typeof pathStep.value !== 'undefined' ? pathStep.value : 1
        ).fill({
          key: PECharacterSpriteStepKeyEnum.WALK_DOWN,
          value: {
            x: 0,
            y: 1 * this.walkSpeed
          }
        })
    }
  }

  update(_deltaTime: number) {
    if (this.steps.length < 1) {
      return
    }

    switch (this.currentStep.key) {
      case PECharacterSpriteStepKeyEnum.WALK_LEFT:
      case PECharacterSpriteStepKeyEnum.WALK_RIGHT:
        if (Math.floor(this.position.x % 32) == 0) {
          if (this.velocity.x !== 0) {
            this.spoolNextStep()
            this.velocity.x = 0
          }
        }
        break
      case PECharacterSpriteStepKeyEnum.WALK_UP:
      case PECharacterSpriteStepKeyEnum.WALK_DOWN:
        if (Math.floor(this.position.y % 32) == 0) {
          if (this.velocity.y !== 0) {
            this.spoolNextStep()
            this.velocity.y = 0
          }
        }
        break
    }

    if (this.currentStepHandled == false) {
      return
    }
    this.currentStepHandled = false

    switch (this.currentStep.key) {
      case PECharacterSpriteStepKeyEnum.STAND_STILL:
        window.setTimeout(
          (() => {
            this.spoolNextStep()
          }).bind(this),
          this.currentStep.value
        )
        break
      case PECharacterSpriteStepKeyEnum.WALK_LEFT:
      case PECharacterSpriteStepKeyEnum.WALK_RIGHT:
      case PECharacterSpriteStepKeyEnum.WALK_UP:
      case PECharacterSpriteStepKeyEnum.WALK_DOWN:
        this.velocity = {
          x: this.currentStep.value.x,
          y: this.currentStep.value.y
        }
        break
    }
  }

  render(ctx: CanvasRenderingContext2D, deltaTime: number) {
    super.render(ctx, deltaTime)
    if (this.steps.length < 1) {
      this.runAnimation([], 100)
      return
    }
    this.runAnimation([], 100)
  }
}
