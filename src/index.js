import Game from "./classes/game.js";

//main creates the Game object which starts the game loop, so by calling main you are 
//instantiating the loop. Don't call it twice though, thats bad
function main(){
    let game = new Game();

    game.render();
    game.loadObjMtl('../../assets/camion jugete.obj', '../../assets/camion jugete.mtl')
    game.initializeSkybox();
}

//Where everything is born
window.onload = () => {
    main()
}
