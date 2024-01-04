import {Grass} from "./Grass.js";
import {Square} from "./Square.js";

/**
 * PowerDown square type. Used for collectibles to inflict damage on the snake.
 * Decreases player score and snake length.
 * @class
 * @extends {Square}
 */
 export class PowerDown extends Square {

    /** Main controller instance */
    #controller;

    /**
     * @param controller Main controller instance to
     * interact with player, map and snake
     */
    constructor(controller) {
        super();
        this.#controller = controller;
    }

    /**
    * Decreases score and snake length on collision.
    * @override
    */
    react() {
        console.log("PowerDown collected");
        this.#controller.getPlayerController().updateScore(-20);
        this.#controller.getSnakeController().updateLength(-1);
        this.#controller.getMapController().spawnPowerDownOnMap();
        this.#controller.increaseGameSpeed(-2);
        return new Grass();
    }
}
