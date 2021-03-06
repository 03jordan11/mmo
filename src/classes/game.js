
import * as three from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { LoadObjects } from './gameObjectHelper'
import { Movement } from './movement'

export default class Game {
    constructor(){
        //Basic setup and CAMERA
        this.scene = new three.Scene();
        this.camera = new three.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.renderer = new three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 1;
        this.camera.position.y = 1;
        this.camera.position.x = -1;

        //Initialize OBJLoader
        this.loader = new OBJLoader();
        this.loader.setPath('../../assets/')
        this.imgLoader = new three.ImageLoader();
        this.mtlLoader = new MTLLoader();
        this.mtlLoader.setPath('../../assets/')

        //Creates canvas on page
        document.body.appendChild(this.renderer.domElement)

        //Show's axis for project, should only be active in dev environment
        this.axesHelper = new three.AxesHelper( 5 );
        this.scene.add(this.axesHelper);

        //Allows you to orbit around the camera
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        //Adding light so that we can see objects
        let ambientLight = new three.AmbientLight(0xadd8e6, 1)
        this.light = new three.PointLight(0xfdfbd3, 10, 100);
        this.light.position.set(50, 50, 50);
        this.scene.add(this.light);
        this.scene.add(ambientLight);

        this.init();

        console.log(this.gameObjects);
        

    }

    init = async() => {
        const objLoader = new LoadObjects(this.scene)
        await objLoader.loadActor()
        this.gameObjects = objLoader.getObjects();

        this.movementHelper = new Movement(this.gameObjects.actor);
        this.render();
    }

    //Call this to begin the game loop
    render = () => {
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