import '../css/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


import bootstrap from "bootstrap";
import Card from './card.js';
import Deck from './deck.js';
import BJHand from './bjhand.js';


console.log('General JS File');



const d = new Deck();
d.suffleDeck();
const playerHand = new BJHand(d, 2);
const computerHand = new BJHand(d, 2);
const downloadURL = "";



class Game {

    constructor() {
        try {
            this.scores = JSON.parse(localStorage["scores"]); //localStorate.getItem("scores")
        } 
        catch {
            this.scores = [ { playerWins: 0, computerWins: 0 } ];
        }
        
        console.log(this.scores);

        this.$hand = document.getElementById("playerHand");
        this.$hitButton = document.getElementById("hit");
        this.$stayButton = document.getElementById("stay");

        this.$startGame = document.getElementById("startGame");
       
        this.$startGame.addEventListener("click", this.newGame);
       
        this.stay = this.stay.bind(this);
        this.$stayButton.addEventListener("click", this.stay);

        this.hit = this.hit.bind(this);
        this.$hitButton.addEventListener("click", this.hit);

        this.showPlayerHand = this.showPlayerHand.bind(this);
        this.computerStay = false;


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

    dealerHit() {
        let score = computerHand.score();
        if (score < 17) {
            computerHand.addCard(d);
            score = computerHand.score();
            let bust = computerHand.isBusted();
            if (bust) {
                this.endGame();
            }
        } else {
         this.computerStay = true;    
        }
       

    }

    endGame() {
        let html = "";
        document.getElementById("computerHand").innerHTML = "";
        for(let i = 0; i < computerHand.handSize; i++) {
            let c = computerHand.getCard(i);
            html = `<img src="images/${c.img}" class="mx-auto float-right" style="max-width: 150px">`;
            document.getElementById("computerHand").innerHTML += html;
        }
        
        let playerBust = playerHand.isBusted();
        let computerBust = computerHand.isBusted();
        let playerScore = playerHand.score();
        let computerScore = computerHand.score();
        let playerWon = false;
        let computerWon = false;
       
        document.getElementById("computerScore").innerHTML = `<h2>Computer Final Score</h2><h2>${computerScore}</h2>`;
        
        if (!playerBust) {
            if (playerScore > computerScore) {
                playerWon = true;
                computerWon = false;
            } else if (playerScore == computerScore) {
                playerWon = false;
                computerWon = false;
            } else if (!computerBust) {
                computerWon = true;
                playerWon = false;
            } else {
                playerWon = true;
                computerWon = false;
            }
        } else {
            computerWon = true;
            playerWon = false;
        }
        
        if (playerWon) {
            this.scores[0].playerWins += 1;
        } else if (computerWon){
            this.scores[0].computerWins += 1;
        }

        document.getElementById("wins").innerHTML = `<h2>Total Computer Wins</h2><h2>${this.scores[0].computerWins}</h2><h2>Total Player Wins</h2><h2>${this.scores[0].playerWins}</h2>`;

        localStorage["scores"] = JSON.stringify(this.scores);
    }


    hit() {
        playerHand.addCard(d);
        this.showPlayerHand();
       
        this.dealerHit();
        this.showDealerHand();
        let bust = playerHand.isBusted();
        if (bust) {
            this.endGame();
        }
    }

    stay() {
        while(!this.computerStay) {
            this.dealerHit();
            if (this.computerStay) {
                this.endGame();
            }
        }
        this.endGame();
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

                const html = `<img src="${url}" class="img-fluid mx-auto d-block pt-2" style="max-height: 250px"></img>`;
                document.getElementById("dealer").innerHTML = html;

                const html2 = `<p>"${description}"</p>`;
                document.getElementById("dealerFacts").innerHTML = html2;
                
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






