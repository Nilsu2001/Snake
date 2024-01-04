import {Segment} from "./Segment.js";

/**
 * Manages a list of snake segments and provides methods
 * to initialize, grow or shrink the snake.
 * @class
 */
export class Snake {

    /** Array to represent the snake's body (snake head at index 0) */
    #segmentList;

    /**
     * Constructor instantiating and setting up a new snake.
     */
    constructor() {
        this.#segmentList = new Array(1);
        this.setup();
    }

    /**
     * Setup method that creates the initial body of the snake.
     */
    setup() {
        // Snake starts facing right
        this.#segmentList[0] = (new Segment(5, 3));
        this.#segmentList.push(new Segment(4, 3));
        this.#segmentList.push(new Segment(3, 3));
        this.#segmentList[0].setSegmentBodyAlignment("../Images/segments/head4.png");
        this.#segmentList[1].setSegmentBodyAlignment("../Images/segments/body2.png");
        this.#segmentList[2].setSegmentBodyAlignment("../Images/segments/end2.png");
    }

    /**
     * grows the snake
     * @param change
     */
    grow(change) {
        // adds new Segment
        // will be displayed when the snake moves the next time
        for (let i = 0; i < change; i++) {
            this.#segmentList.push(new Segment(-1, -1));
        }
    }

    /**
     * skrinks the snake
     * @param change
     */
    shrink(change) {
        //deletes the last segment of the snake
        for (let i = 0; i > change; i--) {
            this.#segmentList.pop();
        }
    }

    /**
     * get list of snake segments
     * @return list of segments
     */
    getList() {
        return this.#segmentList;
    }

    /**
     * get snake segment index
     * @return index
     */
    getSegmentAt(index) {
        return this.#segmentList[index];
    }

    /**
     * get last index of the list of snake segments
     * @return index
     */
    getLastIndex(){
        return (this.#segmentList.length - 1);
    }

    /**
     * kills the snake by setting its  length to 0
     */
    killSnake() {
        this.#segmentList.length = 0;
    }
}