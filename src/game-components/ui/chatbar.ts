import { PENode } from '../../canvas-components/PeNode'
import {getCanvasSize} from '../../canvas-components/utils'
import { Vector2D } from '../../canvas-components/types'

export default class ChatBar extends PENode {
  init(){
    this.setSize({x:getCanvasSize().x, y:100})
    this.setPosition({x:0, y:getCanvasSize().y - 100})
    this.setColor('#ff00ff')
  }
  onResize(dimensions:Vector2D){
    this.setSize({x:dimensions.x, y:100})
    this.setPosition({x:0, y:dimensions.y - 100})
  }
}