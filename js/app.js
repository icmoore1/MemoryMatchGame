const deck = document.querySelector('.deck');
const allCards = Array.from(document.querySelectorAll('.deck li'));
let toggledCards = [];
let moves = 0;
let clockOff = false;
let time = 0;
let clockID;
let matched = 0;

document.querySelector('.modal_cancel').addEventListener('click', () => {
	toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', replayGame);
document.querySelector('.fa-repeat').addEventListener('click', reloadPage);

deck.addEventListener('click', event => {  
	const clickTarget = event.target;
     if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)  && !clickTarget.classList.contains('match')) {
	// console.log(clickTarget);
	 toggleCard(clickTarget);
	 addToggleCard(clickTarget);
	     if (clockOff) {startClock(); clockOff = false;}
	     if (toggledCards.length ===2){
		 //  checkForMatch();
		    checkForMatch(clickTarget);
		     addMove();
		     checkScore();
	     }
     }
});
shuffleTheDeck();

function reloadPage(){
	location.reload();
}

function shuffleTheDeck(){
	//const allCards = Array.from(document.querySelectorAll('.deck li'));
	//console.log('All Cards', allCards);
	const shuffledCards = shuffle(allCards);
	  for (card of shuffledCards){
		deck.appendChild(card);
	  }
     }
     
function flipAllCards() {
	 for (card of allCards){		 
	//if (card.classList.toggle === 'open') {
	card.classList.toggle('open');
	card.classList.toggle('show');	 
	card.classList.toggle('match');
	//  }
  }
}	

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function toggleCard(clickTarget){
	console.log(clickTarget);
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');	
}

function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
}

function checkForMatch(){
	if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){		
		console.log('Matched');
		toggledCards[0].classList.toggle('match')
		toggledCards[1].classList.toggle('match')
		toggledCards = [];
		matched++;
		console.log(matched);
	} else {
	   setTimeout(() => {
		console.log('No Match');
		toggleCard(toggledCards[0]);
		toggleCard(toggledCards[1]);
		toggledCards = [];
	    }, 1000);
    }
      if (matched === 8) {
          gameOver();
      }
}	

function addMove() {
	moves++;
	const movesText = document.querySelector('.moves')
	movesText.innerHTML = moves;
}


function checkScore() {
	if (moves ===16 || moves===24){
		//alert("moves "+moves);
		removeStar();
	}
}

function removeStar() {
	const starList = document.querySelectorAll('.stars li');
	  for (star of starList) {
	if (star.style.display !== 'none') {	
	    star.style.display = 'none';
            break;	
	}		
     }
}

function startClock() {
	time = 0;
	clockId = setInterval(() => {
		time++;
		//console.log(time);
		displayTime(time)
	}, 1000);
}
startClock();

function stopClock() {
	clearInterval(clockId);
}

function displayTime(time) {
	const clock = document.querySelector('.clock');
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	if (seconds < 10) {
	clock.innerHTML = `${minutes}:0${seconds}`;		
	} else {
	clock.innerHTML = `${minutes}:${seconds}`;		
	}
	//console.log(time);
	//clock.innerHTML = time;
}

function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}

function writeModalStats() {
	const timeStat = document.querySelector('.modal_time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal_moves');
	const starsStat = document.querySelector('.modal_stars');
	const stars = getStars();
	
	timeStat.innerHTML =`Time = ${clockTime}`;
	movesStat.innerHTML =`Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount =0;
	for (star of stars) {
	      if (star.style.display !== 'none') {
		   starCount++;      
              }
       }
       console.log(starCount); 
       return starCount;
}

function replayGame() {
	resetGame();
	toggleModal();
}

function resetGame() {
    resetClock();	
    resetMoves();
    resetStars();
    shuffleTheDeck();
    flipAllCards() 
}


function resetClock() {
	//stopClock();
	clockOff = true;
	//alert("resetClock");
	time = 0;
	startClock();
	//displayTime();
}

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
	      star.style.display = 'inline';	
	}
}

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
	matched=0;
}

function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className='card';
	}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
