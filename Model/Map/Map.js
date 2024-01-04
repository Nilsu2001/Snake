import {Grass} from "./Grass.js";

/**
 * Manages a rectangular area of objects of type {@link Square} 
 * using a variable size in each dimension. Each square can be an instance
 * of any sub class of {@link Square}.
 * @class
 */
export class Map {

    /** 2D Square array */
    #squares;
    /** Horizontal size of the map in pixels */
    #sizeX;
    /** Vertical size of the map in pixels */
    #sizeY;

    /**
     * Constructor instantiating a new map and filling it
     * with squares afterwards.
     * @param sizeX Horizontal map size
     * @param sizeY Vertical map size
     */
    constructor(sizeX, sizeY) { 
        this.#sizeX = sizeX;
        this.#sizeY = sizeY;
        this.#squares = new Array(sizeX);

        // creating 2D array (new array at each array index)
        for (let i = 0; i < this.#squares.length; i++) {
            this.#squares[i] = new Array(this.#sizeY);
        }

        // filling 2D Array with Grass (= standard squares)
        for (let x = 0; x < this.#squares.length; x++) {
            for (let y = 0; y < this.#squares[0].length; y++) {
                this.#squares[x][y] = new Grass();
            }
        }
    }

    /**
    * Calls the react function of the square located at (x,y)
    * and sets the square to its return value.
    * @param x X coordinate
    * @param y Y coordinate
    */
    react(x, y) {
        if(x >= 0 && y >= 0) {
            this.setSquare(x, y, this.#squares[x][y].react());
        }
    }

    /**
    * Sets the square at (x,y) to a new square object.
    * @param x X coordinate
    * @param y Y coordinate
    * @param newSquare New square object
    */ 
    setSquare(x, y, newSquare) {
        if(x < this.#sizeX && y < this.#sizeY) {
            this.#squares[x][y] = newSquare;
        }
    }

    /**
    * @returns The map's 2D array
    */
    getSquares() {
        return this.#squares;
    }

    /**
    * @returns The horizontal size of the map
    */
    getSizeX() {
        return this.#sizeX;
    }

    /**
    * @returns The vertical size of the map
    */
    getSizeY() {
        return this.#sizeY;
    }

    /**
     * @param x X coordinate
     * @param y Y coordinate
     * @returns The square at (x,y)
     */
    getSquareAt(x, y) {
        return this.#squares[x][y];
    }
}



