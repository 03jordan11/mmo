import * as three from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


export class LoadObjects{
    actor = null;
    constructor(scene){
        this.scene = scene
       
        this.ground = this.createBoard(scene)
        this.skybox = this.initializeSkybox(scene)        
    }

    getObjects = () => {
        return {
            actor: this.actor,
            ground: this.ground,
            skybox: this.skybox
        }
    }

    loadActor = () => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load('../../assets/buster_drone/scene.gltf', (gltf) => {
                gltf.scene.translateY(1.2);
                this.actor = gltf.scene;
                this.scene.add(gltf.scene);
                resolve();
            });
        })
        
    }

    createBoard = (scene) => {
        let texture = new three.TextureLoader().load('../../assets/textures/grass.jpg')
        texture.wrapS = three.RepeatWrapping;
        texture.wrapT = three.RepeatWrapping;
        texture.repeat.set(600, 600);
        let geo = new three.PlaneGeometry(2048, 2048)
        let mat = new three.MeshBasicMaterial({map: texture, side: three.DoubleSide})
        let plane = new three.Mesh(geo, mat);
        plane.rotation.x = Math.PI/2
        scene.add(plane)
        return plane;
    }

    initializeSkybox = (scene) => {
        let matArray = [];
        let texture_posX = new three.TextureLoader().load('../../assets/galaxy/galaxy+X.png')
        let texture_posY = new three.TextureLoader().load('../../assets/galaxy/galaxy+Y.png')
        let texture_posZ = new three.TextureLoader().load('../../assets/galaxy/galaxy+Z.png')
        let texture_negX = new three.TextureLoader().load('../../assets/galaxy/galaxy-X.png')
        let texture_negY = new three.TextureLoader().load('../../assets/galaxy/galaxy-Y.png')
        let texture_negZ = new three.TextureLoader().load('../../assets/galaxy/galaxy-Z.png')
        matArray.push(new three.MeshBasicMaterial({map: texture_posX}))
        matArray.push(new three.MeshBasicMaterial({map: texture_posY}))
        matArray.push(new three.MeshBasicMaterial({map: texture_posZ}))
        matArray.push(new three.MeshBasicMaterial({map: texture_negX}))
        matArray.push(new three.MeshBasicMaterial({map: texture_negY}))
        matArray.push(new three.MeshBasicMaterial({map: texture_negZ}))
        
        for(let i=0; i<6; i++){
            matArray[i].side = three.BackSide
        }
    
        let skyboxGeo = new three.BoxGeometry(10000, 10000, 10000);
        let skybox = new three.Mesh(skyboxGeo, matArray);
        scene.add(skybox);
        return skybox;
    }

}

export function loadAllObjects(scene){
    //let truck = loadObjMtl(scene, '../../assets/camion jugete.obj', '../../assets/camion jugete.mtl');
    let ground = createBoard(scene);
    let skybox = initializeSkybox(scene);
    let actor = loadActor(scene);

    return {
        actor: actor,
        //truck: truck,
        ground: ground,
        skybox: skybox
    }
}



