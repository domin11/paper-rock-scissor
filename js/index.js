'use strict';
var output = document.getElementById('output');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var buttonNewGame = document.getElementById('newGame');

var playerScore = 0;
var computerScore = 0;
var maxRounds = 0;
var completeRounds =0;

//funkcja blokująca przyciski po ukończonej grze
var blockButtons = function(){
  buttonPaper.setAttribute('disabled', true);
  buttonRock.setAttribute('disabled', true);
  buttonScissors.setAttribute('disabled', true);
  buttonPaper.classList.remove('active');
  buttonRock.classList.remove('active')
  buttonScissors.classList.remove('active');
  buttonNewGame.classList.remove('hidden');
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
  document.getElementById('playerScore').innerHTML = playerScore;
  document.getElementById('computerScore').innerHTML = computerScore;
  document.getElementById('completeRounds').innerHTML = completeRounds;
};

//funkcje uruchamiane po klknięciu w przyciski
/*buttonRock.addEventListener('click', function () {
  playerMove('kamień');
});
buttonPaper.addEventListener('click', function() {
  playerMove('papier');
});
buttonScissors.addEventListener('click', function() {
  playerMove('nożyce');
});*/
var playerButtons= document.querySelectorAll('.player-move');
var playerButtonsLength = playerButtons.length;
for (var i = 0; i < playerButtonsLength; i++) {
    playerButtons[i].addEventListener('click', function() {
        playerMove(this.getAttribute('data-move'));
    });
};

buttonNewGame.addEventListener('click', function() {
  maxRounds = window.prompt('Podaj liczbę rund do rozegrania');

  playerScore = 0;
  computerScore = 0;
  completeRounds = 0;
  document.getElementById('maxRounds').innerHTML = maxRounds;
  scoreDestination();

  if (!maxRounds || isNaN(maxRounds) || maxRounds === ''){
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

//funkcja odpowiedzialna za wyswietlenia wyników
var displayResults = function(winner, playerMove, computerMove) {
  if (winner === 'none') {
		output.innerHTML = 'Remis! Wybrałeś '+ playerMove + ', komputer również wybrał ' + computerMove +'.'+'<br>';
  completeRounds++;
	}
  else if (winner === 'player') {
		output.innerHTML = 'Wygrałeś! Wybrałeś ' + playerMove + ', a komputer wybrał ' + computerMove +'.'+'<br>';
  playerScore++;
  completeRounds++;
  }
  else {
		output.innerHTML = 'Przegrałeś! Wybrałeś ' + playerMove + ', a komputer wybrał ' + computerMove +'.'+'<br>';
  computerScore++;
  completeRounds++;
  }
  scoreDestination();

  if (maxRounds == completeRounds && playerScore > computerScore) {
    output.insertAdjacentHTML('beforeend','<br> Koniec gry! Wygrałeś! Naciśnij przycisk "Nowa gra", aby zagrać ponownie. <br>');
    blockButtons ();
  }
  else if (maxRounds == completeRounds && playerScore < computerScore) {
    output.insertAdjacentHTML('beforeend','<br> Koniec gry! Przegrałeś! Naciśnij przycisk "Nowa gra", aby zagrać ponownie. <br>');
    blockButtons ();
  }
  else if (maxRounds == completeRounds && playerScore == computerScore) {
    output.insertAdjacentHTML('beforeend','<br> Koniec gry! Remis! Naciśnij przycisk "Nowa gra", aby zagrać ponownie. <br>');
    blockButtons ();
  }
};  
