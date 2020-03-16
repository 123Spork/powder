import { Vector2D } from './types'

export const getCanvasSize = (): Vector2D => {
  return {
    x: ((document.getElementsByTagName('Canvas') as HTMLCollectionOf<Element>)[0] as HTMLCanvasElement).width,
    y: ((document.getElementsByTagName('Canvas') as HTMLCollectionOf<Element>)[0] as HTMLCanvasElement).height,
  }
}
