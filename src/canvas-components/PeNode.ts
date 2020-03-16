import { Vector2D } from './types'
import { PEAppInterface } from './PEApp'

export interface PENodeInterface {
  init: () => void
  updateFrame: (deltaTime: number) => void
  renderFrame: (deltaTime: number) => void
  onResizeCanvas: (dimensions:Vector2D) => void
  onResize: (dimensions:Vector2D) => void
  update: (deltaTime: number) => void
  render: (ctx: CanvasRenderingContext2D, deltaTime: number) => void
  setCtx: (ctx: CanvasRenderingContext2D | null) => void
  setVelocity: (velocity: Vector2D) => void
  getPosition: () => Vector2D
  setPosition: (position: Vector2D) => void
  getSize: () => Vector2D
  setSize: (position: Vector2D) => void
  getScale: () => Vector2D
  setScale: (scale: Vector2D) => void
  getColor: () => string
  setColor: (color: string) => void
  addChild: (child: PENodeInterface) => void
  setParent: (parent: PENodeInterface | PEAppInterface) => void
}

export interface PENodeOptions {
  position?: Vector2D
  velocity?: Vector2D
  scale?: Vector2D
  size?: Vector2D
  color?: string
}

export class PENode implements PENodeInterface {
  protected ctx: CanvasRenderingContext2D | null = null
  protected velocity: Vector2D = { x: 0, y: 0 }
  protected position: Vector2D = { x: 0, y: 0 }
  protected size: Vector2D = { x: 100, y: 100 }
  protected scale: Vector2D = { x: 1, y: 1 }
  protected color: string = '#FFFFFF'
  protected children: PENodeInterface[] = []
  protected parent: PENodeInterface | PEAppInterface | null = null
  protected isRoot: boolean = false

  public constructor(options?: PENodeOptions) {
    this.position =
      options && options.position ? options.position : this.position
    this.velocity =
      options && options.velocity ? options.velocity : this.velocity
    this.scale = options && options.scale ? options.scale : this.scale
    this.size = options && options.size ? options.size : this.size
    this.color = options && options.color ? options.color : this.color
    this.init()
  }

  init(): void {}

  setCtx(ctx: CanvasRenderingContext2D | null): void {
    this.ctx = ctx
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].setCtx(this.ctx)
    }
  }

  onResize(dimensions:Vector2D): void {}

  onResizeCanvas(dimensions:Vector2D) {
    this.onResize(dimensions)
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].onResizeCanvas(dimensions)
      this.children[i].onResizeCanvas(dimensions)
    }
  }

  addChild(child: PENodeInterface) {
    this.children.push(child)
    child.setCtx(this.ctx)
    child.setParent(this)
  }

  setParent(parent: PENodeInterface | PEAppInterface) {
    this.parent = parent
    let checkParentIsRoot = (
      p: PENodeInterface | PEAppInterface
    ): p is PEAppInterface => {
      return (parent as PEAppInterface).getCanvas !== undefined
    }
    if (checkParentIsRoot(parent)) {
      this.isRoot = true
    }
  }

  setVelocity(velocity: Vector2D) {
    this.velocity = velocity
  }

  setColor(color: string) {
    this.color = color
  }

  getColor() {
    return this.color
  }

  setPosition(position: Vector2D) {
    this.position = position
  }

  getPosition() {
    return this.position
  }

  setSize(size: Vector2D) {
    this.size = size
  }

  getSize() {
    return this.size
  }

  setScale(scale: Vector2D) {
    this.scale = scale
  }

  getScale() {
    return this.scale
  }

  updateFrame(deltaTime: number) {
    if(!this.ctx){
      return
    }
    let moveSpeed: Vector2D = {
      x: this.velocity.x * deltaTime,
      y: this.velocity.y * deltaTime
    }
    this.position.x = Math.round(this.position.x + moveSpeed.x)
    this.position.y = Math.round(this.position.y + moveSpeed.y)
    this.update(deltaTime)
  }

  renderFrame(deltaTime: number) {
    if(!this.ctx){
      return
    }
    this.ctx.beginPath()
    this.ctx.imageSmoothingEnabled = true
    this.ctx.scale(this.scale.x, this.scale.y)
    this.ctx.translate(this.position.x, this.position.y)
    this.render(this.ctx, deltaTime)
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].updateFrame(deltaTime)
      this.children[i].renderFrame(deltaTime)
    }
    this.ctx.translate(-this.position.x, -this.position.y)
    this.ctx.closePath()
  }

  render(ctx:CanvasRenderingContext2D, _deltaTime: number) {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, this.size.x, this.size.y)
  }

  update(_deltaTime: number) {}
}
