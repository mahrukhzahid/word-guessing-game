// script.js
document.addEventListener('DOMContentLoaded', () => {
    const wordList = ['javascript', 'html', 'css', 'programming', 'hangman','pen','language','cow','battery'];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const wordDisplay = document.getElementById('word-display');
    const message = document.getElementById('message');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const wrongGuessesDisplay = document.getElementById('wrong-guesses');
    const remainingAttemptsDisplay = document.getElementById('remaining-attempts');

    let wrongGuesses = [];
    let correctGuesses = [];
    let remainingAttempts = 6;

    const updateWordDisplay = () => {
        wordDisplay.textContent = word.split('').map(letter => (correctGuesses.includes(letter) ? letter : '_')).join(' ');
    };

    const updateGameStatus = () => {
        wrongGuessesDisplay.textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
        remainingAttemptsDisplay.textContent = `Remaining attempts: ${remainingAttempts}`;

        if (remainingAttempts <= 0) {
            message.textContent = 'Game over! The word was: ' + word;
            guessInput.disabled = true;
            guessButton.disabled = true;
        } else if (!wordDisplay.textContent.includes('_')) {
            message.textContent = 'Congratulations! You guessed the word!';
            guessInput.disabled = true;
            guessButton.disabled = true;
        }
    };

    guessButton.addEventListener('click', () => {
        const guess = guessInput.value.toLowerCase();

        if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
            message.textContent = 'Please enter a valid letter.';
            return;
        }

        if (correctGuesses.includes(guess) || wrongGuesses.includes(guess)) {
            message.textContent = 'You already guessed that letter.';
            return;
        }

        if (word.includes(guess)) {
            correctGuesses.push(guess);
        } else {
            wrongGuesses.push(guess);
            remainingAttempts--;
        }

        guessInput.value = '';
        message.textContent = '';
        updateWordDisplay();
        updateGameStatus();
    });

    updateWordDisplay();
    updateGameStatus();
});
