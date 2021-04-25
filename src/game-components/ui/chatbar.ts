import { PENode, PENodeOptions } from '../../canvas-components/pe-node'
import { getCanvasSize } from '../../canvas-components/utils'
import { Vector2D } from '../../canvas-components/types'

export default class ChatBar extends PENode {
  constructor(options?: PENodeOptions) {
    super(options)
    this.size = { x: getCanvasSize().x, y: 100 }
    this.position = { x: 0, y: getCanvasSize().y - 100 }
    this.color = '#ff00ff'
  }
  onResize(dimensions: Vector2D) {
    this.size = { x: dimensions.x, y: 100 }
    this.position = { x: 0, y: dimensions.y - 100 }
  }
}
