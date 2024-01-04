/**
 * @class MapView draws the map non the canvas
 */
export class MapView {

    /** snake attributes */
    #map;
    #squares;
    #squareWidth;

    /**
     * Constructor for the map
     * @param map is the map
     */
    constructor(map) {
        this.#map = map;
        this.#squares = this.#map.getSquares();
        // calculates the width of individual squares
        this.#squareWidth = document.getElementById("gameCanvas").width / this.#squares.length;
    }

    /**
     * draws all Squares of the Map
     * @return Squares of the map
     */
    drawMap(){

        // new shape for the squares on the map
        let mapSquares = new createjs.Shape();

        // graphic for powerUp
        let cookie = new Image();
        cookie.src = "../Images/cookie.svg";

        // graphic for powerDown
        let snowball = new Image();
        snowball.src = "../Images/snow.svg";

        // graphics for tunnel
        let tunnelStart = new Image();
        tunnelStart.src = "../Images/tunnel_start.png";

        let tunnelMiddle = new Image();
        tunnelMiddle.src = "../Images/tunnel_middle.png";

        let tunnelEnd = new Image();
        tunnelEnd.src = "../Images/tunnel_end.png";

        // draw squares for each field on the map
        for (let x = 0; x < this.#squares.length; x++) {
            for (let y = 0; y < this.#squares[0].length; y++) {

                // fill squares with graphics
                mapSquares.graphics.setStrokeStyle(1);

                switch(this.#squares[x][y].constructor.name){
                    case "Grass":
                        mapSquares.graphics.beginFill('transparent');
                        break;
                    case "PowerUp":
                        mapSquares.graphics.beginBitmapFill(cookie,'repeat');
                        break;
                    case "Obstacle":
                        mapSquares.graphics.beginFill('transparent');
                        break;
                    case "PowerDown":
                        mapSquares.graphics.beginBitmapFill(snowball,'repeat');
                        break;
                    case "Tunnel":

                        // tunnel piece to apply to this specific tile (start, middle or end)
                        let tnl = tunnelMiddle;
                        // 2D transformation matrix (used for optional rotation)
                        let mat = new createjs.Matrix2D();

                        // these will be used to check adjacent tiles. Based on tunnel alignment,
                        // we want to step in different directions (below and above for vertical tunnels, left and right
                        // for horizontal ones). See below.
                        let offsetX = 1;
                        let offsetY = 0;

                        // if there are tunnel squares above or below this tile, the tunnel is 
                        // vertically aligned, thus we should rotate the tile by 90 degrees.
                        if((y > 0 && this.#squares[x][y-1].constructor.name == "Tunnel") ||
                            (y < this.#map.getSizeY() && this.#squares[x][y+1].constructor.name == "Tunnel")) {
                                mat.rotate(90);
                                offsetX = 0;
                                offsetY = 1;
                            }

                        if(x - offsetX > 0 && y - offsetY > 0 && this.#squares[x - offsetX][y - offsetY].constructor.name != "Tunnel")
                            tnl = tunnelStart;
                        else if(x + offsetX < this.#map.getSizeX() && y + offsetY < this.#map.getSizeY() && this.#squares[x + offsetX][y + offsetY].constructor.name != "Tunnel")
                            tnl = tunnelEnd;

                        // draw bitmap. apply transformation matrix
                        mapSquares.graphics.beginBitmapFill(tnl, "repeat", mat);
                }

                // draw squares as rectangles
                mapSquares.graphics.drawRect(x * this.#squareWidth, y * this.#squareWidth,
                                             this.#squareWidth, this.#squareWidth);
            }
        }
        return mapSquares;
    }
} //end class