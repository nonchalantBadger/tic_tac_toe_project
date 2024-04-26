// GLOBAL VARIABLES

let grids = document.querySelectorAll(".grid")
let overlayTextDiv = document.getElementById("overlay_text")
let mainBodyDiv = document.getElementById("content")

resetDiv = document.getElementById("reset_button")

/*
Creates the gameboard for which the game of Tic Tac Toe takes place.
It comes with four functions which allow you to: create the game board,
retrieve the game board, print the gamebord in the console and to place, 
a mark of the game board.
*/
function gameBoard () {

    const rows = 3
    const columns = 3
    const board = []


    // Create the game board. The nested arrays are where you will store the X and O values
    function createBoard () {
        for (let i = 0; i < rows; i++){
            board[i] = []
            for(j = 0;j < columns;j++){
                board[i].push([])
            }
        }
    }

    const getBoard = () => board

    const printBoard = () =>{
        board.forEach(
            row => console.log(row)
        )
    }

    const placeMark = (playerChoice,currentPlayer) =>{
        if (playerChoice == "TL"){
            board[0][0] = currentPlayer
        }else if(playerChoice == "TM"){
            board[0][1] = currentPlayer
        }else if(playerChoice == "TR"){
            board[0][2] = currentPlayer
        }else if(playerChoice == "ML"){
            board[1][0] = currentPlayer
        }else if(playerChoice == "MM"){
            board[1][1] = currentPlayer
        }else if(playerChoice == "MR"){
            board[1][2] = currentPlayer
        }else if(playerChoice == "BL"){
            board[2][0] = currentPlayer
        }else if(playerChoice == "BM"){
            board[2][1] = currentPlayer
        }else if(playerChoice == "BR"){
            board[2][2] = currentPlayer
        }



    }

    createBoard ()

    return{getBoard,createBoard,printBoard,placeMark}

}

/* 
This function checks to see if the game has been won. 
It takes two parameters the game board and the mark of the current player, X or O.
It then checks to see if the either the X or O appears three times in a row,
The function returns if the game has been won or not.
*/
function winCondition (object,currentPlayer) {
    
    let winConditionMet = false
    let remainingGridPlace = false
    let fullGrid = false

    diagonalLeft = [[0,0],[1,1],[2,2]]
    diagonalRight = [[0,2],[1,1],[2,0]]

    topRow = [[0,0],[0,1],[0,2]]
    middleRow = [[1,0],[1,1],[1,2]]
    bottomRow = [[2,0],[2,1],[2,2]]

    LeftColumn = [[0,0],[1,0],[2,0]]
    middleColumn = [[0,1],[1,1],[2,1]]
    rightColumn = [[0,2],[1,2],[2,2]]

    winningCombinations = [
        diagonalLeft
        ,diagonalRight
        ,topRow
        ,middleRow
        ,bottomRow
        ,LeftColumn
        ,middleColumn
        ,rightColumn
    ]


    for(let combination of winningCombinations){

        winCounter = 0
        
        for(let square of combination){

            let [x,y] = square

            if(object[x][y] == currentPlayer){
                winCounter += 1
            }else{
                break
            }   
        }

        // A player has won
        if(winCounter == 3){
            console.log("Victory!")
            winConditionMet = true
            return {winConditionMet,fullGrid}
        }

    }

    // If every cell has a value and the win counter has not triggered then must be draw

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3;j++){
            //console.log(object.[i][j])
            if(object[i][j] == null || object[i][j] == ``){
                remainingGridPlace = true
            }
                
            }
        }

    if (remainingGridPlace != true){
        fullGrid = true
    }
        
    return {winConditionMet,fullGrid}

    
}

function resetGame (game) {
    console.log(`running reset on ${game.getBoard()}`)
    mainBodyDiv.style.opacity = 1
    overlayTextDiv.innerText = ``
    overlayTextDiv.style.zIndex = 0
    game.createBoard()
    grids.forEach(
        square => {
            square.innerText = ""
        }
    )
    game.printBoard()
}

/*
This function is responsible for controlling the flow of the game.
It takes four parameters, the names of the players and their icons.
*/
function gameController (player1Name,player2Name,player1Icon,player2Icon) {

    players = [
        {
            name: player1Name,
            mark: player1Icon
        },
        {
            name: player2Name,
            mark: player2Icon
        }
    ]

    activePlayer = players[0]

    function switchPlayer () {
        if (activePlayer == players[0]){
            activePlayer = players[1]
        }else if (activePlayer == players[1]){
            activePlayer = players[0]
        }
    }

    function nextTurn (gameState,game) {

        gameWon = gameState.winConditionMet 
        fullGrid = gameState.fullGrid
        gameObject = game

        console.log(`game won:${gameWon} fullgrid:${fullGrid}`)

        if (gameWon == true){
            console.log(`Game is over ${activePlayer.name} won`)
            overlayTextDiv.innerText = `${activePlayer.name}`
            overlayTextDiv.style.zIndex = 9999
            overlayTextDiv.style.pointerEvents = "none";
            mainBodyDiv.style.opacity = 0.5
        } else if(fullGrid == true){
            overlayTextDiv.innerText = `UNEASY TENSION CIVILISATION AND AI`
            overlayTextDiv.style.zIndex = 9999
            mainBodyDiv.style.opacity = 0.5
        }else{
            switchPlayer()

        }

    }

    function selectGrid (squarePlace, activePlayer) {
        squarePlace.style.fontSize= "50px" 
        squarePlace.innerText = activePlayer.mark
        game.placeMark(squarePlace.id,activePlayer.mark)
    }

    const game = gameBoard()

    gameWon = false

    resetDiv.addEventListener('click',function(){
        resetGame(gameObject)
    })


       
    grids.forEach( square => {

        square.onclick = () => {
            if (square.innerText == "" || square.innerText == null)
                // When grid is selected a player mark is placed on the board
                selectGrid(square,activePlayer)

                //console.log(game.printBoard())
                // Checks to see if the game has been won
                isGameWon = winCondition(game.getBoard(),activePlayer.mark)

                // Based on if the game has been won, next turn is decided
                nextTurn (isGameWon,game)
            }
    })

    return{}

}

newGame = gameController("CIVILISATION","AI","🥲","🤖")



