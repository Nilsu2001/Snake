import {SnakeController} from "./SnakeController.js";
import {MapController} from "./MapController.js";
import {PlayerController} from "./PlayerController.js";

/**
 * @class Controller manages all "sub-controllers" (Map, Snake, Game)
 */
export class MainController {

    /** controllers for each model class */
    #mapController;
    #snakeController;
    #playerController;

    /** attributes for snake movement */
    #clock;
    #moveInterval;

    /** constants for input vectors*/
    #UP = [0, -1];
    #DOWN = [0, 1];
    #RIGHT = [1, 0];
    #LEFT = [-1, 0];

    /**
     * constructor
     * @param map is a map
     * @param snake is a snake
     * @param playerName is the name of a player
     */
    constructor(map, snake, playerName) {
        document.addEventListener('keydown', (e) => {
            this.keyPressed(e.code);
        });

        this.#mapController = new MapController(map, this);
        this.#snakeController = new SnakeController(snake, this);
        this.#playerController = new PlayerController(playerName);

        // set map border
        this.#mapController.setBorder();

        // start snake movement with 200ms delay
        this.#moveInterval = 200;

    }

    // Sub-Controllers ---------

    /**
     * @return sub-controller for the map
     */
    getMapController() {
        return this.#mapController;
    }

    /**
     * @return sub-controller for the snake
     */
    getSnakeController() {
        return this.#snakeController;
    }

    /**
     * @return sub-controller for the player
     */
    getPlayerController() {
        return this.#playerController;
    }
    
    // Input Logic ----------

    /**
     * defines the input logic
     * @param keyCode
     */
    keyPressed(keyCode){
        let input = [0,0];

        switch(keyCode){
            case 'ArrowUp':
            case 'KeyW':
                input = this.#UP
                break;
            case 'ArrowDown':
            case 'KeyS':
                input = this.#DOWN
                break;
            case 'ArrowRight':
            case 'KeyD':
                input = this.#RIGHT
                break;
            case 'ArrowLeft':
            case 'KeyA':
                input = this.#LEFT
                break;
            default: return;
            }
        this.#snakeController.changeDirection(input);
    }

    // Clock ----------

    /**
     * increases the game speed
     * @param amount is the amount of speed
     */
    increaseGameSpeed(amount){
        this.#moveInterval -= amount;
        if(this.#moveInterval < 10) this.#moveInterval = 10;
        this.stopClock();
        this.startClock(this.#moveInterval);
    }


    /**
     * starts the clock
     * @param delay
     */
    startClock(delay) {
        this.#clock = setInterval(function() {
            this.#snakeController.move();
        }.bind(this), delay); 

    }

    /**
     * stops the clock
     */
    stopClock() {
        clearInterval(this.#clock);
    }

    /**
     * displays gameover screen as soon as the snake dies
     */
    gameOver() {
        // if the snake is killed
        this.stopClock();
        // display game over screen
        let gameOver = document.getElementById('gameOver');
        gameOver.style.visibility = 'visible';
        gameOver.style.opacity = "1";

        // display achieved highscore on game over screen
        let finalScore = document.getElementById('finalScore');
        let scoreText = this.getPlayerController().getPlayer().getScore();
        finalScore.innerHTML = "HIGHSCORE " + scoreText.toString();

        // hide player information above the canvas
        let playerInformation = document.getElementById('playerInformation');
        playerInformation.style.visibility = 'hidden';
    }
}