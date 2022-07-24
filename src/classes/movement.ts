import * as three from "three"
import { InputManager } from "./InputManager";

export class Movement{
    mesh: three.Mesh | three.Group;
    inputs = new InputManager();
    constructor(mesh: three.Mesh | three.Group){
        this.mesh = mesh;
    }

    renderLoop = ():void => {
        let forward = this.inputs.w;
        let back = this.inputs.s;
        let right = this.inputs.d;
        let left = this.inputs.a;
        let frontRight = forward && right;
        let frontLeft = forward && left;
        let backRight = back && right;
        let backLeft = back && left;

        if (frontRight){
            this.mesh.translateZ( .05 );
            this.mesh.translateX( -.05 );
            console.log('frontRight');
        }
        else if(frontLeft){
            this.mesh.translateZ( .05 );
            this.mesh.translateX( .05 );
            console.log('frontLeft');
        }
        else if(backLeft){
            this.mesh.translateZ( -.05 );
            this.mesh.translateX( .05 );
            console.log('backLeft');
        }
        else if (backRight){
            this.mesh.translateZ( -.05 );
            this.mesh.translateX( -.05 );
            console.log('backRIght');
        }
        else if (forward){
            this.mesh.translateZ( .05 );
            console.log('forward');
        }
        else if (back){
            this.mesh.translateZ( -.05 );
            console.log('back');
        }
        else if (left){
            this.mesh.translateX( .05 );
            console.log('left');
        }
        else if (right){
            this.mesh.translateX( -.05 );
            console.log('right');
        }
        

    }
}