
import * as three from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { LoadObjects } from './gameObjectHelper'
import { Movement } from './movement'
import  gameObjects  from './models/gameObjects';

export default class Game {
    gameObjects: gameObjects;
    movementHelper: Movement;

    scene = new three.Scene();
    camera = new three.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);
    renderer = new three.WebGLRenderer();
    loader = new OBJLoader();
    imgLoader = new three.ImageLoader();
    mtlLoader = new MTLLoader();
    axesHelper = new three.AxesHelper( 5 );
    controls = new OrbitControls(this.camera, this.renderer.domElement)
    light = new three.DirectionalLight(0xfdfbd3, 4);
    objLoader: LoadObjects;
    
    
    constructor(){
        //Renderer configuration
        this.renderer.debug.checkShaderErrors = true; //turn this off in production
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = three.PCFSoftShadowMap;
        console.log(this.renderer.info);
        console.log(this.renderer.getPixelRatio())

        //In case user resizes window
        this.windowResize();

        //Basic setup and CAMERA
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 1;
        this.camera.position.y = 1;
        this.camera.position.x = -1;

        //set paths for loaders
        this.loader.setPath('../../assets/')
        this.mtlLoader.setPath('../../assets/')

        //creating canvas
        this.renderer.domElement.style.width = '100vw'
        this.renderer.domElement.style.height = '100vh'
        document.body.appendChild(this.renderer.domElement)

        //Show's axis for project, should only be active in dev environment
        this.scene.add(this.axesHelper);

        //Configruing lights
        this.light.position.set(-100, 10, 0);
        this.light.castShadow = true;
        this.scene.add(this.light);

        this.init();

        console.log(this.gameObjects);
        

    }

    init = async():Promise<void> => {
        this.objLoader = new LoadObjects(this.scene)
        await this.objLoader.loadActor()
        this.gameObjects = this.objLoader.getObjects();

        this.movementHelper = new Movement(this.gameObjects.player.mesh);
        this.render();
    }

    //Call this to begin the game loop
    render = ():void => {
        requestAnimationFrame(this.render);
        //this.light.position.setX(this.light.position.x + .1);
        this.controlSun();
        this.controls.update();
        this.objLoader.render();
        this.renderer.render(this.scene, this.camera);

    }

    controlSun = () => {
       
        if(this.light.intensity != 4 && this.light.position.x !== 100){
            this.light.intensity = this.light.intensity + .05
        }else{
            this.light.position.setX(this.light.position.x + .1);
        }
 
        if (this.light.position.x >= 100){
            if(this.light.intensity != 1){
                console.log(`intensity is ${this.light.intensity}`);
                this.light.intensity = this.light.intensity - .05;
            }
            else{
                this.light.position.setX(-100);
            }
                
        }
        
    }

    windowResize = ():void => {
        console.log('im in above');
       
        window.addEventListener('resize', (ev) => {
            console.log('im in')
            this.renderer.setSize(window.innerWidth, window.innerHeight, false);
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
        });
        window.addEventListener("gamepadconnected", function(e) {
            console.log(e.gamepad)
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index, e.gamepad.id,
            e.gamepad.buttons.length, e.gamepad.axes.length);
          });
    }

}