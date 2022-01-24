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
        console.log(columns);
        columns.forEach((column) => {
            for (i = 3; i > 0; i--) {
                const row = document.createElement('div');
                row.classList.add('grid');
                column.append(row);
            }
        });
    }

    const createBoard = function () {
        _createColumn();
        _createRow();
    }
    
    return {
        createBoard,
    }
})();

gameBoard.createBoard();