import Game from "./classes/game.js";

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
    //game.render();
}

window.onload = () => {
    main()
}
