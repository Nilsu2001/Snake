/**
 * @class Segment represents the segments of the snake
 */
export class Segment {

    /** to store the form of this body segment */
    #bodyAlignment;

    /**
     * constructor for snake segments
     * @param x
     * @param y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * get coordinates
     * @param x
     * @param y
     */
    set(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * get coordinates
     */
    get(){
        return [this.x, this.y];
    }

    /**
     * sets body part form of the snake
     * @param newBodyAlignment
     */
    setSegmentBodyAlignment(newBodyAlignment) {
        this.#bodyAlignment = newBodyAlignment;
    }

    /**
     * gets body part form of the snake
     * @return body Alignment
     */
    getSegmentBodyAlignment() {
        return this.#bodyAlignment;
    }
    /**
     * displays coordinates as a String
     */
    toString(){
        return this.x + ", " +this.y;
    }
} //end class