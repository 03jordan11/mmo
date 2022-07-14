
import * as three from 'three'
import { Vector3 } from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



export default class Game {
    constructor(){
        this.scene = new three.Scene();
        this.camera = new three.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.loader = new OBJLoader();

        document.body.appendChild(this.renderer.domElement)

        let geometry = new three.BoxGeometry(1, 1, 1);
        let meterial = new three.MeshBasicMaterial( { color: 0x00ff00 });
        this.cube = new three.Mesh(geometry, meterial);
        this.axesHelper = new three.AxesHelper( 5 );
        this.scene.add(this.axesHelper);
        //this.scene.add(this.cube);
        this.camera.position.z = 25;
        this.camera.position.y = 15;
        this.camera.position.x = -10;


        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.light = new three.PointLight(0xff0000, 10, 100);
        this.light.position.set(50, 50, 50);
        this.scene.add(this.light);
    }

    render = () => {
        requestAnimationFrame(this.render);

        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;
        this.controls.update();

        this.renderer.render(this.scene, this.camera);

    }



    loadObjects = () => {
        const result = new Promise((resolve, reject) => {
            this.loader.load('../../assets/wooden_model _truck.obj', 
            (object) => {
                this.scene.add(object);
                this.renderer.render(this.scene, this.camera);
                resolve("we did it");
            },
            (xhr) => console.log((xhr.loaded/xhr.total*100)+'% loaded'),
            (error) => {
                console.log('An error happened: ' + error.message);
                reject("we got err");
            }
        )
        });
        return result;
    }

}