/*
 * Create a list that holds all of your cards
 */
const types = ['fa fa-leaf', 'fa fa-cloud', 'fa fa-tree', 'fa fa-paw', 'fa fa-pagelines', 'fa fa-bug', 'fa fa-sun-o', 'fa fa-binoculars'];
const deckOfCards = document.querySelector('.deck');
const cards = document.getElementsByClassName('card');
const resetDeck = document.querySelector('.fa-repeat');
const starRating = document.getElementsByClassName('fa-star');
const closeModal = document.getElementsByClassName('close')[0];
const modalParent = document.getElementsByClassName('modal-parent')[0];
const playAgain = document.getElementById('playAgain')
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let movesFinal = document.getElementsByClassName('movesFinal')[0];
let timerFinal = document.getElementsByClassName('timerFinal')[0];
let allCards = [];
let clickedCards = [];
let newi = [];
let moves = 0;
let sec = 0;
let timer = 0;
let matched = 0;
let timerStarted = false;
	
newi = shuffle(doubled(types))

//this is the function to bring in the cardOfDecks
cardDistribute();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//reset event 
resetDeck.addEventListener('click',resetFunction);

//reset function, this function will reset all the functionalities, and will be able to play the game from scratch
function resetFunction(){
	location.reload();
}

//duplicate array function to have a pair of the card - not writing the element 2 times, instead running through the array, to recieve the second one
function doubled(arr) {
    let doub = [];
    for (let i = 0; i < arr.length; i++) {
        doub.push(arr[i], arr[i]);
    }
    return doub;
}

//this is the function which would prepare the card of decks, this will prepare the HTML, dynamically, when it comes to the  formation of list item
function cardDistribute(){
	let li = ''
	
	newi.forEach(function(card) {
		li += '<li class="card"><i class="'+card+'"></i></li>'
	});
	
	deckOfCards.innerHTML = li;

	for (let i = 0; i < cards.length; i++){
		cards[i].addEventListener('click', playCard);
	}
}

// this is what triggers the click event, when playing cards
function playCard(){
	
	if(!timerStarted) {
		startTimer();
		timerStarted = true;
	}
	
	allCards.push(this);

	if(clickedCards.length < 2) {
		this.classList.add('open', 'show', 'disabled');
		clickedCards.push(this);
	}
		
	if (clickedCards.length == 2){
		if (clickedCards[0].firstElementChild.getAttribute('class') == clickedCards[1].firstElementChild.getAttribute('class')){
			moves++;
			document.getElementsByClassName('moves')[0].innerText = moves;
			cardsMatched();
		}else{
			moves++;
			document.getElementsByClassName('moves')[0].innerText = moves;
			
			cardsNotMatched();
		}
	}
	
	if (allCards.length == 30){
		cardMoves();
	}
	
	if (allCards.length == 50){
		cardMoves();
	}
	
	closeModal.addEventListener('click', function(){
		document.getElementsByClassName('modal-parent')[0].style.display = 'none';
	})
	
	modalParent.addEventListener('click', function(){
		document.getElementsByClassName('modal-parent')[0].style.display = 'none';
	})
	
	playAgain.addEventListener('click', function(){
		resetFunction();
	});
}

//this function is actually, for removing star rating, on the basis, of the number of moves
function cardMoves(){
	if (allCards.length == 30){
		starRating[2] ? starRating[2].classList.remove('fa-star') :'';
	}
	if (allCards.length == 50){
		starRating[1] ? starRating[1].classList.remove('fa-star') : '';
	}
}

//the below function will trigger, had there been a matched card
function cardsMatched(){
	
	clickedCards[0].classList.add('match');
	clickedCards[1].classList.add('match');
    clickedCards[0].classList.remove('open', 'show');
	clickedCards[1].classList.remove('open', 'show');
	
	matched += 1;
	clickedCards = [];
	
	if (matched == 8){
		doneDeal();
	}
}

//the below function will trigger, had the cards have had been not matched.
function cardsNotMatched(){
	setTimeout(function() {
		clickedCards[0] ? clickedCards[0].classList.remove('open', 'show', 'disabled') : '';
		clickedCards[1] ? clickedCards[1].classList.remove('open', 'show', 'disabled') : '';
		clickedCards = [];
	}, (550));
}

//this is the function, to trigger, at the event of, matching all the cards.
function doneDeal(){
	movesFinal.innerText = moves;
	timerFinal.innerText = minutes.innerHTML + ' mins & ' + seconds.innerHTML + ' secs';
	
	window.clearTimeout(timer); 
	document.getElementsByClassName('modal-parent')[0].style.display = 'block';
}

// https://stackoverflow.com/questions/5517597/
function startTimer() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].removeEventListener('click', startTimer);
  }

  timer = setInterval( function(){
    seconds.innerHTML = pad(++sec % 60);
    minutes.innerHTML = pad(parseInt(sec / 60, 10));
  }, 1000);

}

function pad(val) { return val > 9 ? val : '0' + val; }