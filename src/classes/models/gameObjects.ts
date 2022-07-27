import * as three from 'three'
import Character from '../characterController';

export default class gameObjects {
    actor: three.Group;
    ground: three.Mesh;
    skybox: three.Mesh;
    player: Character
}