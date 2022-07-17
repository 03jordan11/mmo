//Need to improve this to handle multiple movements

export class InputManager{
    constructor(){
        this.keyDown = ''
        this.isPressed = false
        document.addEventListener('keydown', (e) => {
            this.keyDown = e.key
            this.isPressed = true
        })
        document.addEventListener('keyup', (e) => {
            if (e.key === this.keyDown){
                this.isPressed = false
            }
        })
    }
}
