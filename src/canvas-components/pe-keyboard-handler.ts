export interface PEKeyboardHandlerInterface {
  registerKeyControl: (
    key: string,
    callback?: (key: string, isKeyDown: boolean) => void
  ) => void

  isKeyDown: (key: string) => boolean
}

export class PEKeyboardHandler implements PEKeyboardHandlerInterface {
  isKeyDownStates: { [key: string]: boolean } = {}

  public registerKeyControl(
    key: string,
    callback?: (key: string, isKeyDown: boolean) => void
  ): void {
    this.isKeyDownStates[key] = false
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key != key) {
        return
      }
      this.isKeyDownStates[key] = true
      if(callback){
        callback(key, true)
      }
    })

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key != key) {
        return
      }
      this.isKeyDownStates[key] = false
      if(callback){
        callback(key, false)
      }
    })
  }

  public isKeyDown(key: string): boolean {
    if(typeof this.isKeyDownStates[key] === 'undefined') {
      throw new Error(`Key "${key}" has not been registered.`)
    }
    return this.isKeyDownStates[key] || false
  }
}
