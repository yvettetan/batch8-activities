/*****ELEMENTS*****/
const turnIndicator = document.querySelector('#turnIndicator');
const cells = document.querySelectorAll('.cell');

const previousBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');
const resetBtn = document.querySelector('#resetBtn');

/*****VARIABLES*****/
let xTurn = true;
let occupiedCells = 0;

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let previousMoveStorage = [];
let nextMoveStorage = [];
let previousPlayerStorage = [];
let nextPlayerStorage = [];

/*****EVENT LISTENERS*****/

//add event listener for each cell
for (let cell of cells) {
    cell.addEventListener('click', play);
}

//previous button
previousBtn.addEventListener('click', () => {
    nextBtn.style.visibility = 'visible';
    if (previousMoveStorage.length != 0) {
        let lastMove = previousMoveStorage[previousMoveStorage.length - 1];
        let targetCell = cells[lastMove];
        let lastPlayer = previousPlayerStorage[previousPlayerStorage.length - 1];
        targetCell.classList.remove(targetCell.classList[2]); //remove last move from cell
        nextMoveStorage.push(lastMove); //add last move to nextMoveStorage
        previousMoveStorage.pop(); //remove last move from previousMoveStorage
        nextPlayerStorage.push(lastPlayer); //add last player to nextPlayerStorage
        previousPlayerStorage.pop(); //remove last player from previousPlayerStorage
    } else {
        previousBtn.style.visibility = 'hidden';
    };
});

//next button
nextBtn.addEventListener('click', () => {
    previousBtn.style.visibility = 'visible';
    if (nextMoveStorage.length != 0) {
        let lastMove = nextMoveStorage[nextMoveStorage.length - 1];
        let targetCell = cells[lastMove];
        let lastPlayer = nextPlayerStorage[nextPlayerStorage.length - 1]
        targetCell.classList.add(lastPlayer); //display last player in cell
        previousMoveStorage.push(lastMove); //add last move to previousMoveStorage
        nextMoveStorage.pop(); //remove last move from nextMoveStorage
        previousPlayerStorage.push(lastPlayer); //add last player to previousPlayerStorage
        nextPlayerStorage.pop(); //remove last player from nextPlayerStorage
    } else {
        nextBtn.style.visibility = 'hidden';
        previousBtn.style.visibility = 'visible';
    }
})

//reset button
resetBtn.addEventListener('click', () => {
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
    //add event listener to cells
    isGameOver(false);

    //clears game history
    gameHistory = [];
    occupiedCells = 0;
    previousMoveStorage = [];
    nextMoveStorage = [];
    previousPlayerStorage = [];
    nextPlayerStorage = [];
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    console.clear();
})

/*****FUNCTIONS*****/

function play(e) {
    const target = e.target; //know wich cell was clicked
    const classList = target.classList; //check list of classes
    const cell = classList[1]; //select second class as identifier of cell location
    //adds an extra class to cell depending on if xturn is true (X), if false (O)
    const player = classList[2];
    if (player === 'X' || player === 'O') { //if class already contains x or o, do nothing
        return;
    }
    else if (xTurn) { // if x's turn
        classList.add('X'); //add x class (displays x in cell)
        addMove(cell, 'X'); //add current x move to array
        updatePlayer('O'); //change turn indicator to o's turn
        xTurn = !xTurn; //x turn ends
        occupiedCells++;
        previousPlayer = 'X';
    } else { //if o's turn
        classList.add('O'); //add o class (displays o in cell)
        addMove(cell, 'O'); //add current o move to array
        updatePlayer('X'); //change turn indicator to x's turn
        xTurn = !xTurn; //back to x turn
        occupiedCells++;
        previousPlayer = '0';
    }
    previousMoveStorage.push(cell); //adds move to previousMoveStorage
    isWinner(); //check if any player has won the game
}

// add player to storage
function addMove(cell, player) {
    previousPlayerStorage.push(player); //adds player to previousPlayerStorage
    let rowIndex = parseInt(cell);
    //coordinates of cell
    if (rowIndex === 0 || rowIndex === 1 || rowIndex === 2) { //if cell 0, 1, 2 was played
        let row = 0; //set row to 0
        if (rowIndex === 0) { //if cell 0
            let column = 0; //set column to 1
            saveMove(row, column, player); //saves location and player to array
        } else if (rowIndex === 1) {
            let column = 1;
            saveMove(row, column, player);
        } else {
            let column = 2;
            saveMove(row, column, player);
        }
    } else if (rowIndex === 3 || rowIndex === 4 || rowIndex === 5) { //if cell 3, 4, 5 was played
        let row = 1;
        if (rowIndex === 3) {
            let column = 0;
            saveMove(row, column, player);
        } else if (rowIndex === 4) {
            let column = 1;
            saveMove(row, column, player);
        } else {
            let column = 2;
            saveMove(row, column, player);
        }
    } else { //if cell 6, 7, 8 was played
        let row = 2;
        if (rowIndex === 6) {
            let column = 0;
            saveMove(row, column, player);
        } else if (rowIndex === 7) {
            let column = 1;
            saveMove(row, column, player);
        } else {
            let column = 2;
            saveMove(row, column, player);
        }
    }
}

//stores each move in move array
function saveMove(row, column, player) {
    board[row].splice(column, 1, player); //saves move to board array
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

    // //check if any winning condition is fulfilled
    winningConditions.some((cell) => {
        if (cell[0] && cell[0] === cell[1] && cell[0] === cell[2]) {
            turnIndicator.textContent = `${cell[0]} has won!`;
            isGameOver(true);
            //display previous button
            previousBtn.style.visibility = 'visible';
            return cell;
        } else {
            isDraw();
        }
    })
}

//checks if game is a draw - all cells are occupied and no winning combination
function isDraw() {
    if (occupiedCells === 9 && !isGameOver()) {
        turnIndicator.textContent = 'DRAW';
        previousBtn.style.visibility = 'visible';
        isGameOver(true);
    };
}

//if game is over, disable event listener on each cell
function isGameOver(status) {
    if (!status) {
        for (let cell of cells) {
            cell.addEventListener('click', play);
        }
    } else {
        for (let cell of cells) {
            cell.removeEventListener('click', play);
        }
        console.log(board);
    }
}




