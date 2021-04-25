import { PESpriteInterface, PESpriteOptions, PESprite } from './pe-sprite'
import { Vector2D } from './types'

export interface PEAnimatedSpriteInterface extends PESpriteInterface {
  frameOffset: Vector2D
  textureSize: Vector2D
  delayFrameOffset: (frameOffset: Vector2D, delayMs: number) => void
}

export interface PEAnimatedSpriteOptions extends PESpriteOptions {
  textureSize: Vector2D
  frameOffset?: Vector2D
}

export class PEAnimatedSprite extends PESprite
  implements PEAnimatedSpriteInterface {
  protected _textureSize: Vector2D
  protected _frameOffset: Vector2D

  constructor(options: PEAnimatedSpriteOptions) {
    super(options)
    this._textureSize = options.textureSize
    this._frameOffset = options.frameOffset || { x: 0, y: 0 }
  }

  set frameOffset(frameOffset: Vector2D) {
    this._frameOffset = frameOffset
  }

  get frameOffset():Vector2D {
    return this._frameOffset
  }

  set textureSize(textureSize: Vector2D){
    this._textureSize = textureSize
  }

  get textureSize():Vector2D{
    return this._textureSize
  }

  delayFrameOffset(frameOffset: Vector2D, delayMs: number): void {
    const self = this
    setTimeout(() => {
      self.frameOffset = frameOffset
    }, delayMs)
  }

  render(ctx: CanvasRenderingContext2D, _deltaTime: number) {
    ctx.drawImage(
      this._image,
      this._frameOffset.x * this._textureSize.x,
      this._frameOffset.y * this._textureSize.y,
      this._textureSize.x,
      this._textureSize.y,
      0,
      0,
      this._size.x,
      this._size.y
    )
  }
}
