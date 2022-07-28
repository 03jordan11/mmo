import * as three from 'three'
import gameObjects from './models/gameObjects';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import Character from './characterController';
import { InputManager } from './InputManager';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'; 
import { Vector3 } from 'three';


export class LoadObjects{
    gameObjects = new gameObjects();
    scene: three.Scene;

    constructor(scene: three.Scene){
        this.scene = scene
       
        this.gameObjects.ground = this.createBoard(scene);
        this.gameObjects.skybox = this.initializeSkybox(scene);  
    }

    render = () => {
        this.gameObjects.player.render();
        this.gameObjects.skybox.rotateX(0.00005);
    }

    getObjects = () => {
        return this.gameObjects;
    }

    loadActor = (): Promise<void> => {
        return new Promise((resolve, reject): void => {
            // const loader = new GLTFLoader();
            // loader.load('../../assets/buster_drone/scene.gltf', (gltf) => {
            //     gltf.scene.translateY(1.2);
            //     gltf.scene.castShadow = true;
            //     this.gameObjects.player = new Character('jordan', new InputManager(), gltf.scene)
            //     this.scene.add(gltf.scene);
            //     resolve();
            // });
            const loader = new FBXLoader();
            loader.load(
                '../../assets/xbot.fbx',
                (object) => {
                    object.traverse((node) => {
                        if (node instanceof three.Mesh){
                            node.castShadow = true;
                        }
                    })
                    object.castShadow = true;
                    object.scale.set(0.01, 0.01, 0.01);

                    const animLoader = new FBXLoader();
                    animLoader.load('../../assets/Idle.fbx', (anim) => {
                        const mixer = new three.AnimationMixer(object)
                        const idle = mixer.clipAction(anim.animations[0]);
                        idle.play();
                        this.gameObjects.player = new Character('jordan', new InputManager(), object)
                        this.scene.add(object);
                        resolve();

                    })

                }
            )
        })
        
    }

    loadCharacter = () => {
        const loader = new FBXLoader();;
        loader.load(
            '../../assets/xbot.fbx',
            (object) => {
                object.traverse((node) => {
                    if (node instanceof three.Mesh){
                        node.castShadow = true;
                    }
                })
                object.castShadow = true;
                this.gameObjects.player = new Character('jordan', new InputManager(), object)
                this.scene.add(object);
            }
        )
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
    
        let skyboxGeo = new three.BoxGeometry(10000, 10000, 10000);
        let skybox = new three.Mesh(skyboxGeo, matArray);
        scene.add(skybox);
        return skybox;
    }

}



