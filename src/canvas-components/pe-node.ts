import { Vector2D } from './types'
import { PEAppInterface } from './pe-app'

export interface PENodeInterface {
  ctx: CanvasRenderingContext2D | null
  scale: Vector2D
  color: string
  canUpdate: boolean
  canRender: boolean
  parent: PENodeInterface | PEAppInterface | null
  updateFrame: (deltaTime: number) => void
  update: (deltaTime: number) => void
  renderFrame: (deltaTime: number) => void
  render: (ctx: CanvasRenderingContext2D, deltaTime: number) => void
  onResizeCanvas: (dimensions: Vector2D) => void
  onResize: (dimensions: Vector2D) => void
  addChild: (child: PENodeInterface) => void
}

export interface PENodeOptions {
  position?: Vector2D
  velocity?: Vector2D
  scale?: Vector2D
  size?: Vector2D
  color?: string
  canRender?: boolean
  canUpdate?: boolean
}

export class PENode implements PENodeInterface {
  protected _ctx: CanvasRenderingContext2D | null = null
  protected _velocity: Vector2D = { x: 0, y: 0 }
  protected _position: Vector2D = { x: 0, y: 0 }
  protected _size: Vector2D = { x: 100, y: 100 }
  protected _scale: Vector2D = { x: 1, y: 1 }
  protected _color: string = '#FFFFFF'
  protected _children: PENodeInterface[] = []
  protected _parent: PENodeInterface | PEAppInterface | null = null
  protected _isRoot: boolean = false
  protected _canRender: boolean = true
  protected _canUpdate: boolean = true

  public constructor(options?: PENodeOptions) {
    this._position = options?.position ? options.position : this.position
    this._velocity = options?.velocity ? options.velocity : this.velocity
    this._scale = options?.scale ? options.scale : this.scale
    this._size = options?.size ? options.size : this.size
    this._color = options?.color ? options.color : this.color
    this._canRender = options?.canRender == false ? false : true
    this._canUpdate = options?.canUpdate == false ? false : true
  }

  get children(): PENodeInterface[] {
    return this._children
  }

  set ctx(ctx: CanvasRenderingContext2D | null) {
    this._ctx = ctx
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].ctx = this._ctx
    }
  }

  get ctx(): CanvasRenderingContext2D | null {
    return this._ctx
  }

  onResize(dimensions: Vector2D): void {}

  onResizeCanvas(dimensions: Vector2D) {
    this.onResize(dimensions)
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].onResizeCanvas(dimensions)
      this._children[i].onResizeCanvas(dimensions)
    }
  }

  addChild(child: PENodeInterface) {
    this._children.push(child)
    child.ctx = this._ctx
    child.parent = this
  }

  set canRender(canRender: boolean) {
    this._canRender = canRender
  }

  set canUpdate(canUpdate: boolean) {
    this._canUpdate = canUpdate
  }

  set parent(parent: PENodeInterface | PEAppInterface | null) {
    this._parent = parent
    let checkParentIsRoot = (
      p: PENodeInterface | PEAppInterface | null
    ): p is PEAppInterface => {
      return parent == null
        ? false
        : (parent as PEAppInterface).getCanvas !== undefined
    }
    if (checkParentIsRoot(parent)) {
      this._isRoot = true
    }
  }

  get parent(): PENodeInterface | PEAppInterface | null {
    return this._parent
  }

  set velocity(velocity: Vector2D) {
    this._velocity = velocity
  }

  get velocity(): Vector2D {
    return this._velocity
  }

  set color(color: string) {
    this._color = color
  }

  get color() {
    return this._color
  }

  set position(position: Vector2D) {
    this._position = position
  }

  get position() {
    return this._position
  }

  set size(size: Vector2D) {
    this._size = size
  }

  get size() {
    return this._size
  }

  set scale(scale: Vector2D) {
    this._scale = scale
  }

  get scale() {
    return this._scale
  }

  updateFrame(deltaTime: number) {
    if (!this._ctx) {
      return
    }
    let moveSpeed: Vector2D = {
      x: this._velocity.x * deltaTime,
      y: this._velocity.y * deltaTime
    }
    this._position.x = Math.round(this._position.x + moveSpeed.x)
    this._position.y = Math.round(this._position.y + moveSpeed.y)
    this.update(deltaTime)
  }

  renderFrame(deltaTime: number) {
    if (!this._ctx || !this._canRender) {
      return
    }
    this._ctx.beginPath()
    this._ctx.imageSmoothingEnabled = true
    this._ctx.scale(this._scale.x, this._scale.y)
    this._ctx.translate(this._position.x, this._position.y)
    this._ctx.fillStyle = this._color
    this._ctx.fillRect(0, 0, this._size.x, this._size.y)
    this.render(this._ctx, deltaTime)
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].updateFrame(deltaTime)
      this._children[i].renderFrame(deltaTime)
    }
    this._ctx.translate(-this._position.x, -this._position.y)
    this._ctx.closePath()
  }

  render(_ctx: CanvasRenderingContext2D, _deltaTime: number) {}
  update(_deltaTime: number) {}
}
