
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
        //Basic setup and CAMERA
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 1;
        this.camera.position.y = 1;
        this.camera.position.x = -1;

        //Initialize OBJLoader
        
        this.loader.setPath('../../assets/')

        this.mtlLoader.setPath('../../assets/')

        //Creates canvas on page
        document.body.appendChild(this.renderer.domElement)

        //Show's axis for project, should only be active in dev environment
        this.scene.add(this.axesHelper);

        //Allows you to orbit around the camera

        //Adding light so that we can see objects
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
        
        //console.log(`the truck is at ${this.gameObjects.truck.position.x}:${this.gameObjects.truck.position.y}:${this.gameObjects.truck.position.z}`)
        //console.log(`the ground is at ${this.gameObjects.ground.position.x}:${this.gameObjects.ground.position.y}:${this.gameObjects.ground.position.z}`)
        //console.log(`the  is at ${this.gameObjects.truck.position.x}:${this.gameObjects.truck.position.y}:${this.gameObjects.truck.position.z}`)

        this.renderer.render(this.scene, this.camera);

    }

}