import { Player } from "../Model/Game/Player.js";

/**
 * @class Controller controls the game
 */
export class PlayerController {

    /** player name */
    #player;

    /** player score */
    #score;

    /**
     * constructor
     * @param name is the name of a player
     */
    constructor(name) {
        this.#player = new Player(name);
        this.displayInput();
        this.createDOMScore();
    }

    /**
     * @return player
     */
    getPlayer(){
        return this.#player;
    }

    /**
     * displays input player name
     */
    displayInput(){
        // input value
        let playerInput = document.getElementById("playerInput");
        let playerName = document.getElementById("playerName");

        // display input value as player name
        playerName.innerHTML = "Player: " + playerInput.value;
        playerInput.addEventListener("input", ()=>{
            playerName.innerHTML = "Player: " + playerInput.value;
        });
    };

    /**
     * updates the score of a player
     */
    updateScore(change){
        this.#player.setScore(change);
        // changes in DOM
        let playerInformation = document.getElementById("playerInformation");
        playerInformation.children[2].innerHTML = "Score: " + this.#player.getScore().toString();
        console.log(playerInformation.children[2].innerHTML);
    }

    /**
     * create live-highscore with DOM-Manipulation
     */
    createDOMScore(){

        let playerInformation = document.getElementById("playerInformation");

        // score icon
        let img = new Image();
        img.setAttribute('id', 'scoreImg');
        playerInformation.appendChild(img);

        // live-highscore
        this.#score = document.createElement("span");
        this.#score.setAttribute('id', 'score');
        this.#score.innerHTML = "Score: " + this.#player.getScore().toString();
        playerInformation.appendChild(this.#score);
    }

}




