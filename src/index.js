import Game from "./classes/game.js";

//main creates the Game object which starts the game loop, so by calling main you are 
//instantiating the loop. Don't call it twice though, thats bad
function main(){
    let game = new Game();
    game.loadObjects().then((success) =>{
        console.log("SHOULD BE LAST")
        game.render()
    },
    (error) =>
    {
        console.error("error in loadObjects: " + error)
    }
    );
}

//Where everything is born
window.onload = () => {
    main()
}
