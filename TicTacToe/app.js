/*****ELEMENTS*****/
const turnIndicator = document.querySelector('#turnIndicator');
const cells = document.querySelectorAll('.cell');
const previousBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');
const resetBtn = document.querySelector('#resetBtn');
const modalContainer = document.querySelector('.modal-bg');
const modalHeader = document.querySelector('#modal-header');
const modalText = document.querySelector('#modal-text');
const newGameBtn = document.querySelector('#newBtn');
const gameHistoryBtn = document.querySelector('#historyBtn');

/*****VARIABLES*****/
let xTurn = true;
let occupiedCells = 0;
let boardArray = [];
let previousMoveArray = [];

/*****EVENT LISTENERS*****/
//add event listener for each cell
for (let cell of cells) {
    cell.addEventListener('click', play);
    cell.addEventListener('mouseenter', hover);
    cell.addEventListener('mousedown', (e) => {
        e.target.textContent = '';
    })
    cell.addEventListener('mouseout', (e) => {
        e.target.textContent = '';
    });
}
//modal buttons
newGameBtn.addEventListener('click', reset);

gameHistoryBtn.addEventListener('click', () => {
    previousBtn.style.visibility = 'visible';
    modalContainer.style.display = 'none';
});

//previous button
previousBtn.addEventListener('click', () => {
    nextBtn.style.visibility = 'visible';
    if (boardArray.length != 0) {
        let lastMove = boardArray[boardArray.length - 1]; //move object
        let targetCell = cells[parseInt(lastMove.cell)];
        targetCell.classList.remove(targetCell.classList[2]);
        previousMoveArray.push(lastMove);
        boardArray.pop();
        console.log(lastMove);
    } else {
        previousBtn.style.visibility = 'hidden';
    }
});

//next button
nextBtn.addEventListener('click', () => {
    previousBtn.style.visibility = 'visible';
    if (previousMoveArray.length != 0) {
        let lastMove = previousMoveArray[previousMoveArray.length - 1]; //moveObject
        let targetCell = cells[parseInt(lastMove.cell)];
        let lastPlayer = lastMove.player;
        targetCell.classList.add(lastPlayer);
        boardArray.push(lastMove);
        previousMoveArray.pop();
        console.log(lastMove);
    } else {
        nextBtn.style.visibility = 'hidden';
        previousBtn.style.visibility = 'visible';
    }
})

//reset button
resetBtn.addEventListener('click', reset);

/*****FUNCTIONS*****/

function play(e) {
    //know wich cell was clicked
    const target = e.target;
    //check list of classes
    const classList = target.classList;
    //select second class as identifier of cell location
    const cell = classList[1];
    //add class to cell if xturn or not
    const player = classList[2];
    target.removeEventListener('mouseenter', hover);
    //if class already contains x or o
    if (player === 'X' || player === 'O') {
        return;
    }
    // if x's turn
    else if (xTurn) {
        //display x in cell
        classList.add('X');
        saveMove(cell, 'X');
        //change turn indicator to o's turn
        updatePlayer('O');
        //x turn ends
        xTurn = !xTurn;
        occupiedCells++;
        //if o's turn
    } else {
        //display o in cell
        classList.add('O');
        saveMove(cell, 'O');
        updatePlayer('X');
        //back to x turn
        xTurn = !xTurn;
        occupiedCells++;
    }
    //check if any player has won the game
    isWinner();
}

//stores each move in move object
function saveMove(cell, player) {
    let moveObject = {};
    moveObject.cell = cell;
    moveObject.player = player;
    //add move to board
    boardArray.push(moveObject);
}

//changes turn indicator to player's turn
function updatePlayer(player) {
    turnIndicator.textContent = `${player}'s Turn`;
}

//check if a player has won
function isWinner() {
    //store player if x or o or undefined
    const cell0 = cells[0].classList[2];
    const cell1 = cells[1].classList[2];
    const cell2 = cells[2].classList[2];
    const cell3 = cells[3].classList[2];
    const cell4 = cells[4].classList[2];
    const cell5 = cells[5].classList[2];
    const cell6 = cells[6].classList[2];
    const cell7 = cells[7].classList[2];
    const cell8 = cells[8].classList[2];

    const winningConditions = [
        //all three cells in any row are the same
        [cell0, cell1, cell2],
        [cell3, cell4, cell5],
        [cell6, cell7, cell8],
        //all three cells in any column are the same
        [cell0, cell3, cell6],
        [cell1, cell4, cell7],
        [cell2, cell5, cell8],
        //all three cells diagonally are the same
        [cell0, cell4, cell8],
        [cell2, cell4, cell6]
    ];

    //check if any winning condition is fulfilled
    winningConditions.some((cell) => {
        if (cell[0] && cell[0] === cell[1] && cell[0] === cell[2]) {
            turnIndicator.textContent = `${cell[0]} has won!`;
            modalHeader.textContent = 'CONGRATULATIONS!';
            modalText.textContent = `${cell[0]} has won`;
            isGameOver(true);
            //display previous button
            return cell;
        } else {
            isDraw();
        }
    });
}

//checks if game is a draw - all cells are occupied and no winning combination
function isDraw() {
    if (occupiedCells === 9 && !isGameOver()) {
        turnIndicator.textContent = 'DRAW';
        modalHeader.textContent = "IT'S A TIE!";
        modalText.textContent = '';

        isGameOver(true);
    };
}

//if game is over, disable event listener on each cell
function isGameOver(status) {
    if (!status) {
        for (let cell of cells) {
            cell.addEventListener('click', play);
            cell.addEventListener('mouseenter', hover);
        };
    } else {
        for (let cell of cells) {
            cell.removeEventListener('click', play);
            cell.removeEventListener('mouseenter', hover);
        };
        modalContainer.style.display = 'flex';
    };

    console.log('Board Array:');
    console.log(boardArray);
}

function hover(e) {
    if (xTurn) {
        e.target.textContent = 'X';
        e.target.style.color = 'var(--x-hover)';
    } else {
        e.target.textContent = 'O';
        e.target.style.color = 'var(--o-hover)';
    }
}

function reset() {
    // clear all Xs and Os
    for (let cell of cells) {
        let classList = cell.classList;
        if (classList.length = 3) {
            classList.remove(classList[2]);
        } else {
            return;
        }
    }
    //start with x turn again
    xTurn = true;
    updatePlayer('X');
    //remove previous and next buttons
    previousBtn.style.visibility = 'hidden';
    nextBtn.style.visibility = 'hidden';
    isGameOver(false);
    occupiedCells = 0;
    boardArray = [];
    previousMoveArray = [];
    console.clear();
    modalText.textContent = '';
    modalContainer.style.display = 'none';
}