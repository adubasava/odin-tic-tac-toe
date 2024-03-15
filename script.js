const gameBoard = (function() {
    const board = [];
    
    for (let i = 0; i < 9; i++) {
        board[i] = 0;
    }

    const makeMove = function(cellNumber, player) {
        if (board[cellNumber] === 0) {
            board[cellNumber] = player.marker;
            document.querySelector(`.board:nth-child(${cellNumber+1})`).style.color = player.marker === 'X' ? 'white' : 'red';
        }       
       document.querySelector(`.board:nth-child(${cellNumber+1})`).textContent = player.marker;
    };

    return { board, makeMove };
})();


const players = function() {

    let name1, name2;

    if (document.querySelector('#player1').value && document.querySelector('#player2').value) {
        name1 = document.querySelector('#player1').value;
        name2 = document.querySelector('#player2').value;
    } else {
        name1 = 'Player One';
        name2 = 'Player Two';
    }
    const player1 = { name: name1, marker: 'X'};
    const player2 = { name: name2, marker: 'O'};

    return { player1, player2 }
}


const gameController = (function() {   

    const { player1, player2 } = players();

    let activePlayer = player1;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const resetCurrentPlayer = () => { 
        document.querySelector('.player').textContent = `Current player: ${activePlayer.name} (${activePlayer.marker})`;
    }

    const clearAll = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard.board[i] = 0;
        }  

        resetCurrentPlayer();
        activePlayer = player1;
    
        document.querySelectorAll('.board').forEach((button) => {
            button.textContent = '';
            button.disabled = false;
        })
        document.querySelector('.player').textContent = '';
    }

    document.querySelector('#restart').addEventListener('click', clearAll);

    const isTie = () => {    
        let availableCells = gameBoard.board.filter((i) => i === 0);
        return availableCells.length === 0;
    }

    const isWinner = (player) => { 
        const marker = player.marker;
        const board = gameBoard.board;
    
        if (board[0] == marker && board[1] == marker && board[2] == marker) {
            return true;
        }
        if (board[3] == marker && board[4] == marker && board[5] == marker) {
            return true;
        }
        if (board[6] == marker && board[7] == marker && board[8] == marker) {
            return true;
        }
        if (board[0] == marker && board[3] == marker && board[6] == marker) {
            return true;
        }
        if (board[1] == marker && board[4] == marker && board[7] == marker) {
            return true;
        }
        if (board[2] == marker && board[5] == marker && board[8] == marker) {
            return true;
        }
        if (board[0] == marker && board[4] == marker && board[8] == marker) {
            return true;
        }
        if (board[2] == marker && board[4] == marker && board[6] == marker) {
            return true;
        }

        return false;
    }

    const playRound = () => {

        resetCurrentPlayer();
        activePlayer = players().player1;

        document.querySelector('.buttons').addEventListener('click', event => {
            gameBoard.makeMove(Number(event.target.dataset.index), activePlayer);
            document.getElementById(event.target.id).disabled = true; 

            if (isWinner(activePlayer)) {
                alert(`${activePlayer.name} won!`);
                clearAll();            
            } else if (isTie()) {
                alert(`Tie!`);
                clearAll();    
            } else {
                switchActivePlayer();
                resetCurrentPlayer();
            }
        });
        
        switchActivePlayer(); 
    }

    return { playRound, activePlayer, resetCurrentPlayer, clearAll };
})();

document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#start').disabled = true;
    gameController.playRound();
});
