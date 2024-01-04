import {PowerUp} from "../Model/Map/PowerUp.js";
import {Grass} from "../Model/Map/Grass.js";
import {PowerDown} from "../Model/Map/PowerDown.js";
import {Obstacle} from "../Model/Map/Obstacle.js";
import {Tunnel} from "../Model/Map/Tunnel.js";

/**
 * @class Controller for the map
 */
export class MapController {

    /** map attributes */
    #map;
    #controller;

    /**
     * constructor
     * @param map is a map
     * @param controllerParent is the main controller
     */
    constructor(map, controllerParent) {
        this.#map = map;
        this.#controller = controllerParent;
    }

    /**
     * positions a new PowerUp randomly on the map
     */
    spawnPowerUpOnMap() {
        // Creates a new PowerUp at a random location 
        for(let d = 0; d < 100; d++){

            // calculate a new random position on the map
            let newPosX = Math.floor(Math.random() * this.#map.getSizeX());
            let newPosY = Math.floor(Math.random() * this.#map.getSizeY());

            // test if the potential Square is empty
            if(!this.#controller.getSnakeController().isOnSnake(newPosX, newPosY) && 
                this.isGrass(newPosX, newPosY)) {
                this.#map.setSquare(newPosX, newPosY, new PowerUp(this.#controller));
                return;
            }
        } 
    }


    /**
     * Randomly adds and removes PowerDowns
     */
    updatePowerDown() {

        // Removes some PowerDowns 
        let squares = this.#map.getSquares();
        for(let i = 0; i < squares.length; i++){
            for(let d = 0; d < squares[1].length; d++){
                // 50 % chance to remove certain PowerDown
                if(squares[i][d].constructor.name == 'PowerDown' && Math.random() < 0.5){
                    this.#map.setSquare(i, d, new Grass());
                }
            }
        }

        // 50 % chance to add new PowerDown
        if(Math.random() < 0.5){
            this.spawnPowerDownOnMap()
        }   

    }

    /**
     * positions a PowerDown randomly on the map
     */
    spawnPowerDownOnMap() {
        for(let d = 0; d < 100; d++){

            // calculate a new random position on the map
            let newPosX = Math.floor(Math.random() * this.#map.getSizeX());
            let newPosY = Math.floor(Math.random() * this.#map.getSizeY());

            if(!this.#controller.getSnakeController().isOnSnake(newPosX, newPosY) && this.isGrass(newPosX, newPosY)) {
                this.#map.setSquare(newPosX, newPosY, new PowerDown(this.#controller));
                return;
            }
        }
    }

    /**
     * positions the tunnel on the map
     * @param startX
     * @param startY
     * @param endX
     * @param endY
     */
    spawnTunnel(startX, startY, endX, endY) {
        let horizontal;

        if(startX == endX) {
            horizontal = false;
        } else if(startY == endY) {
            horizontal = true;
        } else {
            throw new Error("Tunnel cannot be constructed diagonally!");
        }

        if(horizontal) {
            for(let x = 0; x < endX - startX + 1; x++) {
                this.#map.setSquare(startX + x, startY, new Tunnel());
            }
        } else {
            for(let y = 0; y < endY - startY + 1; y++) {
                this.#map.setSquare(startX, startY + y, new Tunnel());
            }
        }
    }

    /**
     * Spawns a randomly placed tunnel on the map.
     * Called when initializing the map.
     */
    placeRandomTunnelOnMap() {

        // whether the tunnel should be placed horizontally or vertically. 50% chance for each to happen
        let horizontal = Math.random() < 0.5;

        // length of the tunnel
        let length = this.random(3, 6);

        // the X or Y coordinate which will stay the same for both start and end point of the tunnel
        // (e.g. for horizontally placed tunnels this will be the Y coordinate).
        let axis = this.random(2, horizontal ? this.#map.getSizeY() - 2 : this.#map.getSizeX() - 2);

        // the X or Y coordinate of the entry point of the tunnel. 
        let entry = this.random(2, horizontal ? this.#map.getSizeX() - length - 3 : this.#map.getSizeY() - length - 3);
        // end point is just entry point + length
        let end = entry + length;

        if(horizontal) {
            for(let x = 0; x < length; x++) {
                this.#map.setSquare(entry + x, axis, new Tunnel());
            }
        } else {
            for(let y = 0; y < length; y++) {
                this.#map.setSquare(axis, entry + y, new Tunnel());
            }
        }

        console.log(horizontal);
        console.log('Entry: ' + entry + ', End: ' + end + ', Axis: ' + axis);
    }

    /**
     * sets the border of the map
     */
    setBorder() {
        for (let x = 0; x < this.#map.getSizeX(); x++) {
            for (let y = 0; y < this.#map.getSizeY(); y++) {
 
                if(x == 0 || y == 0 ||
                   x == this.#map.getSizeX() -1 || y == this.#map.getSizeY() -1){
                    this.#map.setSquare(x, y, new Obstacle(this.#controller.getSnakeController()));
                }
            }
        }
    }

    /**
     * Calls react() of the Square at Position x,y 
     */
    react(x, y) {
        this.#map.react(x, y);
    }

    /**
     * @return true if Square at Position x, y is a Square of Type Grass
     * @param x
     * @param y
    */
    isGrass(x, y) {
        return (this.#map.getSquareAt(x,y).constructor.name == 'Grass');
    }

    /**
     * @return true if Square at Position x, y is a Square of Type Tunnel
     * @param x
     * @param y
     */
    isTunnel(x, y) {
        return this.#map.getSquareAt(x, y).constructor.name == 'Tunnel';
    }

    /**
     * @param min Minimum value
     * @param max Maximum value 
     * @returns A random integer between min and max (including those values) 
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}




