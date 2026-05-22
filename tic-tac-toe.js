// Gameboard factory function
const gameBoard = (() => {
    // Gameboard array initialization
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    // Gets the gameboard
    const getBoard = () => board;

    // Clears the gameboard array
    const reset = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    };

    // Places a marker on the board
    const placeMarker = (row, col, marker) => { board[row][col] = marker; }

    return { getBoard, reset, placeMarker };
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

    // Resets game logic to begin a new game
    const startGame = (name1, name2) => {
        players = [player(name1, "X", 0), player(name2, "O", 0)];
        currentPlayer = players[0];
        gameBoard.reset();
    }

    // Checks if a win has occured per turn
    const checkWin = () => {
        const marker = currentPlayer.marker;
        const board = gameBoard.getBoard();

        // Checks if win has occured via a row
        const checkRows = () => {
            for (let i = 0; i < 3; i++) {
                if (board[i][0] === marker && board[i][1] === marker && board[i][2] === marker) {
                    return true;
                }
            }
            return false;
        };

        // Checks if win has occured via a column
        const checkColumns = () => {
            for (let i = 0; i < 3; i++) {
                if (board[0][i] === marker && board[1][i] === marker && board[2][i] === marker) {
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

    // Handles logic for every turn in the game
    const playTurn = (row, col) => {
        gameBoard.placeMarker(row, col, currentPlayer.marker);
        turnCount++;

        // Check if the currentPlayer had a winning move
        if (checkWin()) {
            // D something to trigger winning message on display???
            currentPlayer.score++;
            return;
        }

        // Check if board is filled
        if (turnCount === 9) {
            // Do something to trigger tie message on display???
            return;
        }
    };

    return { startGame, playTurn };
})();

// Handles the display/DOM logic of the game
const displayController = (() => {

    // Renders the contents of the gameboard array to the webpage
    const renderContents = () => {

    };

    // Adds a mark to a specific spot on the board
    const addMark = () => {
        // Remember logic to prevent players from clicking spot already filled
    };

    return { renderContents, addMark };
})();