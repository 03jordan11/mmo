//Need to improve this to handle multiple movements

export class InputManager{
    w = false;
    a = false;
    s = false;
    d = false;
    e = false;
    wFirst = false;
    aFirst = false;
    sFirst = false;
    dFirst = false;
    eFirst = false;

    constructor(){
        document.addEventListener('keydown', this._onKeydown)
        document.addEventListener('keyup', this._onKeyup)
    }

    _onKeydown = (e: KeyboardEvent) => {
        switch(e.key){
            case 'w':
                if (!this.w)
                    this.wFirst = true;
                else
                    this.wFirst = false;
                this.w = true;
                break;
            case 'a':
                if (!this.a)
                    this.aFirst = true;
                else
                    this.aFirst = false;
                this.a = true;
                break;
            case 's':
                if (!this.s)
                    this.sFirst = true;
                else
                    this.sFirst = false;
                this.s = true;
                break;
            case 'd':
                if (!this.d)
                    this.dFirst = true;
                else
                    this.dFirst = false;
                this.d = true;
                break;
        }
    }
    _onKeyup = (e: KeyboardEvent) => {
        switch(e.key){
            case 'w':
                this.wFirst = false;
                this.w = false;
                break;
            case 'a':
                this.aFirst = false;
                this.a = false;
                break;
            case 's':
                this.sFirst = false;
                this.s = false;
                break;
            case 'd':
                this.dFirst = false;
                this.d = false;
                break;
        }
    }
}
