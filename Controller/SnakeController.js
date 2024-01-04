import {Segment} from "../Model/Snake/Segment.js";

/**
 * @class Controller for the snake
 */
export class SnakeController {

    /** controller for the snake */
    #controller;

    /** snake attributes */
    #snake;
    #direction;

    // flag if the direction got changed
    // resets ever move of the snake
    #changedDirection;

    /**
     * constructor
     * @param snake is the snake
     * @param controllerParent is the main controller
     */
    constructor(snake, controllerParent) {
        this.#snake = snake;
        this.#controller = controllerParent;
        this.#direction = [1, 0];
        this.#changedDirection = false;
    }

    /**
     * changes the direction the snake is facing
     * @param newDirection is the new direction of the snake
     */
    changeDirection(newDirection) {

        // If the snake head is still in a tunnel,
        // abort movement (other snake segments inside a tunnel shouldn't prevent the snake from turning)
        if(this.#controller.getMapController().isTunnel(this.#snake.getList()[0].x, this.#snake.getList()[0].y)) {
            return; 
        }
        
        if (!this.#changedDirection && this.checkDirection(newDirection)) {
            this.#direction = newDirection;
            this.#changedDirection = true;
        }
    }

    /**checks if the new input of the snake-direction is valid
     * @param newDirection is the new direction of the snake
     * @returns {boolean}
     */
    checkDirection(newDirection) {
        return newDirection[0] !== this.#direction[0] * -1;
    }

    /** changes the length of the Snake
     * @param change
     * positiv change grows the snake
     * negative change shrinks the snake
     */
    updateLength(change) {

        if (change > 0)
            this.#snake.grow(change);
        else
            this.#snake.shrink(change);
    }

