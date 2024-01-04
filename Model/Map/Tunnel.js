import {Square} from "./Square.js";

/**
 * Tunnel square type. Used for placing tunnels on the map.
 * A tunnel allows the snake to pass through it, while still allowing
 * the snake to cross over the tunnel, even if there are still snake segments in the tunnel.
 * @class
 * @extends {Square}
 */
export class Tunnel extends Square {

    constructor() { 
        super();
    }

    /**
     * Nothing happens on collision with a tunnel square.
     * */
    react() {
        return this;
    }
}