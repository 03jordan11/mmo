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

    /**
     * This function sets the keys to true if they have
     * been pressed, and sets their corresponding 'first'
     * flag if it was the first time they were called. 
     * This allows for actions where you just want to check if a 
     * button was pressed once, and don't care if the button
     * was held down. Such is the case when interacting with objects
     * 
     * @param e keyboard event
     */
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
