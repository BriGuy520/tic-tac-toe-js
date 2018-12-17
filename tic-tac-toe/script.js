var origBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){

  // this sets the display property to none for the endgame class element
  document.querySelector('.endgame').style.display = 'none';

  // This is a way to make an Array be every number from 0 to 9
  origBoard = Array.from(Array(9).keys());

  for(let i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square){
  turn(square.target.id, humanPlayer);
}

function turn(squareId, player){
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null; 
  for(let [index, win] of winningCombos.entries()){
    if(win.every(element => plays.indexOf(element) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for(let index of winningCombos[gameWon.index]){
    document.getElementById(index).style.backgroundColor = gameWon.player === humanPlayer ? 'blue' : 'red';
  }

  for(let i = 0; i < cells.length; i++){
    cells[i].removeEventListener('click', turnClick, false);
  }

}
