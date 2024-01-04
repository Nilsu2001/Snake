import {Square} from "./Square.js";

/**
 * Obstacle square type. Used for obstacles that cannot be crossed.
 * Kills the snake on collision.
 * @class
 * @extends {Square}
 */
 export class Obstacle extends Square {

    /** Snake controller instance */
    #snakeController;

    /**
     * @param snakeController The {@link SnakeController} instance
     * to interact with the snake.
     */
    constructor(snakeController) {
        super();
        this.#snakeController = snakeController;
    }

    /**
    * Kills the snake on collision.
    * @override
    */
    react() {
        console.log("Obstacle hit");
        this.#snakeController.killSnake();
        return this;
    }

}

