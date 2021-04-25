import {
  PEAnimatedSpriteInterface,
  PEAnimatedSpriteOptions,
  PEAnimatedSprite
} from './pe-animated-sprite'

export interface PECharacterSpriteInterface extends PEAnimatedSpriteInterface {
  queueWalkRight: (cells: number) => void
  queueWalkLeft: (cells: number) => void
  queueWalkUp: (cells: number) => void
  queueWalkDown: (cells: number) => void
  queueWalkPause: (delayMs: number) => void
}

export interface PECharacterSpriteOptions extends PEAnimatedSpriteOptions {
  walkSpeed: number
  isLoopingPath?: boolean
}

export enum PECharacterSpriteDirectionEnum {
  STAND = 0,
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4
}

export class PECharacterSprite extends PEAnimatedSprite
  implements PECharacterSpriteInterface {
  protected _walkSpeed: number
  protected _isLoopingPath: boolean
  protected toWalkCells: {
    key: number
    value?: number
    isHandled?: boolean
  }[] = []

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

  update(_deltaTime: number) {
    if (Math.floor(this.position.x % 32) == 0) {
      if (this.velocity.x !== 0) {
        if (this.isLoopingPath) {
          this.toWalkCells.push(this.toWalkCells.splice(0, 1)[0])
        } else {
          this.toWalkCells.splice(0, 1)
        }
        this.velocity.x = 0
      }
    }

    if (Math.floor(this.position.y % 32) == 0) {
      if (this.velocity.y !== 0) {
        if (this.isLoopingPath) {
          this.toWalkCells.push(this.toWalkCells.splice(0, 1)[0])
        } else {
          this.toWalkCells.splice(0, 1)
        }
        this.velocity.y = 0
      }
    }

    if (this.toWalkCells.length < 1) {
      return
    }

    if (this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.STAND) {
      if (!this.toWalkCells[0].isHandled) {
        this.toWalkCells[0].isHandled = true
        const self = this
        window.setTimeout(() => {
          self.toWalkCells[0].isHandled = false
          if (self.isLoopingPath) {
            self.toWalkCells.push(self.toWalkCells.splice(0, 1)[0])
          } else {
            self.toWalkCells.splice(0, 1)
          }
        }, this.toWalkCells[0].value)
      }
      return
    }

    if (
      this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.LEFT ||
      this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.RIGHT
    ) {
      this.velocity = {
        x:
          this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.LEFT
            ? -1 * this.walkSpeed
            : this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.RIGHT
            ? 1 * this.walkSpeed
            : this.velocity.x,
        y: 0
      }
    }

    if (
      this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.UP ||
      this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.DOWN
    ) {
      this.velocity = {
        x: 0,
        y:
          this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.UP
            ? -1 * this.walkSpeed
            : this.toWalkCells[0].key == PECharacterSpriteDirectionEnum.DOWN
            ? 1 * this.walkSpeed
            : this.velocity.y
      }
    }
  }

  get isLoopingPath() {
    return this._isLoopingPath
  }

  set isLoopingPath(isLoopingPath: boolean) {
    this._isLoopingPath = isLoopingPath
  }

  public queueWalkRight(cells: number) {
    this.toWalkCells = this.toWalkCells.concat(
      new Array(cells).fill({ key: PECharacterSpriteDirectionEnum.RIGHT })
    )
  }

  public queueWalkLeft(cells: number) {
    this.toWalkCells = this.toWalkCells.concat(
      new Array(cells).fill({ key: PECharacterSpriteDirectionEnum.LEFT })
    )
  }

  public queueWalkUp(cells: number) {
    this.toWalkCells = this.toWalkCells.concat(
      new Array(cells).fill({ key: PECharacterSpriteDirectionEnum.UP })
    )
  }

  public queueWalkDown(cells: number) {
    this.toWalkCells = this.toWalkCells.concat(
      new Array(cells).fill({ key: PECharacterSpriteDirectionEnum.DOWN })
    )
  }

  public queueWalkPause(delayMs: number) {
    this.toWalkCells = this.toWalkCells.concat([
      {
        key: PECharacterSpriteDirectionEnum.STAND,
        value: delayMs,
        isHandled: false
      }
    ])
  }
}
