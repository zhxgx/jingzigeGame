import React from "react"
import Square from "./components/square"
/**
 * 状态的提升
 */

// 类组件
class Board extends React.Component {

  // 1. static defaultProps
  // 2. constrcutor
  // 3. componentWillMount
  // 4. render
  // 5. componentDidMount
  // 6. state或者props改变都会调用render

  /**
   * 将 Board 中的状态数据全都移动到 Game 组件当中。所以构造方法 constructor（即state状态） 删除。
   */
 

  // 组件挂载完成执行   执行一次
  componentDidMount() { 

  }

  //方法，当在对应的方格点击时，触发的方法。此方法想要传递的值通过props传递到子组件Square中
  renderSquare(i) {
    return (
      <Square
        /**
         * 接收从Game传过来的值，再把得到的数据传到Square中
         * this.propps接收到父组件game传过来的值
         */
        value={this.props.squares[i]} //得到的值是X或O
        onClick={() => this.props.onClick(i)} //触发点击的某一个方格
      />
    )
  }

  // 渲染页面
  render() { 
     
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
   
}
  // 到处组件    es6语法
  export default Board;