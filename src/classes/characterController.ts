import * as three from 'three';
import { InputManager } from './InputManager';
import { Movement } from './movement';

export default class Character{
    seeds: number;
    wheat: number;
    water: number;
    name: string;
    mesh: three.Mesh | three.Group;
    input: InputManager;
    movement: Movement;
    constructor(name: string, inputManager: InputManager, mesh: three.Mesh | three.Group = null){
        this.seeds = 100;
        this.wheat = 0;
        this.water = 100;
        this.name = name;
        this.input = inputManager;
        this.mesh = mesh;
        this.movement = new Movement(mesh);
    }
    
    render = () : void => {
        this.acitonButton();
        this.movement.render();
    }

    //the purpose of this function should be to check if the
    //action button 'e' was clicked, and if it was, check
    //it against other conditions to do the correct action.
    //it should be checked every render frame.
    //
    //For example if I press e, I have to check if I am near
    //a list of actionable items. If not, nothing happens, if
    //so, an action occurs that changes the state of my character
    acitonButton = () : void => {
        if (this.input.eFirst) {
            this.seeds = this.seeds <= 50 ? 0 : this.seeds - 50;
        }
    }

    
}