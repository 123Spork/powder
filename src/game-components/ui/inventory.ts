import { PENode } from '../../canvas-components/PeNode'
import { getCanvasSize } from '../../canvas-components/utils'
import { Vector2D } from '../../canvas-components/types'

export default class Inventory extends PENode {
  init() {
    this.setSize({ x: getCanvasSize().x * 0.2, y: getCanvasSize().y })
    this.setColor('#0000ff')
  }

  onResize(dimensions: Vector2D) {
    this.setSize({ x: dimensions.x * 0.2, y: dimensions.y })
  }
}
