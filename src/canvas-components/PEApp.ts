import { PENodeInterface } from './PeNode'

export interface PEAppInterface {
  init: (canvas: HTMLCanvasElement) => void
  addChild: (child: PENodeInterface) => void
  getCanvas: (child: PENodeInterface) => HTMLCanvasElement
  update: (deltaTime: number) => void
  onResizeCanvas: () => void
}

interface PEAppOptionsInterface {
  fps: number
}

export class PEApp implements PEAppInterface {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  children: PENodeInterface[] = []
  lastRenderTime: number = 0
  constructor(options: PEAppOptionsInterface = { fps: 60 }) {
    this.canvas = (document.getElementsByTagName('Canvas') as HTMLCollectionOf<
      Element
    >)[0] as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    onresize = () => {
      this.onResizeCanvas()
    }

    setInterval(() => {
      requestAnimationFrame((time: number) => {
        let deltaTime: number = (time - this.lastRenderTime) * 0.001
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.update(deltaTime)
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].updateFrame(deltaTime)
          this.children[i].renderFrame(deltaTime)
        }
        this.ctx.stroke()
        this.lastRenderTime = time
      })
    }, 1000 / options.fps)
    this.init(this.canvas)
    this.onResizeCanvas()
  }

  update(deltaTime: number) {}

  onResizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].onResizeCanvas({
        x: this.canvas.width,
        y: this.canvas.height
      })
    }
  }

  getCanvas() {
    return this.canvas
  }

  init(_canvas: HTMLCanvasElement): void {}

  addChild(child: PENodeInterface) {
    this.children.push(child)
    child.setCtx(this.ctx)
    child.setParent(this)
  }
}
