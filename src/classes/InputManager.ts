//Need to improve this to handle multiple movements

export class InputManager{
    w = false;
    a = false;
    s = false;
    d = false;

    constructor(){
        document.addEventListener('keydown', this._onKeydown)
        document.addEventListener('keyup', this._onKeyup)
    }

    _onKeydown = (e: KeyboardEvent) => {
        switch(e.key){
            case 'w':
                this.w = true;
                break;
            case 'a':
                this.a = true;
                break;
            case 's':
                this.s = true;
                break;
            case 'd':
                this.d = true;
                break;
        }
    }
    _onKeyup = (e: KeyboardEvent) => {
        switch(e.key){
            case 'w':
                this.w = false;
                break;
            case 'a':
                this.a = false;
                break;
            case 's':
                this.s = false;
                break;
            case 'd':
                this.d = false;
                break;
        }
    }
}
