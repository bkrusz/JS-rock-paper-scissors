let playerScore = 0;
let computerScore = 0;

const selectButtons = document.querySelectorAll('.input-button');

selectButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.id);
        game(button.id);
    });
});

const restartButton = document.querySelector('.replay');

restartButton.addEventListener('click', () => {
    displayReset();
});

function computerPlay() {
    var comChoiceNum = Math.floor(Math.random() * 3);
    var comChoice = "";
    // Rock = 0, Paper = 1, Scissors = 2
    switch(comChoiceNum) {
        case 0:
            comChoice = "Rock";
            break;
        case 1:
            comChoice = "Paper";
            break;
        case 2:
            comChoice = "Scissors";
    }
    return comChoice;
}

function playRound(playerChoice, comChoice) {
    playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1);
    result = "";
    if(playerChoice == comChoice) {
        result = `${playerChoice} and ${comChoice}. It's a tie!`;
    }
    if((playerChoice == 'Rock' && comChoice == 'Paper')
    || (playerChoice == 'Paper' && comChoice == 'Scissors')
    || (playerChoice == 'Scissors' && comChoice == 'Rock')) {
        result = `You lose! ${comChoice} beats ${playerChoice}.`;
    }
    if((playerChoice == 'Rock' && comChoice == 'Scissors')
    || (playerChoice == 'Paper' && comChoice == 'Rock')
    || (playerChoice == 'Scissors' && comChoice == 'Paper')) {
        result = `You win! ${playerChoice} beats ${comChoice}.`;
    }
    return result;
}

function displayManip(result) {
    document.getElementById("result").textContent = result;
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    if(playerScore === 5 || computerScore === 5) {
        disableButtons(true);
    }
}

function displayReset() {
    playerScore = 0;
    computerScore = 0;
    disableButtons(false);
    displayManip("");
}

function disableButtons(bool) {
    restartButton.classList.toggle('hide');
    document.getElementById("rock").disabled = bool;
    document.getElementById("paper").disabled = bool;
    document.getElementById("scissors").disabled = bool;
}

function game(playerChoice) {
    var score = [0, 0] // [player score, com score]
    comChoice = computerPlay();
    result = playRound(playerChoice, comChoice);
    if(result.search('lose') > -1) {
        computerScore++;
    }
    if(result.search('win') > -1) {
        playerScore++;
    }
    displayManip(result);
    console.log(result);
    console.log(`Player: ${score[0]}    Computer: ${score[1]}`);
}