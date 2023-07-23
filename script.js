const resetBtn = document.getElementById("gameResetBtn");

const game = (() => {
    setUserSymbol = function(){
        let userSymbol = "X";
        // putem face 2 butoane care sa seteze simbolul - facut butoane, trebuie pusa actiunea pe ele
        // putem face un script care va alege random ce simbol va primi utilizatorul
        // putem seta simbolul in functie de dificultate (aici va fi nevoie de 3 butoane - Easy, Medium si Hard), iar in functie de dificultate alegem butonul
        // momentan o sa-l las pe X pentru testare;
        return userSymbol;
    }
    let userSymbol = setUserSymbol();
    return {userSymbol};
})();

const gameBoard = (() => {
    let moveNumber = 0;

    createGameCells = function() {
        const gameGrid = document.getElementById("game-grid");
        const rowCount = 3;
        const colCount = 3;
        for(let i = 0; i<colCount; i++) {
            for(let j = 0; j<rowCount; j++) {
                var newCell = document.createElement("div");
                newCell.classList.add("game-cell");
                newCell.setAttribute("cellRow", i);
                newCell.setAttribute("cellCol", j)
                gameGrid.appendChild(newCell);
            }
        }
    };
    
    gameBoardCreator = function() {
        createGameCells();
        gameBoardActions();
    };

    gameBoardActions = function() {
        const gameCells = document.querySelectorAll(".game-cell");
        for(let i = 0; i < gameCells.length; i++){
            gameCells[i].addEventListener("click", function(e){
                let cell = e.target;
                cellActions(cell);
            });
        }
    };

    cellActions = function(cell) {
        game.userSymbol = moveNumber % 2 ? "Y" : "X";
        if(!cell.getAttribute("symbol")) {
            moveNumber+=1;
            cell.setAttribute("symbol", game.userSymbol);
            cell.textContent = game.userSymbol;
        } else console.error("Move not allowed!");
    };

    resetGame = function() {
        const gameCells = document.querySelectorAll(".game-cell");
        gameCells.forEach(function(item){
            item.removeAttribute("symbol");
            item.textContent = "";
            moveNumber = 0;
        });
    };

    return {gameBoardCreator, resetGame}
})();

gameBoard.gameBoardCreator();

resetBtn.addEventListener("click", function(){
    gameBoard.resetGame();
});

// pot face un loc unde va aparea o eroare de cate ori utilizatorul incearca sa faca o miscare interzisa.

// cazuri castigatoare: acelasi rand, aceeasi coloana, diagonala principala (colIndex = rowIndex) si diagonala secundara (c0-r2, c1-r1, c2-r0)

