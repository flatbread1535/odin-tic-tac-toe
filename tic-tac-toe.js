// Gameboard factory function
const gameBoard = (() => {
    const board = [
        [],
        [],
        [],
    ];
})();

// Player factory function
function player(name, marker, score) {
    return { name, marker, score };
}

// Gameflow factory function
function gameFlow() {

}