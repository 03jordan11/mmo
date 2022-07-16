
import * as three from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
        this.imgLoader = new three.ImageLoader();
        this.mtlLoader = new MTLLoader();
        //mtlLoader.setPath('path/to/assets/')
        //mtlLoader.setTexturePath('path/to/textures')

        //Creates canvas on page
        document.body.appendChild(this.renderer.domElement)

        //TODELETE basic example using a cube, should be done outsid constructor and called by a function
        let geometry = new three.BoxGeometry(1, 1, 1);
        let meterial = new three.MeshBasicMaterial( { color: 0x00ff00 });
        this.cube = new three.Mesh(geometry, meterial);

        //Show's axis for project, should only be active in dev environment
        this.axesHelper = new three.AxesHelper( 5 );
        this.scene.add(this.axesHelper);



        //Allows you to orbit around the camera
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        //Adding light so that we can see objects
        this.light = new three.PointLight(0xfdfbd3, 10, 100);
        this.light.position.set(50, 50, 50);

        this.scene.add(this.light);
    }

    //Call this to begin the game loop
    render = () => {
        requestAnimationFrame(this.render);

        this.controls.update();

        this.renderer.render(this.scene, this.camera);

    }


    loadObjMtl = (objFile, mtlFile) => {
        this.mtlLoader.load(mtlFile, (materials) => {
            materials.preload();
            this.loader.setMaterials(materials);
            this.loader.load(objFile, (object) =>{
                this.scene.add(object);
            }, 
            (xhr) => console.log((xhr.loaded/xhr.total*100)+'% loaded obj'))
        },
        (xhr) => console.log((xhr.loaded/xhr.total*100)+'% loaded mtl'))
    }

    initializeSkybox = () => {
        console.log('in inside skybox')
        let matArray = [];
        let texture_posX = new three.TextureLoader().load('../../assets/galaxy/galaxy+X.jpg')
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
        this.scene.add(skybox);
    }

}