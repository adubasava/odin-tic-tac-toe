const gameBoard = (function() {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(0);
        }        
    }

    return { board };
})();

const players = function(player1 = "Player One", player2 = "Player Two") {
    player1 = { name: player1, marker: "X"};
    player2 = { name: player2, marker: "O" };

    return { player1, player2 }
}