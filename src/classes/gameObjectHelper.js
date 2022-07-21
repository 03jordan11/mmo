import * as three from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


export class LoadObjects{
    actor = null;
    constructor(scene){
        this.scene = scene
       
        this.ground = this.createBoard(scene);
        this.skybox = this.initializeSkybox(scene)        
    }

    getObjects = () => {
        return {
            actor: this.actor,
            ground: this.ground,
            skybox: this.skybox,
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

export function loadAllObjects(scene){
    let ground = createBoard(scene);
    let skybox = initializeSkybox(scene);
    let actor = loadActor(scene);

    return {
        actor: actor,
        ground: ground,
        skybox: skybox
    }
}



