import { PENode } from './canvas-components/PeNode'
import { PEApp } from './canvas-components/PEApp'
import Inventory from './game-components/ui/inventory'
import ChatBar from './game-components/ui/chatbar'
import './app.css'

export default class PowderApp extends PEApp {
  peNode:PENode|null = null

  init(){

    this.addChild((new Inventory()))

    this.addChild((new ChatBar()))

    this.peNode = new PENode({
      color: '#ffff00',
      size: { x: 100, y: 100 },
      position: { x: 20, y: 20 }
    })
    this.peNode.addChild(
      new PENode({ color: '#ff0000', size: { x: 20, y: 20 } })
    )
    this.peNode.setVelocity({x:35,y:35})
    this.addChild(this.peNode)
    
  }

  update(deltaTime:number){

    if(this.peNode){
      if(this.peNode.getPosition().x>this.canvas.width-100){
        this.peNode.setVelocity({x:-1, y:-1})
      }
    }
  }
}
