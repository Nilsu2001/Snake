/**
 * Manages a player's name and score.
 * @class
 */
export class Player {

    /** Player name */
    #name;

    /** Live score */
    #score;

    /**
     * Constructor instantiating a player.
     * @param name Name of the player*/
    constructor(name) {
        this.#name = name;
        this.#score = 0;
    }

    /**
     * @returns This player's score
     */
    getScore() {
        return this.#score;
    }

    /**
     * Adds a given value onto this player's score
     * @param scoreIncrement The value to be added
     */
    setScore(scoreIncrement) {
        this.#score += scoreIncrement;
    }
}
