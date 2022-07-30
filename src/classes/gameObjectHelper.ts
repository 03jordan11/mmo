import * as three from 'three'
import gameObjects from './models/gameObjects';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import Character from './characterController';
import { InputManager } from './InputManager';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'; 


export class LoadObjects{
    gameObjects = new gameObjects();
    scene: three.Scene;
    idle: three.AnimationAction;
    mixer: three.AnimationMixer;
    clock = new three.Clock();

    constructor(scene: three.Scene){
        this.scene = scene
       
        this.gameObjects.ground = this.createBoard(scene);
        this.gameObjects.skybox = this.initializeSkybox(scene);
        this.loadActor();
    }

    render = () => {
        this.gameObjects.player.render();
        this.gameObjects.skybox.rotateX(0.00005);
        if (this.mixer){
            this.mixer.update(this.clock.getDelta());
        }
    }

    getObjects = () => {
        return this.gameObjects;
    }

    getIdle = () => {
        return this.idle;
    }
    
    loadActor = async () => {
        const loader = new FBXLoader();
        let object = await loader.loadAsync('../../assets/xbot.fbx');
        object.traverse((node) => {
            if (node instanceof three.Mesh){
                node.castShadow = true;
            }
        });
        object.scale.set(0.01, 0.01, 0.01);

        const animLoader = new FBXLoader();
        this.mixer = new three.AnimationMixer(object);
        let anim = await animLoader.loadAsync('../../assets/Idle.fbx');
        let idle = this.mixer.clipAction(anim.animations[0]).play();
        idle.play();
        this.scene.add(object);
        this.gameObjects.player = new Character('jordan', new InputManager(), object);
    }

    createBoard = (scene: three.Scene) : three.Mesh => {
        let texture = new three.TextureLoader().load('../../assets/textures/grass.jpg')
        texture.wrapS = three.RepeatWrapping;
        texture.wrapT = three.RepeatWrapping;
        texture.repeat.set(600, 600);
        let geo = new three.BoxGeometry(2048, 2048, 0.05)//new three.PlaneGeometry(2048, 2048)
        let mat = new three.MeshPhongMaterial({map: texture, side: three.DoubleSide})
        let plane = new three.Mesh(geo, mat);
        plane.rotation.x = Math.PI/2
        plane.receiveShadow = true;
        scene.add(plane)
        return plane;
    }

    initializeSkybox = (scene: three.Scene) : three.Mesh => {
        let matArray = [];
        let ft = new three.TextureLoader().load('../../assets/skybox/corona_ft.png')
        let bk = new three.TextureLoader().load('../../assets/skybox/corona_bk.png')
        let up = new three.TextureLoader().load('../../assets/skybox/corona_up.png')
        let dn = new three.TextureLoader().load('../../assets/skybox/corona_dn.png')
        let lf = new three.TextureLoader().load('../../assets/skybox/corona_lf.png')
        let rt = new three.TextureLoader().load('../../assets/skybox/corona_rt.png')
        matArray.push(new three.MeshBasicMaterial({map: lf}))
        matArray.push(new three.MeshBasicMaterial({map: rt}))
        matArray.push(new three.MeshBasicMaterial({map: up}))
        matArray.push(new three.MeshBasicMaterial({map: dn}))
        matArray.push(new three.MeshBasicMaterial({map: ft}))
        matArray.push(new three.MeshBasicMaterial({map: bk}))
        
        for(let i=0; i<6; i++){
            matArray[i].side = three.BackSide
        }
    
        let skyboxGeo = new three.BoxGeometry(1000, 1000, 1000);
        let skybox = new three.Mesh(skyboxGeo, matArray);
        scene.add(skybox);
        return skybox;
    }

}



