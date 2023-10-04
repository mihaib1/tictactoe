const resetBtn = document.getElementById("gameResetBtn");

const game = (() => {
    let moveNumber = 0;
    setUserSymbol = function(){
        let userSymbol = moveNumber % 2 ? "Y" : "X";
        moveNumber+=1;
        return userSymbol;
    };

    fullReset = function(){ // still buggy
        //playerController.resetPlayer();
        clearGameBoard();
        modal.style.display = "block";
    }

    clearGameBoard = function() {
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
        getWinningSymbol(Xs, Ys);
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
        getWinningSymbol(Xs, Ys);
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
        getWinningSymbol(Xs, Ys);
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
        getWinningSymbol(Xs, Ys);
    };

    function checkWin(){
        for(let i =0; i<3; i++){
            checkLine(i);
            checkColumn(i);
            checkMainDiagonal();
            checkSecondaryDiagonal();
        };
    };

    return {setUserSymbol, clearGameBoard, checkWin, fullReset};
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
        game.clearGameBoard();
    }

})();

const playerController = (() => {
    let player = {
        name: "",
        symbol: "",
        wins:0,
        losses: 0
    };

    createPlayerObject = function(symbolTargetDiv) {
        let symbol = symbolTargetDiv.srcElement.getAttribute("symbol");
        let confirmBtn = document.getElementsByClassName("confirm")[0];
        confirmBtn.classList.remove("hidden");
        confirmBtn.onclick = function(event){
            player.name = playerInput;
            player.symbol = symbol;
            modal.style.display = "none";
        }
    }

    resetPlayer = function(){
        playerController.player = {
            name: "",
            symbol: "",
            wins:0,
            losses: 0
        };
    }

    incrementPlayerWinsAndLosses = function(symbol){
        if(playerController.player.symbol === symbol){
            playerController.player.wins += 1;
        } else {
            playerController.player.losses += 1;
        }
    }

    return {createPlayerObject, player, resetPlayer}
})();

gameBoard.gameBoardCreator();

resetBtn.addEventListener("click", function(){
    game.clearGameBoard();
});

testBtn = document.getElementById("test");
testBtn.addEventListener("click", function(){
    game.fullReset();
});

let playerInput = "";

let playerNameInput = document.getElementById("playerName");
playerNameInput.addEventListener("keyup", function(event){
    playerInput = event.target.value;
});

// create a div where an error appears if player makes a forbidden move (timeout so that error disappears on click or after 3s)


/// MODAL Functions

var modal = document.getElementById("startModal");
var btn = document.getElementById("myBtn");

btn.onclick = function() {
    modal.style.display = "block";
}

var symbolButtons = document.querySelectorAll('[class="symbolBtn"]');
symbolButtons.forEach(function(button){
    button.onclick = function(e){
        let playerChoiceDiv = document.getElementById("playerChoice");
        playerSelection = document.getElementsByClassName("selected");
        if(playerSelection.length > 0){
            playerSelection[0].classList.remove("selected");
        }
        e.srcElement.classList.add("selected");
        playerController.createPlayerObject(e);
        playerChoiceDiv.textContent = "Your symbol of choice is: " + e.srcElement.getAttribute("symbol");
    }
});

function getWinningSymbol(Xs, Ys){
    if(Xs == 3){
        displayWinner("X");
        incrementPlayerWinsAndLosses("X");
    };
    if(Ys == 3){
        displayWinner("Y");
        incrementPlayerWinsAndLosses("Y");
    };
}