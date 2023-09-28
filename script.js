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




// create a div where an error appears if player makes a forbidden move (timeout so that error disappears on click or after 3s)


/// MODAL Functions
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal -- to be removed
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var symbolButtons = document.querySelectorAll('[class="symbolBtn"]');
symbolButtons.forEach(function(button){
    button.onclick = function(e){
        console.log(e.srcElement.getAttribute("symbol"));
        playerSelection = document.getElementsByClassName("selected");
        if(playerSelection.length > 0){
            playerSelection[0].classList.remove("selected");
        }
        e.srcElement.classList.add("selected");
        // set player1 symbol to the clicked element -> show "confirm" button
        // add class "selected" which changes the color of the button
    }
})