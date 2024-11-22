// 1. Game Variables
let playerName = '';
let totalScore = 0;
let turnScore = 0;
let rollCount = 0;
let gameActive = true;

// 2. DOM References
const playerDisplay = document.getElementById('player-display');
const totalPoints = document.getElementById('total-points');
const turnPoints = document.getElementById('turn-points');
const diceDisplay = document.getElementById('dice-display');
const feedback = document.getElementById('feedback');
const rollDiceButton = document.getElementById('roll-dice');
const resetButton = document.getElementById('reset-game');
const introSection = document.getElementById('info-intro');
const gamePlaySection = document.getElementById('game-play');
const playerForm = document.getElementById('player-form');

// 3. Event Listeners
playerForm.addEventListener('submit', handlePlayerName);
rollDiceButton.addEventListener('click', rollDice);
resetButton.addEventListener('click', resetGame);

// 4. Functions

function handlePlayerName(event) {
    event.preventDefault();
    const nameInput = document.getElementById('player-name').value.trim();
    if (nameInput) {
        playerName = nameInput;
        playerDisplay.textContent = playerName;
        updateFeedback(`Welcome, ${playerName}! Let's start the game! 👼 `);
        introSection.style.display = 'none';
        gamePlaySection.style.display = 'block';
    } else {
        updateFeedback('Please enter a valid player name to start the game.');
    }
}

function rollDice() {
    if (!gameActive) return;
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    diceDisplay.textContent = `🎲 ${diceRoll}`;
    rollCount++;
    if (diceRoll === 1) {
        turnScore = 0;
        updateFeedback('Oops! You rolled a 1. Turn over!');
    } else {
        turnScore += diceRoll;
        if (turnScore >= 100) {
            gameActive = false;
            updateFeedback(`🎉 Congratulations, ${playerName}! You won!`);
        } else {
            updateFeedback(`You rolled a ${diceRoll}. Turn score: ${turnScore}`);
        }
    }
    updateUI();
}

function resetGame() {
    playerName = '';
    totalScore = 0;
    turnScore = 0;
    rollCount = 0;
    gameActive = true;
    introSection.style.display = 'block';
    gamePlaySection.style.display = 'none';
    updateFeedback('Game reset. Enter a player name to start again.');
    updateUI();
}

function updateUI() {
    totalPoints.textContent = totalScore;
    turnPoints.textContent = turnScore;
    document.getElementById('total-rolls').textContent = rollCount;
}

function updateFeedback(message) {
    feedback.textContent = message;
}