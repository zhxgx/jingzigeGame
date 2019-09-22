import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Board from "./board"
// import Square from "./components/square"
  
//状态的提升，把状态动作提升到公共的父类组件中


class Game extends React.Component {
  /**
   * 将 Board 中的状态数据全都移动到 Game 组件当中。Board 现在通过 props 获取从 Game 传递下来的数据和事件处理函数。
   */
  state = {
    //历史纪录状态
    history: [
      {
        squares : Array(9).fill(null)   //初始化方格数值为空
      }
      
    ],
    //设置轮流落子
    xIsNext: true,

    /**
       * 在上面的代码中，我们同样为每一个 <a> 添加了一个 jumpTo 方法，用来将棋盘的状态切换至对应的棋步时的状态。
       * 接下来我们来着手实现这个方法：
        首先在 Game 组件的初始状态中多设置一项 stepNumber: 0 ：
       */
    stepNumber: 0,
  }
  

  /**
   * 说明：现在每个格子当中的数据是存储在整个棋盘当中的，所以我们就需要通过一些方法，让格子组件能够修改整个棋盘组件数据的内容。
   * 因为每个组件的 state 都是它私有的，所以我们不可以直接在格子组件当中进行修改。
   */
  handleClick(i) { //修改当某个格子被点击时触发的事件处理函数。
    /**
     * 接下来，我们在 handleClick 方法中对 stepNumber 进行更新，
     * 添加 stepNumber: history.length 保证每走一步 stepNumber 会跟着改变：
     */
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // const history = this.state.history;//历史纪录,得到state状态中history数据 
    const current = history[history.length - 1]; //历史纪录的history数据数组长度
    const squares = current.squares.slice(); //复制并重新记录新的数组
    console.log("查看数据", history, current, squares)
    if (calculateWinner(squares) || squares[i]) { //添加当前方格内已经落子/有一方获胜就就无法继续落子的判断逻辑：如果符合条件就返回不执行handleClick函数
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; //轮流落子显示是谁落得子

    this.setState({
      //修改state中的数据。并更改
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }



  /**
   * 接下来，我们正是编写 jumpTo 来切换 stepNumber 的值。
   * 根据游戏的逻辑，与此同时我们还需要修改 xIsNext 来保证对应棋步时，执子的一方是能对应上的。我们可以根据棋步计算出是谁在执子。
   */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    })
  }
  render() {
    //注意：Game 组件的 render 方法现在则要负责获取最近一步的历史记录（当前棋局状态），以及计算出游戏进行的状态（是否有人获胜）。
    const history = this.state.history;
    // const current = history[history.length - 1];

    //根据当前的棋步获取对应的棋局状态了：
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    /**
     * 步骤17、展示每步历史记录链接
     */
    const moves = history.map((step, move) => {
      //map方法遍历出来每一步的落子情况
      const desc = move ? "Go To Move #" + move : "go to Game start";
      return (
        <li key={move}>
          {/* <a> 添加了一个 jumpTo 方法，用来将棋盘的状态切换至对应的棋步时的状态。 */}
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      );
    });

    let status; //记录下一步谁落子，或谁赢了
    if (winner) {
      //判断是谁赢了
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            //把得到的数据传递到Board中
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO*/ moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


/**
 * 步骤15.1、编写判断游戏获胜方的代码，首先在你的代码里添加下面这个判断获胜方的算法函数：
 * 步骤16.3、判断获胜方的代码必须自构造函数的下方
 */
function calculateWinner(squares) { //计算赢家的函数方法
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
