const gameBoard = (function() {
    const board = [];
    
    for (let i = 0; i < 9; i++) {
        board[i] = 0;
    }

    const makeMove = function(cellNumber, player) {
        if (board[cellNumber] === 0) {
            board[cellNumber] = player.marker;
            if (player.marker === 'X') {
                document.querySelectorAll('.board')[cellNumber].style.color = 'white';
            } else {
                document.querySelectorAll('.board')[cellNumber].style.color = 'red';
            }
        }
        renderBoard();                
    };

    const renderBoard = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] !== 0) {
                document.querySelectorAll('.board')[i].textContent = board[i];
            };
        }    
    }

    return { board, makeMove, renderBoard };
})();


const players = function(player1 = 'Player One', player2 = 'Player Two') {

    player1 = { name: player1, marker: 'X'};
    player2 = { name: player2, marker: 'O'};

    return { player1, player2 }
}


const gameController = (function() {   

    let currentPlayers = players();

    let activePlayer = currentPlayers.player1;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === currentPlayers.player1 ? currentPlayers.player2 : currentPlayers.player1;
    };

    const getActivePlayer = () => { 
        activePlayer;     
        document.querySelector('.player').textContent = `Current player: ${activePlayer.name} (${activePlayer.marker})`;
    }

    const clearAll = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard.board[i] = 0;
        }  

        getActivePlayer();
        activePlayer = currentPlayers.player1;
    
        document.querySelectorAll('.board').forEach((button) => {
            button.textContent = '';
            button.disabled = false;
        })
        document.querySelector('.player').textContent = '';
    }

    document.querySelector('#restart').addEventListener('click', clearAll);

    const isTie = () => {
    
        let availableCells = gameBoard.board.filter((i) => i === 0);
        if (availableCells.length == 0) {
            return true;
        }   
                        
        return false;
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

        getActivePlayer();
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
                getActivePlayer();
            }
        });
        
        switchActivePlayer(); 
    }

    return { playRound, activePlayer, getActivePlayer, clearAll };
})();

document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#start').disabled = true;
    gameController.playRound();
});
