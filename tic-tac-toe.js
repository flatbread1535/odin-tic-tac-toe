// Gameboard factory function
const gameBoard = (() => {
    // Gameboard array initialization
    let board = [
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
    let turnCount = 1;
    let players;
    let currentPlayer;

    // Resets game logic to begin a new game
    const startGame = (name1, name2) => {
        players = [player(name1, "X", 0), player(name2, "O", 0)];
        currentPlayer = players[0];
        turnCount = 1;
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

        // Check if the currentPlayer had a winning move
        if (checkWin()) {
            // Do something to trigger winning message on display???
            currentPlayer.score++;
            return;
        }

        // Check if board is filled
        if (turnCount === 9) {
            // Do something to trigger tie message on display???
            return;
        }

        // Switches turn between players
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        turnCount++;
    };

    return { startGame, playTurn };
})();

// Handles the display/DOM logic of the game
const displayController = (() => {

    // Renders the contents of the gameboard array to the webpage
    const renderContents = () => {
        const board = gameBoard.getBoard();
        // Gets the content of each cell on the board array and the corresponding display element
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const marker = board[row][col];
                const cellIdx = (row * 3) + col;
                const cell = document.querySelector(`[data-id="${cellIdx}"]`);

                // Resets board marker and then checks if a display marker should be placed
                cell.classList.remove("x-marked", "o-marked");
                cell.textContent = "";
                if (marker === "X") {
                    cell.classList.add("x-marked");
                    cell.textContent = "X";
                } else if (marker === "O") {
                    cell.classList.add("o-marked");
                    cell.textContent = "O";
                }
            }
        }
    };

    // Adds a mark to a specific spot on the board
    const addMark = () => {
        const board = gameBoard.getBoard();
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const cellIdx = Number(cell.dataset.id);
                const row = Math.floor(cellIdx / 3);
                const col = cellIdx % 3;

                // Checks if the cell has already been filled with a marker
                if (board[row][col] !== "") {
                    return;
                }

                gameFlow.playTurn(row, col);
                renderContents();
            });
        });
    };

    // Restarts the game
    const restart = () => {
        const restartBtn = document.querySelector(".restart-btn");
        const p1Ipt = document.querySelector("#p1-name");
        const p2Ipt = document.querySelector("#p2-name");
        restartBtn.addEventListener("click", () => {
            const p1Name = p1Ipt.value || "Player 1";
            const p2Name = p2Ipt.value || "Player 2";
            gameFlow.startGame(p1Name, p2Name);
            renderContents();
        });
    };

    return { renderContents, addMark, restart };
})();