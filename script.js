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

    const getBoard = () => board;

    return {printBoard, placeMark, getBoard};
    
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
    mark: "./imgs/xSVG.svg"
  }
  const player2 = {
    name: "player2",
    mark: "./imgs/oSVG.svg"
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
    checkWin();
  }

  const checkWin = () => {
    let currBoard = board.getBoard();
    let row = currBoard[0].length;
    let col = currBoard.length;



    // check rows
    for(let i = 0; i < row; i++){
      if(currBoard[i][0] == currBoard[i][1] && currBoard[i][0] == currBoard[i][2]){
        console.log("win!");
      }
    }    
    // check cols
    for(let i = 0; i < col; i++){
      if(currBoard[0][i] == currBoard[1][i] && currBoard[0][i] == currBoard[2][i]){
        console.log("win!");

      }
    }    

    //check diag
    if (currBoard[0][0] == currBoard[1][1] && currBoard[0][0] == currBoard[2][2]){
      console.log("win!");
    }
    if (currBoard[0][2] == currBoard[1][1] && currBoard[0][2] == currBoard[2][0]){
      console.log("win!");
    }

  }

  return {playRound,
    swapPlayer,
    getActivePlayer,
    getBoard,
    checkWin
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
        // button.textContent = player.mark;
        let img = document.createElement('img');
        img.src = player.mark;

        button.appendChild(img);
      });


      
      divRow.appendChild(button);
    }
  }
}


ScreenController();