import Card from './card.js';

export default class Deck {
    

    constructor() {
       
        this.cards = [];
        let i = 0;
        for (let value = 1; value <= 13; value++) {
            for (let suit = 1; suit <= 4; suit++) {
               
                i++;
                this.cards.push(new Card(value, suit, `${i}.png`))

            }
        }
    }

    get deckSize() { return this.cards.length }
    get isEmpty() { if (this.deckSize == 0) return true; }


    random(min, max) {  
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    suffleDeck() {
        for (let i = 0; i < this.deckSize; i++) {
            let j = this.random(0, this.deckSize-1);
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = this.cards[temp];
        }
    }

    deal() {

        if (!this.isEmpty) {
            // get a refernce to the first card
            const c = this.cards[0];
            // remove the card from the list
            this.cards.shift();
            // return the first card
            return c;
        }
    }
}


