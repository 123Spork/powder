import { PENode, PENodeOptions } from '../../canvas-components/pe-node'
import { getCanvasSize } from '../../canvas-components/utils'
import { Vector2D } from '../../canvas-components/types'

export default class Inventory extends PENode {
  constructor(options?: PENodeOptions) {
    super(options)
    this.size = { x: getCanvasSize().x * 0.2, y: getCanvasSize().y }
    this.color = '#0000ff'
  }

  onResize(dimensions: Vector2D) {
    this.size = { x: dimensions.x * 0.2, y: dimensions.y }
  }
}
