export default class Card {

    //Initialize private local variables
    #value
    #suit
    #img

    //Create constructor with two parameters
    constructor(value, suit, img) {
        this.#value = value;
        this.#suit = suit;
        this.#img = img;
    }

    //Getters and setters for value
    get value() { return this.#value; }
    //Validate input for setter
    set value(value) {
        if (value >= 1 && value <= 13) {
            this.#value = value;
        } else {
            throw new Error("Value must be between 1 and 13");
        }
    }

    //Getters and setters for suit
    get suit() { return this.#suit; }
    //Validate input for setter
    set suit(suit) {
        if (suit >= 1 && suit <= 4) {
            this.#suit = suit;
        } else {
            throw new Error("Suit must be between 1 and 4");
        }
    }

    //Getters and setter for img
    get img() { return this.#img; }
    set img(src) { return src;}

    //Get if the card is an Ace
    isAce() {
        if (value == 1) {
            return true;
        } else {
            return false;
        }
    }

    //Get if the card is a face card
    isFaceCard() {
        if (value >= 11 && value <= 13) {
            return true;
        } else {
            return false;
        }
    }


}