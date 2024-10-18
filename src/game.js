import { useState } from 'react';  
import './game.css';

function Tile({ value, onClick }) {
  return (
    <button className="tile" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); 
  const [isXTurn, setIsXTurn] = useState(true);  

  function handleClick(index) {
    if (squares[index] || findWinner(squares)) return;  

    const newSquares = squares.slice();  
    newSquares[index] = isXTurn ? 'X' : 'O';  
    setSquares(newSquares); 
    setIsXTurn(!isXTurn); 
  }

  const winner = findWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${isXTurn ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <Tile key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
    </div>
  );
}

function findWinner(squares) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  
    [0, 4, 8], [2, 4, 6]              
  ];

  for (let [a, b, c] of winningCombinations) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];  
    }
  }
  return null;  
}

export default function TicTacToeGame() {
  return (
    <div className="game-container">
      <Board />
    </div>
  );
}
