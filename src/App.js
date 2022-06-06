import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const DEFAULT_BOARD = [null, null, null, null, null, null, null, null, null];

function Square({ i, player, setPlayer, board, setBoard, winner, reset }) {
  const [figure, setFigure] = useState('');
  // const [ableToClick, setAbleToClick] = useState(true);
  // if (reset) {
  //   setFigure('');
  // }
  useEffect(() => {
    setFigure('');
  }, [reset]);
  const handleClick = () => {
    if (!winner) {
      if (board[i] === null) {
        setPlayer(player === 1 ? 2 : 1);
        setFigure(player === 1 ? 'X' : 'O');
        setBoard([...board.slice(0, i), player === 1 ? 'X' : 'O', ...board.slice(i + 1)]);
        // setAbleToClick(false);
      }
    }
  }
  return (
    <div
      onClick={handleClick}
      className="square"
      style={squareStyle}>
      {figure}
    </div>
  );
}

function Board() {
  const [player, setPlayer] = useState(1);
  const [board, setBoard] = useState(DEFAULT_BOARD)
  const calculateWinner = (squares) => {
    if (squares[0] && squares[0] === squares[1] && squares[1] === squares[2]) {
      return squares[0];
    }
    if (squares[3] && squares[3] === squares[4] && squares[4] === squares[5]) {
      return squares[3];
    }
    if (squares[6] && squares[6] === squares[7] && squares[7] === squares[8]) {
      return squares[6];
    }
    if (squares[0] && squares[0] === squares[3] && squares[3] === squares[6]) {
      return squares[0];
    }
    if (squares[1] && squares[1] === squares[4] && squares[4] === squares[7]) {
      return squares[1];
    }
    if (squares[2] && squares[2] === squares[5] && squares[5] === squares[8]) {
      return squares[2];
    }
    if (squares[0] && squares[0] === squares[4] && squares[4] === squares[8]) {
      return squares[0];
    }
    if (squares[2] && squares[2] === squares[4] && squares[4] === squares[6]) {
      return squares[2];
    }
    return null;
  }
  useEffect(() => {
    calculateWinner(board);
  }, [board]);
  
  const [boardReset, setBoardReset] = useState(false);
  const reset = () => {
    setPlayer(1);
    setBoard([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
    setBoardReset(!boardReset);
  }
  console.log(board);
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>
        {
          calculateWinner(board) === 'X' ? 'Player 1' : calculateWinner(board) === 'O' ? 'Player 2' : ''
        }
      </span></div>
      <button onClick={reset} style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square reset={boardReset} winner={calculateWinner(board)} i={0} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
          <Square reset={boardReset} winner={calculateWinner(board)} i={1} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
          <Square reset={boardReset} winner={calculateWinner(board)} i={2} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square reset={boardReset} winner={calculateWinner(board)} i={3} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
          <Square reset={boardReset} winner={calculateWinner(board)} i={4} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
          <Square reset={boardReset} winner={calculateWinner(board)} i={5} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square reset={boardReset} winner={calculateWinner(board)} i={6} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
          <Square reset={boardReset} winner={calculateWinner(board)} i={7} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
          <Square reset={boardReset} winner={calculateWinner(board)} i={8} player={player} setPlayer={setPlayer} board={board} setBoard={setBoard} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game