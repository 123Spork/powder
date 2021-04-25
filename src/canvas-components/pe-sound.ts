import { PENodeOptions, PENodeInterface, PENode } from './pe-node'

export interface PESoundInterface extends PENodeInterface {
  sound: string
  isLoop: boolean
  delayPlay: (delayMs:number) => void
  play: ()=>void
}

export interface PESoundOptions extends PENodeOptions {
  sound: string
  isLoop?: boolean
}

export class PESound extends PENode implements PESoundInterface {
  protected _sound: HTMLAudioElement = new Audio()
  private _canPlay: boolean

  constructor(options: PESoundOptions) {
    super(options)
    this._canPlay = false
    this.sound = options.sound
    this.isLoop = options.isLoop ? true : false

    const self = this
    this._sound.addEventListener('loadeddata', function() {
      if (self._sound.readyState >= 2) {
        self._sound.muted = false
        self._canPlay = true
      }
    })
  }

  set sound(sound: string) {
    this._canPlay = false
    this._sound.muted = true
    this._sound.src = sound
  }

  get sound(): string {
    return this._sound.src
  }

  set isLoop(isLoop: boolean) {
    this._sound.loop = isLoop
  }

  get isLoop(): boolean {
    return this._sound.loop
  }

  delayPlay(delayMS: number): void {
    const self = this
    setTimeout(() => {
      self.play()
    }, delayMS)
  }

  play(): void {
    if (this._canPlay) {
      this._sound.play()
    } else {
      const self = this
      setTimeout(() => {
        self.play()
      }, 100)
    }
  }
}
