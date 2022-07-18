import * as three from "three"
import { InputManager } from "./InputManager";

export class Movement{
    constructor(mesh){
        this.mesh = mesh;
        console.log(this.mesh);
        this.inputs = new InputManager();

    }

    renderLoop = () => {
        let forward = this.inputs.w;
        let back = this.inputs.s;
        let right = this.inputs.d;
        let left = this.inputs.a;
        let frontRight = forward && right;
        let frontLeft = forward && left;
        let backRight = back && right;
        let backLeft = back && left;

        if (frontRight){
            console.log('frontRight');
            this.mesh.position.x += 10
            //this.mesh.translateZ( 10 );
        }
        else if(frontLeft){
            console.log('frontLeft');
        }
        else if(backLeft){
            console.log('backLeft');
        }
        else if (backRight){
            console.log('backRIght');
        }
        else if (forward){
            console.log('forward');
        }
        else if (back){
            console.log('back');
        }
        else if (left){
            console.log('left');
        }
        else if (right){
            console.log('right');
        }
        

    }
}