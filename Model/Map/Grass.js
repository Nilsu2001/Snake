import {Square} from "./Square.js";

/**
 * Grass square type. Used for a "normal" square on the map,
 * i.e. a square where nothing happens.
 * @class
 * @extends {Square}
 */
 export class Grass extends Square {

    constructor() { 
        super();
    }

    /**
    * Nothing happens on collision with a Grass square.
    * @override
    */
    react() {
        return this;
    }
}
