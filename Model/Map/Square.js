/**
 * Square base class.
 * The map's array comprises instances of subclasses of this class.
 * Defines a react() method to implement custom behavior
 * for different square types.
 * @class
 */
 export class Square {

    /** Abstract square constructor */
    constructor() { 
        if (this.constructor == Square) {
            throw new Error("Abstract classes cannot be instantiated.");
        }
    }

    /**
    * Called when the snake's head moves onto this square.
    */
    react() {
        console.log("Abstract methods cannot be called.");
        return this;
    }
}