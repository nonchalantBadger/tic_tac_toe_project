let grids = document.querySelectorAll(".grid")


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

function duplicateRemove(object){

    duplicateResult = (object.filter((value,index,self) => self.indexOf(value) == index))
    return duplicateResult

}

function winCondition (object,currentPlayer) {
    
    let winConditionMet = false

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
            return winConditionMet
        }

    }
}

function resetGame () {
    grids.forEach(square => {
        square.innerText = ""
    }
    
    )
}

function gameController () {

    playerOne = "X"
    playerTwo = "O"
    gameCounter = 0

    players = [
        {
            name:"playerOne",
            mark:"X"
        },
        {
            name:"playerOne",
            mark:"O"
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

    function nextTurn (gameState) {

        gameWon = gameState

        if (gameWon == true){
            console.log(`Game is over ${activePlayer.name} won`)
            let playAgain = prompt("Do you want to play again?")
            if (playAgain == "Yes"){
                resetGame()
                gameWon = false
                game.createBoard
            }
        } else if(gameCounter > 8){
            console.log("draw")
        }else{
            switchPlayer()
            console.log("ran")
        }

    }

    function selectGrid (squarePlace, activePlayer) {
        if (squarePlace.innerText != "X" && squarePlace.innerText != "O"){
            squarePlace.innerText = activePlayer.mark
            squarePlace.style.fontsize="50px" 
            game.placeMark(squarePlace.id,activePlayer.mark)
            gameCounter +=1
        }
    }

    const game = gameBoard()

    gameWon = false
       
    grids.forEach( square => {

        square.onclick = () => {
            // When grid is selected an X or O is placed
            selectGrid(square,activePlayer)

            console.log(game.printBoard())

            // Checks to see if the game has been won
            isGameWon = winCondition(game.getBoard(),activePlayer.mark)

            // Based on if the game has been won, next turn is decided
            nextTurn (isGameWon)
        }

    })

}

newGame = gameController()







