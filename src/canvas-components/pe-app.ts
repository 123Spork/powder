import { PENodeInterface } from './pe-node'

export interface PEAppInterface {
  addChild: (child: PENodeInterface) => void
  getCanvas: (child: PENodeInterface) => HTMLCanvasElement
  update: (deltaTime: number) => void
  onResizeCanvas: () => void
}

export interface PEAppOptionsInterface {
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

  addChild(child: PENodeInterface) {
    this.children.push(child)
    child.ctx = this.ctx
    child.parent = this
  }
}
