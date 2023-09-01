const resetBtn = document.getElementById("gameResetBtn");

const game = (() => {
    let moveNumber = 0;
    setUserSymbol = function(){
        let userSymbol = moveNumber % 2 ? "Y" : "X";
        moveNumber+=1;
        return userSymbol;
    };

    resetGame = function() {
        const gameCells = document.querySelectorAll(".game-cell");
        gameCells.forEach(function(item){
            item.removeAttribute("symbol");
            item.textContent = "";
            moveNumber = 0;
        });
    };

    checkLine = function(rowNum){
        var Xs = 0;
        var Ys = 0;
        const gameCells = document.querySelectorAll(".game-cell");
        for(let i = 0; i < gameCells.length; i ++) {
            if(gameCells[i].getAttribute("cellrow") == rowNum) {
                switch(gameCells[i].getAttribute("symbol")){
                    case "X": Xs += 1;
                        break;
                    case "Y": Ys += 1;
                        break;
                    default: break;
                } 
            }
        }
        if(Xs == 3){
            displayWinner("X");
        };
        if(Ys == 3){
            displayWinner("Y");
        };
    };

    checkColumn = function(colNum){
        var Xs = 0;
        var Ys = 0;
        const gameCells = document.querySelectorAll(".game-cell");
        for(let i = 0; i < gameCells.length; i++) {
            if(gameCells[i].getAttribute("cellcol") == colNum) {
                switch(gameCells[i].getAttribute("symbol")){
                    case "X": Xs += 1;
                        break;
                    case "Y": Ys += 1;
                        break;
                    default: break;
                }
            }
        }
        if(Xs == 3){
            displayWinner("X");
        };
        if(Ys == 3){
            displayWinner("Y");
        };
    };

    checkMainDiagonal = function() {
        var Xs = 0;
        var Ys = 0;
        const gameCells = document.querySelectorAll(".game-cell");
        for(let i = 0; i< gameCells.length; i++){
            if(gameCells[i].getAttribute("cellcol") == gameCells[i].getAttribute("cellrow")) {
                switch(gameCells[i].getAttribute("symbol")){
                    case "X": Xs += 1;
                        break;
                    case "Y": Ys += 1;
                        break;
                    default: break;
                }
            }
        }
        if(Xs == 3){
            displayWinner("X");
        };
        if(Ys == 3){
            displayWinner("Y");
        };
    }

    checkSecondaryDiagonal = function() {
        var Xs = 0;
        var Ys = 0;
        const gameCells = document.querySelectorAll(".game-cell");
        for(let i=0; i < gameCells.length; i++){
            for(let j = 0; j <= 2; j++){
                if(gameCells[i].getAttribute("cellrow") == 2 - j && gameCells[i].getAttribute("cellcol") == 0 + j){
                    switch(gameCells[i].getAttribute("symbol")){
                        case "X": Xs += 1;
                            break;
                        case "Y": Ys += 1;
                            break;
                        default: break;
                    }
                }
            }
        }
        if(Xs == 3){
            displayWinner("X");
        };
        if(Ys == 3){
            displayWinner("Y");
        };
    };

    function checkWin(){
        for(let i =0; i<3; i++){
            checkLine(i);
            checkColumn(i);
            checkMainDiagonal();
            checkSecondaryDiagonal();
        };
    };

    return {setUserSymbol, resetGame, checkWin};
})();

const gameBoard = (() => {
    
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
        if(!cell.getAttribute("symbol")) {
            let userSymbol = game.setUserSymbol();
            cell.setAttribute("symbol", userSymbol);
            cell.textContent = userSymbol;
        } else console.error("Move not allowed!");
        game.checkWin();
    };

    return {gameBoardCreator}
})();

const displayController = (() => {

    displayWinner = function(winnerSymbol) {
        winnerDiv = document.getElementById("winner");
        winnerDiv.textContent = `Winner is : ${winnerSymbol}`;
        game.resetGame();
    }

})();

gameBoard.gameBoardCreator();

resetBtn.addEventListener("click", function(){
    game.resetGame();
});

testBtn = document.getElementById("test");
testBtn.addEventListener("click", function(e){});


// de aranjat pagina, de adaugat buton de start game dupa ce a introdus numele
// de adaugat optiune de ales intre player 1 si player 2
// eventual de facut un AI care sa faca o miscare legala random


// pot face un loc unde va aparea o eroare de cate ori utilizatorul incearca sa faca o miscare interzisa.

// Comentarii modul game()
        // putem face 2 butoane care sa seteze simbolul - facut butoane, trebuie pusa actiunea pe ele
        // putem face un script care va alege random ce simbol va primi utilizatorul
        // putem seta simbolul in functie de dificultate (aici va fi nevoie de 3 butoane - Easy, Medium si Hard), iar in functie de dificultate alegem butonul
        // momentan o sa-l las pe X pentru testare;


