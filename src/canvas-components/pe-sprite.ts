import { PENodeOptions, PENodeInterface, PENode } from './pe-node'

export interface PESpriteInterface extends PENodeInterface {
  texture: string
  image: HTMLImageElement
}

export interface PESpriteOptions extends PENodeOptions {
  texture: string
}

export class PESprite extends PENode implements PESpriteInterface {
  protected _image: HTMLImageElement = new Image()

  constructor(options: PESpriteOptions) {
    super(options)
    this._canRender = false
    this._image.onload = () => {
      this._canRender = true
    }
    this.texture = options.texture
  }

  set texture(texture: string) {
    this.canRender = false
    this._image.src = texture
  }

  get texture(): string {
    return this._image.src
  }

  set image(image: HTMLImageElement) {
    this._image = image
  }

  get image(): HTMLImageElement {
    return this._image
  }

  render(ctx: CanvasRenderingContext2D, _deltaTime: number) {
    ctx.drawImage(this._image, 0, 0, this._size.x, this._size.y)
  }
}
