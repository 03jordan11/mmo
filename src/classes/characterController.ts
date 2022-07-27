import * as three from 'three';
import { InputManager } from './InputManager';

export default class Character{
    seeds: number;
    wheat: number;
    water: number;
    name: string;
    mesh: three.Mesh;
    input: InputManager;
    constructor(name: string, inputManager: InputManager){
        this.seeds = 100;
        this.wheat = 0;
        this.water = 100;
        this.name = name;
        this.input = inputManager;
    }
    
    //the purpose of this function should be to check if the
    //action button 'e' was clicked, and if it was, check
    //it against other conditions to do the correct action.
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