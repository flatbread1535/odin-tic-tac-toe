// Gameboard factory function
const gameBoard = (() => {
    const board = [
        [],
        [],
        [],
    ];

    const reset = () =>{

    };

})();

// Player factory function
function player(name, marker, score) {
    return { name, marker, score };
}

// Gameflow factory function
const gameFlow = (() => {
    let turnCount = 0;
    let players;
    let currentPlayer;

    const startGame = (name1, name2) => {
        players = [player(name1, "X", 0), player(name2, "O", 0)];
        currentPlayer = players[0];
        gameBoard.reset();
    }

    // Checks if a win has occured per turn
    const checkWin = () => {
        const marker = currentPlayer.marker;
        const board = gameBoard.board;

        // Checks if win has occured via a row
        const checkRows = () => {
            for (let i = 0; i < 3; i++) {
                if (board[i][0] === marker && board[i][1] === marker && gameBoard[i][2] === marker) {
                    return true;
                }
            }
            return false;
        };

        // Checks if win has occured via a column
        const checkColumns = () => {
            for (let i = 0; i < 3; i++) {
                if (board[0][i] === marker && board[1][i] === marker && gameBoard[2][i] === marker) {
                    return true;
                }
            }
            return false;
        };

        // Checks if a diagonal win has occured
        const checkDiagonals = () => {
            if (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) {
                return true;
            } else if (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker) {
                return true;
            } else {
                return false;
            }
        }

        return checkRows() || checkColumns() || checkDiagonals();
    };

    const playTurn = (row, col) => {
        gameBoard.placeMarker(row, col, activePlayer.marker);
        turnCount++;

        // Check if the currentPlayer had a winning move
        if (checkWin()) {
            // Do something to display currentPlayer has won
            return;
        }

        // Check if board is filled
        if (turnCount === 9) {
            // Do something to display game has been tied
            return;
        }
    };

})();