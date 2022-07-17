import * as three from "three"
import { InputManager } from "./InputManager";

export class Movement{
    constructor(mesh){
        this.mesh = mesh;
        this.inputs = new InputManager();

    }

    moveDetected = () => {
        console.log(`${this.inputs.keyDown} key, pressed is ${this.inputs.isPressed}`)
    }
}