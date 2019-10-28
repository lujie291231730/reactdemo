import React ,{ Component } from 'react';
import './game.css'
// import Hello from '../hello/hello'
import Button from 'antd/es/button';

interface SquareProps {
  value: string | null,
  onClick: Function
}

function Square(props:SquareProps) {
  function handClick() {
    props.onClick()
  }
  return (
    <button
      className="square" 
      // onClick={props.onClick/*handClick*/}
      onClick={handClick}
    >
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: (string | null)[],
  onClick: Function
}

class Board extends Component<BoardProps> {

  renderSquare(i:number) {
    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  renderBoard(index:number) {
    const arrayList = [1,2,3];
    return (
      <div className="board-row" key={index}>
        {arrayList.map((items, indexs) => {
          return this.renderSquare(index * 3 + indexs)
        })}
      </div>
    )
  }

  render() {
    const arrayList = [1,2,3];
    const list3 = arrayList.map((item, index) => {
      return this.renderBoard(index)
    })

    return (
      <div>
        {list3}
      </div>
    );
  }
}

interface GameState {
  xIsNext: boolean,
  stepNumber: number,
  history: { squares: (string | null)[] }[],
}


class Game extends Component<any,GameState> {

  state: GameState = {
    xIsNext: true,
    stepNumber: 0,
    history: [{
      squares: Array(9).fill(null),
    }],
  };

  handleClick(i:number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step:number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <Button type={'primary'} onClick={ () =>{this.jumpTo(move)} }>{desc}</Button>
        </li>
      )
    });

    let status;
    if(winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext? 'X' : 'O'}`
    }

    return (
      <div className="game">
        <Button type="primary">Button</Button>
        <Button></Button>
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i:number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: (string | null)[]) {
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

export default Game;
