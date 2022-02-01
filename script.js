// create a module for the gameboard

const gameBoard = (function () {
    //create 3x3 divs
    const boardContainer = document.getElementById('gameboard');

    const _createColumn = function () {
        for (i = 3; i > 0; i--) {
            const column = document.createElement('div');
            column.classList.add('board-column');
            boardContainer.append(column);
        }
    }

    const _createRow = function () {
        const columns = Array.from(document.querySelectorAll('.board-column'));
        columns.forEach((column) => {
            for (i = 3; i > 0; i--) {
                const row = document.createElement('div');
                row.classList.add('grid');
                column.append(row);
            }
        });
    }

    const _createBoard = (function () {
        _createColumn();
        _createRow();
    }) ();
    
    return {
    }
})();

const gameFlow = (function () {
    //create a function that player will choose a symbol and the two players will be created, based on the chosen symbol.
    let playerArray = [];
    let turn = undefined;
    const _selectSymbol = (function () {
        const symbols = document.querySelectorAll('.gamebuts');
        const selectQuery = document.getElementById('player-choice');
        const playerList = document.getElementById('player-list');

        symbols.forEach ((symbol) => {
            symbol.addEventListener('click', setSymbol);
        })

        const player1 = Player('', 1);
        const player2 = Player('', 2);
    
        function setSymbol (e) {
            playerArray = [];
            if (e.target.innerText === 'X') {
                player1.symbol = e.target.innerText;
                player2.symbol = 'O';
            } else {
                player1.symbol = e.target.innerText;
                player2.symbol = 'X';
            }
            playerArray.push(player1, player2);
            // create a function that change the divs text content when it is clicked depending on the player's symbol, create a function that chooses at random which player goes first.
            turn = playerArray[Math.floor(Math.random()*playerArray.length)];

            selectQuery.classList.remove('open');
            selectQuery.classList.add('close');

            playerList.textContent = `Player 1: ${player1.symbol}\nPlayer 2: ${player2.symbol}`;
            playerList.classList.remove('close');
        }   
    })();

    const _gridclick = (function () {
        const gameBoxes = Array.from(document.querySelectorAll('.grid'));

        gameBoxes.forEach ((box) => {
            box.addEventListener('click', writeSymbol);
        })

        function writeSymbol (e) {
            //a function to write the symbol of the player of the current turn.
           if (!e.target.textContent) {
            if (turn !== undefined) {
                if (turn.playerNum === 1) {
                    e.target.textContent = playerArray[0].symbol;
                    turn = playerArray[1];
                } else {
                    e.target.textContent = playerArray[1].symbol;
                    turn = playerArray[0];
                }
                _determineWinner();
            }
            else {
                alert('Select a symbol!')
            }
           }
        }
    }) ();

    //a function to return the text content of the array aka grid boxes;
    const _getStatus = function () {
        const gameStatus = [];
        const gridTexts = Array.from(document.querySelectorAll('.grid'))
        gridTexts.forEach ((element) => {
            gameStatus.push(element.innerText);
        })
        console.log(gameStatus);
        return gameStatus;
    }

    //a function to determine if a player wins
    const _determineWinner = function () {
        gameArray = _getStatus();
        winCombinations = [[0,3,6],[0,4,8],[0,1,2],[3,4,5],[2,4,6],[6,7,8],[1,4,7],[2,5,8]];
        //and not empty
        for (const combination of winCombinations) {
            //if the element at the index in the win combinations are all the same, you win the game
            if (gameArray[combination[0]] && gameArray[combination[1]] && gameArray[combination[2]]) {
                console.log(gameArray[combination[0]])
            }
        }
    }
}) ();

function Player (symbol, playerNum) {
    return {
        symbol,
        playerNum
    }
}