//Declare variables/listeners
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

// Reloads page from event listener button press.
function reloadPage(){
	location.reload();
}

// Calls shuffle function and appends
function shuffleTheDeck(){
	const shuffledCards = shuffle(allCards);
	  for (card of shuffledCards){
		deck.appendChild(card);
	  }
     }

// Flips all cards     
function flipAllCards() {
	 for (card of allCards){
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

// toggles classList
function toggleCard(clickTarget){
	console.log(clickTarget);
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');	
}

// adds active card to toggledCards arraylist
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
}

// Checks for 2 matched cards, flips back over if no match
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

// Counts number of moves and updates visual counter
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves')
	movesText.innerHTML = moves;
}

// calls removeStar function if criteria is met
function checkScore() {
	if (moves ===16 || moves===24){
		//alert("moves "+moves);
		removeStar();
	}
}

// Removes 1 star
function removeStar() {
	const starList = document.querySelectorAll('.stars li');
	  for (star of starList) {
	if (star.style.display !== 'none') {	
	    star.style.display = 'none';
            break;	
	}		
     }
}

// Starts and displays the timer
function startClock() {
	time = 0;
	clockId = setInterval(() => {
		time++;
		//console.log(time);
		displayTime(time)
	}, 1000);
}
startClock();

// Stops the timer
function stopClock() {
	clearInterval(clockId);
}

// Converts and displays time in minutes:seconds.
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

// Toggles the 'Game Over' modal
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}

// Gets modal stats and writes to Modal
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

// Counts the stars
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount =0;
	for (star of stars) {
	      if (star.style.display !== 'none') {
		   starCount++;      
              }
       }
     //  console.log(starCount); 
       return starCount;
}

// Replay game from button within Modal
function replayGame() {
	resetGame();
	toggleModal();
}

// Resets game stats.
function resetGame() {
    resetClock();	
    resetMoves();
    resetStars();
    shuffleTheDeck();
    flipAllCards() 
}

// Resets the timer
function resetClock() {
	//stopClock();
	clockOff = true;
	//alert("resetClock");
	time = 0;
	startClock();
	//displayTime();
}

// Resets number of moves
function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

// Resets number of stars to 3
function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
	      star.style.display = 'inline';	
	}
}

// Game over- stops timer, counts stats and displays modal
function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
	matched=0;
}

/*
// Resets all cards
function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className='card';
	}
}
*/
