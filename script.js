/**
 * goal is to have as little global code as possible 
 */


function GameBoard() {
    const rows = 3;
    const cols = 3;

    const board = [];
  
    for (let i = 0 ; i < rows; i++){
      board.push([]);
      for(let j = 0; j < cols; j++){
        board[i][j] = Cell();
      }
    }


    
    const placeMark = (row, col, player) => {
      if (board[row][col] != 0){
        board[row][col] = player;
      }
    }

    const printBoard = () => {

      let tempboard = [];
      for (let i = 0 ; i < rows; i++){
        tempboard.push([]);
        for(let j = 0; j < cols; j++){
          tempboard[i][j] = board[i][j];
        }
      }

      console.log(tempboard);
    }

    return {printBoard, placeMark};
    
}

function Cell(){
  let value = 0;

  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMark,
    getValue
  };
}

function GamePlay() {

  const player1 = {
    name: "player1",
    mark: "x"
  }
  const player2 = {
    name: "player2",
    mark: "o"
  }
  const players = [player1, player2];


  let board = GameBoard();
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  const swapPlayer = () => {
    if (activePlayer == players[0]){
      activePlayer = players[1];
    } 
    else {
      activePlayer = players[0];
    }

    console.log(`It is ${activePlayer.name}'s turn`)
  }

  let row = 1;
  let col = 1;

  // place mark
  const playRound = (row, col) => {
    console.log(`placing ${getActivePlayer().name}'s token in ${row} ${col}`);
    board.placeMark(row, col, getActivePlayer().mark);
  }

  playRound(row, col);
  // print board
  board.printBoard();
  // check for winner
  // swap player
  swapPlayer();



}

GamePlay();