'use strict';
var output = document.getElementById('output');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var buttonNewGame = document.getElementById('newGame');

var params = {
  playerScore : 0,
  computerScore : 0,
  maxRounds : 0,
  completeRounds : 0,
};

//funkcja blokująca przyciski po ukończonej grze
var blockButtons = function(){
  buttonPaper.setAttribute('disabled', true);
  buttonRock.setAttribute('disabled', true);
  buttonScissors.setAttribute('disabled', true);
  buttonPaper.classList.remove('active');
  buttonRock.classList.remove('active')
  buttonScissors.classList.remove('active');
};
//blokada przycisków gry
blockButtons ();

//fonkcja odblokowywująca przyciski
var activeButtons = function(){
   buttonPaper.removeAttribute('disabled');
   buttonRock.removeAttribute('disabled');
   buttonScissors.removeAttribute('disabled');
   buttonPaper.classList.add('active');
   buttonRock.classList.add('active')
   buttonScissors.classList.add('active');
   buttonNewGame.classList.add('hidden');
};

//funkcja wskazująca gdzie mają byc wyświetlane wyniki
var scoreDestination = function(){
  document.getElementById('playerScore').innerHTML = params.playerScore;
  document.getElementById('computerScore').innerHTML = params.computerScore;
  document.getElementById('completeRounds').innerHTML = params.completeRounds;
};

var playerButtons = document.querySelectorAll('.player-move');
var playerButtonsLength = playerButtons.length;
for (var i = 0; i < playerButtonsLength; i++) {
    playerButtons[i].addEventListener('click', function() {
        playerMove(this.getAttribute('data-move'));
    });
};

buttonNewGame.addEventListener('click', function() {
  params.maxRounds = window.prompt('Podaj liczbę rund do rozegrania');

  params.playerScore = 0;
  params.computerScore = 0;
  params.completeRounds = 0;
  document.getElementById('maxRounds').innerHTML = params.maxRounds;
  scoreDestination();

  if (!params.maxRounds || isNaN(params.maxRounds) || params.maxRounds === ''){
   output.innerHTML = 'Podaj ilość rund!';
   blockButtons();
  }
  else {
   output.innerHTML = 'Zaczynamy! Wybierz swój ruch!';
   activeButtons ();
  }
});


//funkcja przypisująca ruchy komputera
function getComputerMove() {
var choices = ['papier', 'kamień', 'nożyce'];
var compChoice = Math.floor(Math.random()*3);
return choices[compChoice];
};

//funkcja porównująca ruchy gracza i komputera
var playerMove = function(playerMove) {
  var computerMove = getComputerMove();
  var winner = 'player';
  if (computerMove === 'nożyce' && playerMove === 'papier' ||
      computerMove === 'kamień' && playerMove === 'nożyce' ||
      computerMove === 'papier' && playerMove === 'kamień') {
    winner = 'computer';
  }
  else if (computerMove === playerMove) {
    winner = 'none';
  }
  displayResults(winner, playerMove, computerMove);
};

//Modal
var showModal = function(selector) {
    document.querySelector('#'+selector).classList.add('show');
    buttonNewGame.classList.remove('hidden');
};

var hideModal = function(selector) {
    document.querySelector(selector).classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function(event) {
        hideModal('#' + event.currentTarget.className.split(' ')[1]);
    });
}

//funkcja odpowiedzialna za wyswietlenia wyników
var displayResults = function(winner, playerMove, computerMove) {
  if (winner === 'none') {
		output.innerHTML = 'Remis! Wybrałeś '+ playerMove + ', komputer również wybrał ' + computerMove +'.'+'<br>';
  params.completeRounds++;
	}
  else if (winner === 'player') {
		output.innerHTML = 'Wygrałeś! Wybrałeś ' + playerMove + ', a komputer wybrał ' + computerMove +'.'+'<br>';
  params.playerScore++;
  params.completeRounds++;
  }
  else {
		output.innerHTML = 'Przegrałeś! Wybrałeś ' + playerMove + ', a komputer wybrał ' + computerMove +'.'+'<br>';
  params.computerScore++;
  params.completeRounds++;
  }
  scoreDestination();

//Wynik końcowy
  if (params.maxRounds == params.completeRounds && params.playerScore > params.computerScore) {
    showModal('win');
    blockButtons ();
    }
  else if (params.maxRounds == params.completeRounds && params.playerScore < params.computerScore) {
    showModal('lost');
    blockButtons ();
    }
  else if (params.maxRounds == params.completeRounds && params.playerScore == params.computerScore) {
    showModal('draw');
    blockButtons ();
    }
};  
