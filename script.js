import {Map} from "./Model/Map/Map.js";
import {PowerUp} from "./Model/Map/PowerUp.js";
import {PowerDown} from "./Model/Map/PowerDown.js";
import {Snake} from "./Model/Snake/Snake.js";
import {MainController} from "./Controller/MainController.js";
import { MainView } from "./View/MainView.js";


// create/start game by clicking on play button
document.getElementById('playButton').onclick = function(){

    // hide menu
    document.getElementById('menu').style.display = 'none';

    // create model, view and controller objects
    let snake = new Snake();
    let map = new Map(20,20);
    let controller = new MainController(map, snake, "Spieler1");

    let view = new MainView(map, snake, controller.getPlayerController().getPlayer());

    // init map
    map.setSquare(3, 7, new PowerUp(controller));
    map.setSquare(15,13, new PowerDown(controller));
    controller.getMapController().placeRandomTunnelOnMap();
    
    // start clock
    view.startClock();
    controller.startClock(200);

    // draw canvas
    view.draw();

}

// open rules screen
document.getElementById('helpIcon').onclick = function() {
    document.getElementById('gameDescription').style.display = "block";
}

// close rules screen
document.getElementById('closeIcon').onclick = function() {
    document.getElementById('gameDescription').style.display = "none";
}



