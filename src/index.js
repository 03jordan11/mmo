import Game from "./classes/game.js";

//main creates the Game object which starts the game loop, so by calling main you are 
//instantiating the loop. Don't call it twice though, thats bad
function main(){
    let game = new Game();

    game.loadObjMtl('camion jugete.obj', 'camion jugete.mtl')
    game.initializeSkybox();
    game.createBoard();
    game.render();

}

//Where everything is born
window.onload = () => {
    main()
}
