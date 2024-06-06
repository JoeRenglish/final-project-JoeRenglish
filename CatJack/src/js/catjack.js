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
        this.cat = {
            url: "",
            description: "",
        }
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
        document.getElementById("playerScore").innerHTML = `<h2>${score}</h2>`;  
    }

    hit() {
        playerHand.addCard(d);
        this.showPlayerHand();
        console.log(playerHand);
    }

    newGame() {
        location.reload();
    }

    initializeDealer() {
        fetch('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_s3qkixv10ihe9LrPdR86AK1NZIVrIisl4oN0kB5kPecGIyXxCu2gztI9OxoCVR4K')
        .then (response => response.json())
        .then (data => {
            const url = data[0].url;
            
            const description = data[0].breeds[0].description;

            const html = `<img src="${url}" class="img-fluid mx-auto d-block" style="max-height: 25%"></img>`;
            document.getElementById("dealer").innerHTML = html;

            const html2 = `<p>"${description}"</p>`;
            document.getElementById("dealerFacts").innerHTML = html2;
            console.log(url);
            console.log(description);
            
        })
        .catch(error => {
            console.log("There was a problem getting info.")
        })
    ;
        
        
    }

}


window.onload = () => { 
    let g = new Game(); 
    g.showPlayerHand();
    g.showDealerHand();
    g.initializeDealer();
};





