import {SnakeView} from "./SnakeView.js";
import {MapView} from "./MapView.js";

/**
 * @class MainView draws and displays objects on the canvas
 */
export class MainView {

    /** snake */
    #snake;

    /** MainView Map */
    #mapView;

    /** MainView Snake */
    #snakeView;

    /** CanvasStage*/
    #stage;

    /** timer which draws frames */
    #clock;

    /** player */
    #player;

    /** Constructor
     * @param map is the map
     * @param snake is the snake
     * @apram player is the player
     * #squares is a 2D-Array
     */
    constructor(map, snake, player) {
        this.#snake = snake;
        this.#snakeView = new SnakeView(snake, map);
        this.#mapView = new MapView(map);
        this.#player = player;
        this.draw();
    }

    /**
     * draws every created shape object on the canvas
     */
    draw(){

        // create stage for the canvas element
        this.#stage = new createjs.Stage("gameCanvas");

        // draw map and snake
        let map_squares = this.#mapView.drawMap();
        let snake_squares = this.#snakeView.drawSnake();

        // add drawn objects to stage
        this.#stage.addChild(map_squares);
        this.#stage.addChild(snake_squares);

        // display on stage
        this.#stage.update();
    }

    /**
     * starts the clock
    */
    startClock() {
        this.#clock = setInterval(function() {
            this.draw();
        }.bind(this), 33); // ~30fps 
    }
}