    /**
     * checks if the snake hit itself
     */
    checkSnakeSelf() {
        for (let i = 1; i < this.#snake.getList().length; i++) {
            if (this.#snake.getList()[0].x === this.#snake.getList()[i].x
                && this.#snake.getList()[0].y === this.#snake.getList()[i].y) {

                // Snake definitely overlaps itself.
                // If the snake is on a tunnel square, it should "pass over" that tunnel instead
                // (i.e. ignore the overlapping segment).
                if(!this.#controller.getMapController().isTunnel(this.#snake.getList()[0].x, this.#snake.getList()[0].y))
                    this.#snake.killSnake();
            }
        }
    }

    /**
     * @param  x
     * @param  y
     * @return true if a Segment of the Snake is at Position x,y
     */
    isOnSnake(x, y) {
        for (let i = 0; i < this.#snake.getList().length; i++) {
            if (this.#snake.getList()[i].x === x &&
                this.#snake.getList()[i].y === y) {
                return true;
            }
        }
        return false;
    }

    /**
     * moves the snake in the direction it's facing
     */
    move() {
        // snake dies if it has less than 3 segments
        if(this.#snake.getList().length < 3) {
            this.killSnake();
        }
        //moves the snake forward
        this.cascadeSegmentAndSetCoordinates();
        //updates the bodyPart of each Segment after moving forward
        this.cascadeSegmentAndSetAlignments();
        //to check if the snake bit itself
        this.checkSnakeSelf();

        // calls react of the new Square the head is on
        this.#controller.getMapController().react(this.#snake.getList()[0].x,
                                                  this.#snake.getList()[0].y);

        //resets flag
        this.#changedDirection = false;
    }

    /**
     * kills the snake
     */
    killSnake() {
        this.#snake.killSnake();
        this.#controller.gameOver();
    }
    /**
     * makes the Snake move forward by cascading the Coordinates of the Segments
     */
    cascadeSegmentAndSetCoordinates() {
        let temp = new Array(this.#snake.getList().length);
        for (let i = 0; i < temp.length; i++) {
            temp[i] = new Segment(this.#snake.getList()[i].x, this.#snake.getList()[i].y);
        }

        this.#snake.getList()[0].set(this.#snake.getList()[0].x + this.#direction[0], this.#snake.getList()[0].y + this.#direction[1]);
        for (let i = 0; i < temp.length - 1; i++) {
            this.#snake.getList()[i + 1].set(temp[i].x, temp[i].y);
        }
    }

    cascadeSegmentAndSetAlignments() {
        //set HeadImage
        this.setHeadAlignment();
        //cascade body alignment from segments
        if(this.#snake.getList().length > 3) {
            for(let i = this.#snake.getLastIndex()-1; i > 1; i--) {
                this.#snake.getList()[i].setSegmentBodyAlignment(this.#snake.getList()[i-1].getSegmentBodyAlignment());
            }
        }
        //set the form of the first body part after the snake head
        this.setBodyAlignment();
        //set the form of the snake tail
        this.setTailAlignment();
    }

    setHeadAlignment() {
        /** head direction */
        //head faces up
        if(this.#direction[1] === -1) {
            this.#snake.getList()[0].setSegmentBodyAlignment("headUp");
        } else
        //head faces left
        if(this.#direction[0] === -1) {
            this.#snake.getList()[0].setSegmentBodyAlignment("headLeft");
        } else
        //head faces down
        if(this.#direction[1] === 1) {
            this.#snake.getList()[0].setSegmentBodyAlignment("headDown");
        } else
        //head faces right
        if(this.#direction[0] === 1) {
            this.#snake.getList()[0].setSegmentBodyAlignment("headRight");
        }
    }//end drawHeadOfSnake

    setBodyAlignment() {
        /** Calculation for first body part
         * Using the coordinates of the Head and the second body part
         * to determine the alignment needed for accurate display
         */
        let headSegmentLocation = [(this.#snake.getList()[0].x - this.#snake.getList()[1].x),
                                    (this.#snake.getList()[0].y - this.#snake.getList()[1].y)];
        let secondSegmentLocation = [(this.#snake.getList()[2].x - this.#snake.getList()[1].x),
                                    (this.#snake.getList()[2].y - this.#snake.getList()[1].y)];

        /* calculates the resulting array, which will determine the fitting body-part-image */
        let firstSegmentLocation = [(headSegmentLocation[0] + secondSegmentLocation[0]),
                                    (headSegmentLocation[1] + secondSegmentLocation[1])];

        /** alignment of the first body part */
        //curve down-right
        if(firstSegmentLocation[0] === 1 && firstSegmentLocation[1] === 1) {
            this.#snake.getList()[1].setSegmentBodyAlignment("curveDownRight");
        } else
        //curve up-right
        if(firstSegmentLocation[0] === 1 && firstSegmentLocation[1] === -1) {
            this.#snake.getList()[1].setSegmentBodyAlignment("curveUpRight");
        } else
        //curve down-left
        if(firstSegmentLocation[0] === -1 && firstSegmentLocation[1] === 1) {
            this.#snake.getList()[1].setSegmentBodyAlignment("curveDownLeft");
        } else
        //curve up-left
        if(firstSegmentLocation[0] === -1 && firstSegmentLocation[1] === -1) {
            this.#snake.getList()[1].setSegmentBodyAlignment("curveUpLeft");
        } else
        //straight body-parts
        if(firstSegmentLocation[0] === 0 && firstSegmentLocation[1] === 0) {
            if(headSegmentLocation[0] === 0) {
                //up-down
                this.#snake.getList()[1].setSegmentBodyAlignment("straightUpDown");
            } else {
                //left-right
                this.#snake.getList()[1].setSegmentBodyAlignment("straightLeftRight");
            }
        }
    }//end drawFirstBodyPartOfSnake

    /** setLinkToTailImage*/
    setTailAlignment() {
        /** calculates the direction the tail has to point*/
        let lastSegment = [(this.#snake.getSegmentAt(this.#snake.getLastIndex()).x - this.#snake.getSegmentAt(this.#snake.getLastIndex() - 1).x),
                            (this.#snake.getSegmentAt(this.#snake.getLastIndex()).y - this.#snake.getSegmentAt(this.#snake.getLastIndex() - 1).y)];
        //tail points down
        if(lastSegment[1] === -1) {
            this.#snake.getList()[this.#snake.getLastIndex()].setSegmentBodyAlignment("tailDown");
        } else
        //tail points left
        if(lastSegment[0] === -1) {
            this.#snake.getList()[this.#snake.getLastIndex()].setSegmentBodyAlignment("tailLeft");
        } else
        //tail points up
        if(lastSegment[1] === 1) {
            this.#snake.getList()[this.#snake.getLastIndex()].setSegmentBodyAlignment("tailUp");
        } else
        //tail points right
        if(lastSegment[0] === 1) {
            this.#snake.getList()[this.#snake.getLastIndex()].setSegmentBodyAlignment("tailRight");
        }
    }//end drawTailOfSnake
}//end class