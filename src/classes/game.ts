
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
    ambientLight = new three.AmbientLight(0xadd8e6, 1)
    light = new three.PointLight(0xfdfbd3, 10, 100);
    
    
    constructor(){
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
        this.light.position.set(50, 50, 50);
        this.scene.add(this.light);
        this.scene.add(this.ambientLight);

        this.init();

        console.log(this.gameObjects);
        

    }

    init = async():Promise<void> => {
        const objLoader = new LoadObjects(this.scene)
        await objLoader.loadActor()
        this.gameObjects = objLoader.getObjects();

        this.movementHelper = new Movement(this.gameObjects.actor);
        this.render();
    }

    //Call this to begin the game loop
    render = ():void => {
        requestAnimationFrame(this.render);

        this.controls.update();
        this.gameObjects.skybox.rotateX(0.00005);
        this.movementHelper.renderLoop();
        this.renderer.render(this.scene, this.camera);

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