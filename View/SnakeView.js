/**
 * @class SnakeView draws the snake on the canvas
 */
export class SnakeView {

    /** snake attributes */
    #snake;
    #squares;
    #segments;
    #squareWidth;

    /**
     * Constructor for the snake
     * @param snake is the snake
     * @param map is the map
     */
    constructor(snake, map) {
        this.#snake = snake;
        this.#segments = this.#snake.getList();
        this.#squares = map.getSquares();
        // the width of each square on the map
        this.#squareWidth = document.getElementById("gameCanvas").width / this.#squares.length;
    }

    /**
     * draws the snake
     * @return segments of the snake
     */
    drawSnake() {
        // create new shape
        let snakeSquares = new createjs.Shape();

        // draw squares for each segment of the snake
        for(let i = 0; i < this.#segments.length; i++) {
            // graphic for snake
            let snakePiece = new Image();
            snakePiece.src = this.setSnakeGraphic(this.#segments[i].getSegmentBodyAlignment());
            snakeSquares.graphics.beginBitmapFill(snakePiece,"repeat");

            // draw squares as rectangles
            snakeSquares.graphics.drawRect(this.#segments[i].x * this.#squareWidth,
                                           this.#segments[i].y * this.#squareWidth,
                                           this.#squareWidth, this.#squareWidth);
        }
        return snakeSquares;
    }

    /**
     * sets the graphic for each snake segment
     * based on the direction its moving
     * @param newSegmentBodyAlignment
     */
    setSnakeGraphic(newSegmentBodyAlignment) {
        switch(newSegmentBodyAlignment) {

            //cases for Snake head
            case "headUp": return "../Images/segments/head1.png";
            case "headLeft": return "../Images/segments/head2.png";
            case "headDown": return "../Images/segments/head3.png";
            case "headRight": return "../Images/segments/head4.png";

            //cases for curved snake body
            case "curveDownRight": return "../Images/segments/curve1.png";
            case "curveUpRight": return "../Images/segments/curve2.png";
            case "curveDownLeft": return "../Images/segments/curve3.png";
            case "curveUpLeft": return "../Images/segments/curve4.png";

            //cases for straight snake body
            case "straightUpDown": return "../Images/segments/body1.png";
            case "straightLeftRight": return "../Images/segments/body2.png";

            //cases for snake tail
            case "tailDown" : return "../Images/segments/end1.png";
            case "tailLeft" : return "../Images/segments/end2.png";
            case "tailUp" : return "../Images/segments/end3.png";
            case "tailRight" : return "../Images/segments/end4.png";
        }
    }//end setSnakeGraphic
}//end SnakeView