import React from "react";
import Board from "./board";

function calculateWinner(squares) {
  // here squares = ["", "", "", "", "", "", "", "",""];
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  state = {
    // history is an Array. Which contain squares Array. squares = ["", "", "", "", "", "", "", "",""];
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  };
  handleClick = (i) => {
    // console.log(i);
    // here history is an array {squares = ["", "", "", "", "", "", "", "",""]}, {squares = ["", "", "", "", "", "", "", "",""]}, {squares = ["", "", "", "", "", "", "", "",""]},{squares = ["", "", "", "", "", "", "", "",""]}
    // it's size depends on step number
    // if step is 5. we got an array with 5 elements. history = [{squares = ["", "", "", "", "", "", "", "",""]}, {squares = ["", "", "", "", "", "", "", "",""]}, {squares = ["", "", "", "", "", "", "", "",""]}, {squares = ["", "", "", "", "", "", "", "",""]},{squares = ["", "", "", "", "", "", "", "",""]} ]
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // so we have 5 elements array in history.
    // current part start
    // but now we work with last element, which called current.
    const current = history[history.length - 1];
    // so now, current = {squares = ["", "", "", "", "", "", "", "",""]}
    // squares part start
    // we slice for only ["", "", "", "", "", "", "", "",""]
    const squares = current.squares.slice();
    // and put this ["", "", "", "", "", "", "", "",""] into squares.
    // I  mean squares = ["", "", "", "", "", "", "", "",""];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Main code, which is put the value in squares array
    // here we put x and o in squares = ["", "", "", "", "", "", "", "",""]
    // by press index number
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    // Main code end with squares array.
  };
  // handleClick's work end with complete history. Where we have 9 elements.
  // like squares = ["x", "o", "x", "o", "", "", "", "",""]
  // last element is like of this squares = ["x", "o", "x", "o", "x", "o", "x", "o","x"]
  // actually not like that.
  // we put x or o not serially.
  // Maybe it can squares = ["x", "x", "x", "", "o", "o", "o", "","x"]

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((a, move) => {
      const desc = move ? "Go to Move #" + move : "Go to Game Start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status = "";
    if (winner) {
      status = "winner " + winner;
    } else {
      status = "Next Player" + (this.state.xIsNext ? " X" : " O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
