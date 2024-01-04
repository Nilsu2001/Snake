import {Grass} from "./Grass.js";
import {Square} from "./Square.js";

/**
 * PowerDown square type. Used for collectibles 
 * to increase player score and snake length.
 * @class 
 * @extends {Square}
 */
 export class PowerUp extends Square {

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
    * Increases score and snake length on collision.
    * @override
    */
    react() {
        console.log("PowerUp collected");
        this.#controller.getPlayerController().updateScore(20);
        this.#controller.getSnakeController().updateLength(1);
        this.#controller.getMapController().spawnPowerUpOnMap();
        this.#controller.getMapController().updatePowerDown();
        this.#controller.increaseGameSpeed(2);
        return new Grass();
    }
}
