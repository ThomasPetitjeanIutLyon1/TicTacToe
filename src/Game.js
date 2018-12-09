import React from "react";
import Board from "./Board";
import calculateWinner from "./calculateWinner";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      playerScores: Array(2).fill(0),
      isWinned: false,
      theme: {}
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  addPointToO = () => {
    let tmp = this.state.playerScores;
    tmp[0] += 1;
    this.setState({
      playerScores: tmp,
      isWinned: true
    });
  };

  addPointToX = () => {
    let tmp = this.state.playerScores;
    tmp[1] += 1;
    this.setState({
      playerScores: tmp,
      isWinned: true
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      if (!this.state.isWinned) {
        this.state.xIsNext ? this.addPointToX() : this.addPointToO();
      }

      status = "Winner: " + winner;
    } else if (winner === false) {
      status = "Match nul";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    let move = this.state.stepNumber;
    return (
      <div>
        <button
          style={{ marginTop: 10 }}
          onClick={() => {
            if (move - 1 >= 0) this.jumpTo(move - 1);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (move + 1 < this.state.history.length) this.jumpTo(move + 1);
          }}
        >
          Next
        </button>
        <div className="game">
          <div className="game-board">
            <Board
              style={this.state.theme}
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button
              style={{ marginTop: 10 }}
              onClick={() =>
                this.setState({
                  history: [
                    {
                      squares: Array(9).fill(null)
                    }
                  ],
                  stepNumber: 0,
                  xIsNext: true,
                  isWinned: false
                })
              }
            >
              Restart
            </button>
            <button
              style={{ marginTop: 10 }}
              onClick={() =>
                this.setState({
                  history: [
                    {
                      squares: Array(9).fill(null)
                    }
                  ],
                  stepNumber: 0,
                  xIsNext: true,
                  playerScores: Array(2).fill(0),
                  isWinned: false
                })
              }
            >
              Reset Game
            </button>
            <div>
              Score O : {this.state.playerScores[1]}
              <br />
              Score X : {this.state.playerScores[0]}
            </div>
            {this.state.isWinned && (
              <img
                src="https://media.giphy.com/media/eoxomXXVL2S0E/giphy.gif"
                title="win gif"
              />
            )}
          </div>
          <div className="themes" style={{ marginLeft: 8, fontSize: 40 }}>
            Chose Theme
            <button
              style={{ marginTop: 10 }}
              onClick={() =>
                this.setState({
                  theme: {
                    background: "#5e5e5e",

                    color: "#ddd"
                  }
                })
              }
            >
              Default Theme
            </button>
            <button
              style={{ marginTop: 10 }}
              onClick={() =>
                this.setState({
                  theme: {
                    background: "#cc2900",
                    color: "#ddd"
                  }
                })
              }
            >
              Red Theme
            </button>
            <button
              style={{ marginTop: 10 }}
              onClick={() =>
                this.setState({
                  theme: {
                    background: "#3366ff",
                    color: "#ddd"
                  }
                })
              }
            >
              Blue Theme
            </button>
            <button
              style={{ marginTop: 10 }}
              onClick={() =>
                this.setState({
                  theme: {
                    background: "#FFF",
                    color: "#222"
                  }
                })
              }
            >
              White Theme
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
