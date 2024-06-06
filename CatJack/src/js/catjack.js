import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';

import bootstrap from "bootstrap";
import Card from './card.js';
import Deck from './deck.js';
import BJHand from './bjhand.js';


console.log('General JS File');


const d = new Deck();

d.suffleDeck();


console.log(d);



