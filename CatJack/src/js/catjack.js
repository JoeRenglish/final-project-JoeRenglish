import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';

import bootstrap from "bootstrap";
import Card from './card.js';
import Deck from './deck.js';
import BJHand from './bjhand.js';


console.log('General JS File');



const d = new Deck();
d.suffleDeck();
const playerHand = new BJHand(d, 2);
const computerHand = new BJHand(d, 2);




class Game {

    constructor() {
        this.$hand = document.getElementById("playerHand");
        this.$hitButton = document.getElementById("hit");

        this.$startGame = document.getElementById("startGame");
       
        this.$startGame.addEventListener("click", this.newGame);
       
        this.hit = this.hit.bind(this);
        this.$hitButton.addEventListener("click", this.hit);

        this.showPlayerHand = this.showPlayerHand.bind(this);


    }

    showDealerHand() {
        let html = "";
        document.getElementById("computerHand").innerHTML = "";
        document.getElementById("computerHand").innerHTML = `<img src="images/0.png" class="mx-auto float-right" style="max-width: 150px">`;
        for(let i = 1; i < computerHand.handSize; i++) {
            let c = computerHand.getCard(i);
            html = `<img src="images/${c.img}" class="mx-auto float-right" style="max-width: 150px">`;
            document.getElementById("computerHand").innerHTML += html;
        }
        let score = computerHand.score();
        document.getElementById("computerScore").innerHTML = `<h2>Current Hand Score: ${score}</h2>`;  
    }


    showPlayerHand() {
        let html = "";
        document.getElementById("playerHand").innerHTML = "";
        for(let i = 0; i < playerHand.handSize; i++) {
            let c = playerHand.getCard(i);
            html = `<img src="images/${c.img}" class="mx-auto float-right" style="max-width: 150px">`;
            document.getElementById("playerHand").innerHTML += html;
            console.log(html);
        }
        let score = playerHand.score();
        document.getElementById("playerScore").innerHTML = `<h2>Current Hand Score: ${score}</h2>`;  
    }

    hit() {
        playerHand.addCard(d);
        this.showPlayerHand();
        console.log(playerHand);
    }

    newGame() {
        location.reload();
    }

}


window.onload = () => { 
    let g = new Game(); 
    g.showPlayerHand();
    g.showDealerHand();
};





