'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let gameOver = false;

const displayMessage = msg => document.querySelector('.message').textContent = msg;
const setBackground = color => document.body.style.backgroundColor = color;
const setScore = val => document.querySelector('.score').textContent = val;
const disableInput = () => document.querySelector('.guess').disabled = true;
const enableInput = () => document.querySelector('.guess').disabled = false;
const triggerBalloon = () => document.querySelector('.balloon').classList.add('falling'); // Balloon animation

document.querySelector(".check").addEventListener('click', () => {
    if(gameOver) return;

    const guess = Number(document.querySelector('.guess').value);


    if(!guess) {
        displayMessage("No Number!");
    } else if(guess === secretNumber) {
        displayMessage("correct number");
        document.querySelector(".number").textContent = secretNumber;
        setBackground("#00f2ff");
        document.querySelector(".number").style.width = "30rem";
        if(score > highscore) {
            highscore =score;
            document.querySelector(".highscore").textContent = highscore;
        }
        gameOver = true;
        disableInput();
        triggerBalloon();

        //remove balloon
        setTimeout(() => {
            document.querySelector(".balloon").classList.remove("falling");

        }, 4000);
    } else {
        if(score > 1) {
            displayMessage(guess > secretNumber ? 'too high' : 'too low!');
            score--;
            setScore(score);
        } else {
            displayMessage('You lost the game!');
            setScore(0);
            gameOver = true;
            disableInput();
        }
    }
})

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) +1;
    gameOver = false;

    displayMessage('start guessing...');
    setScore(score);
    document.querySelectort('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    setBackground('#111');
    document.querySelector('.number').style.width = '15rem';
    enableInput();

    document.querySelector('.balloon').classList.remove('falling');
})