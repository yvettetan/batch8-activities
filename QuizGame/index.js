//elements
const scoreLabel = document.querySelector('#score');
const container = document.querySelector('#container');
const currentQuestion = document.querySelector('#question');
const choicesContainer = document.querySelectorAll('.box');
const correct = document.querySelector('.fa-check');
const wrong = document.querySelector('.fa-times');

//variables

const questions = [
    {
        question: "Who is the only actor to receive an Oscar nomination for acting in a Lord of the Rings movie?",
        choices: ['Viggo Mortensen', 'Andy Serkis', 'Ian McKellen', 'Orlando Bloom'],
        answer: 'Ian McKellen'
    },
    {
        question: "For what movie did Steven Spielberg win his first Oscar for Best Director?",
        choices: ['E.T.', 'Schindler’s List', 'Saving Private Ryan', 'Jurassic Park'],
        answer: 'Schindler’s List'
    },
    {
        question: "George Lucas took a half-million dollar pay cut for 40% of merchandising rights of what film?",
        choices: ['Star Wars', 'Transformers', 'Harry Potter', 'Indiana Jones'],
        answer: 'Star Wars'
    },
    {
        question: "What is the highest-grossing Harry Potter film?",
        choices: ['Prisoner of Azkaban', "Sorcerer's Stone", 'Deathly Hallows 1', 'Deathly Hallows 2'],
        answer: 'Deathly Hallows 2'
    },
    {
        question: "When was the first Studio Ghibli movie released?",
        choices: ['1981', '1986', '1979', '1975'],
        answer: '1986'
    }
]

let choice1 = document.querySelector('.choice1');
let choice2 = document.querySelector('.choice2');
let choice3 = document.querySelector('.choice3');
let choice4 = document.querySelector('.choice4');

let score = 0;
let streak = 0;

let consecutiveWins = [];

// functions

function startQuiz() {
    randQuestion();
    //generate a random number
    function randQuestion() {
        let index = Math.floor(Math.random() * questions.length);
        //displays the random question
        currentQuestion.textContent = questions[index].question;
        //displays the choices based on the random question
        const choicesArr = questions[index].choices;
        choice1.textContent = choicesArr[0];
        choice2.textContent = choicesArr[1];
        choice3.textContent = choicesArr[2];
        choice4.textContent = choicesArr[3];

        //creates an event listener for each choice
        for (let choice of choicesContainer) {
            choice.addEventListener('click', checkAnswer);
        };
        //checks if chosen answer is correct or wrong
        function checkAnswer(e) {
            //gets the div container
            let answerContainer = e.target;
            let answer = answerContainer.textContent;
            //if chosen answer is correct, add 1 to score, show check
            if (answer === questions[index].answer) {
                isCorrect();
                addScore();
                answerContainer.style.backgroundColor = 'var(--correctColor)';
                answered();
            } else {
                answerContainer.classList.toggle('wrong');
                isWrong();
                answerContainer.style.backgroundColor = 'var(--wrongColor)';
                answered();
            }

            function answered() {
                for (let choice of choicesContainer) {
                    choice.removeEventListener('click', checkAnswer);
                };
            }
        }
    }
    function isCorrect() {
        correct.style.display = 'block';
        wrong.style.display = 'none';
    }
    function isWrong() {
        wrong.style.display = 'block';
        correct.style.display = 'none';
        consecutiveWins = [];
    }
    function addScore() {
        score++;
        scoreLabel.textContent = " " + score;
        consecutiveWins.push(score);
    }
    isConsecutiveWin();
}

function isConsecutiveWin() {
    if (consecutiveWins.length > 0 && consecutiveWins.length % 5 === 0) {
        alert(`Congratulations! You scored ${consecutiveWins.length} in a row!`);
    };
}


const nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', () => {
    startQuiz();
    for (let choice of choicesContainer) {
        choice.style.backgroundColor = 'white';
    };
    correct.style.display = 'none';
    wrong.style.display = 'none';
})

//exits the game
const exitBtn = document.querySelector('#exit');
exitBtn.addEventListener('click', () => {
    //create elements
    const endContainer = document.createElement('div');
    const endMessage = document.createElement('p');
    const endScore = document.createElement('p');
    const reset = document.createElement('button');
    //add class for styling
    endContainer.className = 'endContainer';
    endMessage.className = 'endMessage';
    endScore.className = 'endScore';
    reset.className = 'reset';
    //add text content of elements
    endMessage.textContent = 'Thank you for playing the game!';
    endScore.textContent = `Your final score is ${score}.`;
    reset.textContent = 'PLAY AGAIN';
    //display elements
    endContainer.appendChild(endMessage);
    endContainer.appendChild(endScore);
    endContainer.appendChild(reset);
    container.appendChild(endContainer);
    document.body.style.backgroundColor = 'rgb(152, 152, 152)';
    //disable next and exit buttons
    nextBtn.disabled = true;
    exitBtn.disabled = true;

    //reset the game
    reset.addEventListener('click', () => {
        exitBtn.disabled = false;
        nextBtn.disabled = false;
        endContainer.style.display = 'none';
        document.body.style.backgroundColor = 'var(--backgroundColor';
        score = 0;
        scoreLabel.textContent = 0;
        wrong.style.display = 'none';
        correct.style.display = 'none';
        consecutiveWins = [];
        for (let choice of choicesContainer) {
            choice.style.backgroundColor = 'white';
        };
        startQuiz();
    });
});

startQuiz(); 