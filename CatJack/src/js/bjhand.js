import Deck from './deck.js';


export default class BJHand {
    constructor(d, numCards) {
        this.cards = [];
        for (let i = 0; i < numCards; i++) {
			this.cards.push(d.deal());
		}

    }

    get handSize() { return this.cards.length; }


    hasAce() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].isAce) return true;
        }
        return false;
    }

    score() {
        let score = 0;
        for (let i = 0; i < this.cards.length; i++) {
            if (c.IsFaceCard)
            {
                score += 10;
            }
            else
            {
                score += c.Value;
            }
        }
        if (this.hasAce() && score <= 11)
        {
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