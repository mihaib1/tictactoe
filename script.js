const resetBtn = document.getElementById("gameResetBtn");

const game = (() => {
    
    let moveNumber = 0;
    setUserSymbol = function(){
        let userSymbol = moveNumber % 2 ? "Y" : "X";
        moveNumber+=1;
        return userSymbol;
    };

    clearGameBoard = function() {
        const gameCells = document.querySelectorAll(".game-cell");
        
        gameCells.forEach(function(item){
            item.removeAttribute("symbol");
            item.textContent = "";
            moveNumber = 0;
        });
        
    };

    function getWinningSymbol(Xs, Ys){
        playersArray = [player1, player2];
        if(Xs == 3){
            playersArray.forEach(function(player){
                incrementPlayerWinsAndLosses("X", player);
            })
        };
        if(Ys == 3){
            playersArray.forEach(function(player){
                incrementPlayerWinsAndLosses("Y", player);
            });
        };
    };

    function tie(){
        winnerDiv = document.getElementById("winner");
        winnerDiv.textContent = `Tie!`;
        game.clearGameBoard();
    }
    

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

    checkTie = function() {  // checking for ties could be improved. how?
        let counter = 0;
        const gameCells = document.querySelectorAll(".game-cell");
        for(let i = 0; i < gameCells.length; i++){
            if(gameCells[i].getAttribute("symbol") == "X" || gameCells[i].getAttribute("symbol") == "Y" ){
                counter += 1;
            }
        }
        if(counter == 9){
            tie();
        }
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
            checkTie();
        };
    };

    return {setUserSymbol, clearGameBoard, checkWin};
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
        } else console.error("Move not allowed!"); // here I should add a div to say that move is illegal;
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
    createPlayerObject = function(symbolTargetDiv, player) {
        player1.name = setPlayerName(1);
        player2.name = setPlayerName(2);
        let symbol = symbolTargetDiv.srcElement.getAttribute("symbol");
        let confirmBtn = document.getElementsByClassName("confirm")[0];
        confirmBtn.classList.remove("hidden");
        confirmBtn.onclick = function(event){
            player.symbol = symbol;
            setPlayer2Symbol(symbol);
            modal.style.display = "none";
        }
    }

    createSecondPlayer = function(player){
        
    }

    resetPlayer = function(player){
        player = {
            name: "",
            symbol: "",
            wins:0,
            losses: 0
        };
    }

    incrementPlayerWinsAndLosses = function(symbol, player){
        if(player.symbol === symbol){
            player.wins += 1;
            displayWinner(player.name);
        } else {
            player.losses += 1;
        }
    }

    setPlayerName = function(playerNum){
        let elementId = "player" + playerNum.toString() + "Name";
        let playerInput = document.getElementById(elementId);
        return playerInput.value;
    }

    return {createPlayerObject, resetPlayer, incrementPlayerWinsAndLosses}
})();

function Player(name, symbol, wins, losses){
    this.name = name;
    this.symbol = symbol;
    this.wins = wins;
    this.losses = losses;
}


gameBoard.gameBoardCreator();

resetBtn.addEventListener("click", function(){
    game.clearGameBoard();
});

let player1 = new Player(null, null, 0, 0);
let player2 = new Player(null, null, 0, 0);

// create a div where an error appears if player makes a forbidden move (timeout so that error disappears on click or after 3s)

/// MODAL Functions

var modal = document.getElementById("startModal");
modal.style.display = "block";

var symbolButtons = document.querySelectorAll('[class="symbolBtn"]');
symbolButtons.forEach(function(button){
    button.onclick = function(e){
        let playerChoiceDiv = document.getElementById("playerChoice");
        playerChoiceDiv.classList.remove("hidden");
        playerSelection = document.getElementsByClassName("selected");
        if(playerSelection.length > 0){
            playerSelection[0].classList.remove("selected");
        }
        e.srcElement.classList.add("selected");
        playerController.createPlayerObject(e, player1);
        playerChoiceDiv.textContent = "Symbol of choice for Player 1 is: " + e.srcElement.getAttribute("symbol");
        setPlayer2Symbol();
    }
});

function setPlayer2Symbol(symbol) {
    if(symbol === "X"){
        player2.symbol = "Y"
    }
    if(symbol === "Y"){
        player2.symbol = "X";
    }
}