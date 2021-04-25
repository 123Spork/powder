import { PEApp, PEAppOptionsInterface } from './canvas-components/pe-app'
import Inventory from './game-components/ui/inventory'
import ChatBar from './game-components/ui/chatbar'
import './app.css'
import { PESound } from './canvas-components/pe-sound'
import { PEPlayerCharacterSprite } from './canvas-components/pe-player-character-sprite.'
import {
  PECharacterSprite,
  PECharacterSpriteStepKeyEnum
} from './canvas-components/pe-character-sprite'

export default class PowderApp extends PEApp {
  peNode: PEPlayerCharacterSprite

  aiNode: PECharacterSprite

  constructor(options?: PEAppOptionsInterface) {
    super(options)

    this.peNode = new PEPlayerCharacterSprite({
      texture: 'images/test.png',
      textureSize: { x: 200, y: 200 },
      position: { x: 320, y: 128 },
      color: '#ff0000',
      size: { x: 100, y: 100 },
      walkSpeed: 64
    })

    this.aiNode = new PEPlayerCharacterSprite({
      texture: 'images/test.png',
      textureSize: { x: 200, y: 200 },
      position: { x: 320, y: 128 },
      color: '#ff0000',
      size: { x: 100, y: 100 },
      walkSpeed: 64,
      isLoopingPath: true
    })

    this.aiNode.queueStep({
      key: PECharacterSpriteStepKeyEnum.WALK_RIGHT,
      value: 3
    })
    this.aiNode.queueStep({
      key: PECharacterSpriteStepKeyEnum.WALK_DOWN,
      value: 3
    })
    this.aiNode.queueStep({
      key: PECharacterSpriteStepKeyEnum.STAND_STILL,
      value: 5000
    })
    this.aiNode.queueStep({
      key: PECharacterSpriteStepKeyEnum.WALK_LEFT,
      value: 3
    })
    this.aiNode.queueStep({
      key: PECharacterSpriteStepKeyEnum.WALK_UP,
      value: 3
    })

    const sound = new PESound({
      sound: 'sounds/in-time.mp3',
      isLoop: true
    })
    sound.delayPlay(5000)

    this.addChild(this.aiNode)
    this.addChild(new Inventory())
    this.addChild(new ChatBar())
  }

  update(_deltaTime: number) {}
}
