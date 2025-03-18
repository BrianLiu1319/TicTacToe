/**
 * goal is to have as little global code as possible 
 */
 
// for (let i = 0 ; i < rows; i++){
//   board.push([]);
//   const divRow = document.createElement('div');
//   divRow.classList.add("row");
//   htmlBoard.appendChild(divRow);
//   for(let j = 0; j < cols; j++){

//     board[i][j] = Cell();
//     const button = document.createElement('button');

//     button.setAttribute("row", i);
//     button.setAttribute("col", j);
//     button.textContent = board[i][j].getValue();

//     button.addEventListener("click", (e) => {
//       let row = e.target.getAttribute("row");
//       let col = e.target.getAttribute("col");
//     });

//     divRow.appendChild(button);
//   }
// }

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
      console.log(board);
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

  }

  const getBoard = () => board;

  const playRound = (row, col, player) => {
    board.placeMark(row, col, player);
    swapPlayer();
  }

  // print board
  // check for winner
  // swap player
  swapPlayer();

  return {playRound,
    swapPlayer,
    getActivePlayer,
    getBoard
  };
}

function ScreenController() {
  const game = GamePlay();
  const htmlBoard = document.getElementById("board");

  let rows = 3;
  let cols = 3;


  for (let i = 0 ; i < rows; i++){
    const divRow = document.createElement('div');
    divRow.classList.add("row");
    htmlBoard.appendChild(divRow);
    for(let j = 0; j < cols; j++){

      const button = document.createElement('button');

      button.setAttribute("row", i);
      button.setAttribute("col", j);

      button.addEventListener("click", (e) => {
        let row = e.target.getAttribute("row");
        let col = e.target.getAttribute("col");
        let player = game.getActivePlayer();

        game.playRound(row,col,player);
        button.textContent = player.mark;
      });

      divRow.appendChild(button);
    }
  }



}


ScreenController();