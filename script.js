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
    //a function to return the text content of the array aka grid boxes;
    const getStatus = function () {
        const gameStatus = [];
        const gridTexts = Array.from(document.querySelectorAll('.grid'))
        gridTexts.forEach ((element) => {
            gameStatus.push(element.innerText);
        })
        console.log(gameStatus);
        return gameStatus;
    }
    //create a function that changes the symbol on the board
    currentSymbol = 'X'
    alternateSymbol = 'O'
    roundCounter = 0;
    const _selectSymbol = (function () {
        const symbols = document.querySelectorAll('.gamebuts');
        symbols.forEach ((symbol) => {
            symbol.addEventListener('click', setSymbol);
        })

        function setSymbol (e) {
            currentSymbol = e.target.innerText;
        }   
    })();
    // create a function that change the divs text content when it is clicked
    const _gridclick = (function () {
        const gameBoxes = Array.from(document.querySelectorAll('.grid'));
        gameBoxes.forEach((box) => {
            box.addEventListener('click', putSymbol);
        })

        function putSymbol (e) {
            if (roundCounter < 10) {
                roundCounter++;
            }
        }
    }) ();
    //creates a function that counts the round

}) ();

const player = function (symbol) {
    return {
        symbol,
    }
};