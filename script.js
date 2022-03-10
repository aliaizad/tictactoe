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
    let winner = undefined;
    const alertdiv = document.getElementById("alerts");
    const playerList = document.getElementById('player-list');
    const selectQuery = document.getElementById('player-choice');
    const resetDiv = document.getElementById('reset');
    const gameBoxes = Array.from(document.querySelectorAll('.grid'));
    const form = document.querySelector('form');
    const turnAlert = document.createElement('div');

    const _createPlayers = (function () {
        const p1Name = document.getElementById('player1');
        const p2Name = document.getElementById('player2');

        const player1 = Player('', '', 1);
        const player2 = Player('', '', 2);

        form.addEventListener('submit', submitForm);

        const choiceText = document.getElementById('choice-text');

        function submitForm(e) {
            e.preventDefault();
            if(p1Name.value && p2Name.value) {
                player1.name = p1Name.value;
                player2.name = p2Name.value;
                form.classList.add('close');
                choiceText.textContent = `${player1.name}, please choose a symbol:`
                selectQuery.classList.remove('close');
            } else {
                alertdiv.textContent = 'Please insert both names!'
                alertdiv.classList.remove('close');
            }
            form.reset();
        }

        const symbols = document.querySelectorAll('.gamebuts');

        symbols.forEach ((symbol) => {
            symbol.addEventListener('click', setSymbol);
        })
    
        function setSymbol (e) {
            alertdiv.classList.add('close');
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

            turnAlert.textContent = `It is ${turn.name}'s turn`;

            selectQuery.classList.remove('open');
            selectQuery.classList.add('close');

            playerList.textContent = `${player1.name}: ${player1.symbol}\n${player2.name}: ${player2.symbol}`;
            playerList.appendChild(turnAlert);
            playerList.classList.remove('close');
            resetDiv.classList.remove('close');
        }   
    })();

    const _gridclick = (function () {

        gameBoxes.forEach ((box) => {
            box.addEventListener('click', writeSymbol);
        })

        function writeSymbol (e) {
            //a function to write the symbol of the player of the current turn.
            if (!e.target.textContent && !winner && playerArray.length == 2) {
                if (turn !== undefined) {
                    if (turn.playerNum === 1) {
                        e.target.textContent = playerArray[0].symbol;
                        turn = playerArray[1];
                    } else {
                        e.target.textContent = playerArray[1].symbol;
                        turn = playerArray[0];
                    }
                    turnAlert.textContent = `It is ${turn.name}'s turn`;
                    _determineWinner();
                }
            } else {
                alertdiv.classList.remove('close');
            }
        }
    }) ();

    //a function to return the text content of the array aka grid boxes;
    const _getStatus = function () {
        const gameStatus = [];
        const gridTexts = Array.from(document.querySelectorAll('.grid'))
        gridTexts.forEach ((element) => {
            gameStatus.push(element.innerText);
        });
        return gameStatus;
    }

    //a function to determine if a player wins
    const _determineWinner = function () {
        gameArray = _getStatus();
        winCombinations = [[0,3,6],[0,4,8],[0,1,2],[3,4,5],[2,4,6],[6,7,8],[1,4,7],[2,5,8]];
        //and not empty
        let finishToken;
        let resultText;
        search:
        for (const combination of winCombinations) {
            //if the element at the index in the win combinations are all the same, you win the game
            if (gameArray[combination[0]] && gameArray[combination[1]] && gameArray[combination[2]]) {
                if (gameArray[combination[0]] === gameArray[combination[1]] && gameArray[combination[1]] === gameArray[combination[2]]) {
                    //check which player wins
                    for (player of playerArray) {
                        if (player.symbol === gameArray[combination[0]]) {
                            winner = player;
                            if (winner.playerNum === 1) {
                                resultText = `${playerArray[0].name} is the winner!`;
                                finishToken = 1;
                            } else {
                                resultText = `${playerArray[1].name} is the winner!`;
                                finishToken = 1;
                            }
                            break search
                        }
                    }
                }
            }
        }

        if (!gameArray.includes('') && !winner) {
            resultText = "Draw";
            finishToken = 1;
        }

        if (finishToken) {
            playerList.classList.add('close');
            alertdiv.textContent = resultText;
            alertdiv.classList.remove('close');
        }
    }

    //a function to stop the game if someone wins
    const _resetGame = (function () {
        const resetbutton = document.getElementById('reset-button');
        resetbutton.addEventListener('click', reset);

        function reset () {
            playerArray = [];
            form.classList.remove('close');
            selectQuery.classList.add('close');
            playerList.classList.add('close');
            resetDiv.classList.add('close');
            alertdiv.classList.add('close');
            finishToken = 0;
            winner = undefined;
            gameBoxes.forEach((box) => box.textContent = "");
        }
    }) ();
}) ();

function Player (name, symbol, playerNum) {
    return {
        name,
        symbol,
        playerNum
    }
}