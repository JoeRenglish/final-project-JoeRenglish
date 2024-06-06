import Deck from './deck.js';


export default class BJHand {
    constructor(d, numCards) {
        this.cards = [];
        for (let i = 0; i < numCards; i++) {
			this.cards.push(d.deal());
		}

    }

    get handSize() { return this.cards.length; }
   

    addCard(d) {
        this.cards.push(d.deal());
    }

    getCard(i) {
        return this.cards[i];
    }

    hasAce() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].isAce()) return true;
        }
        return false;
    }

    score() {
        let score = 0;
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].isFaceCard()) {
                score += 10;
            } else {
                score += this.cards[i].value;
            }
        }
        if (this.hasAce() && score <= 11) {
            score += 10;
        }

        return score;
    }

    isBusted() {
        if (this.score() > 21) {
            return true;
        } else {
            return false;
        }
    }
}