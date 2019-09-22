//函数式组件
import React from "react";

//关于状态的提升
/**
 * Square的状态提升到共同分父组件Board完成状态的改变，在通过props传递到子组件Square中
 */

function Square(props) {  //函数形式的组件，父组件传过来的props数据以接受的参数形式
  /**
   * 在 React 组件的构造方法 constructor 当中，你可以通过 this.state 为该组件设置自身的初始状态数据。
   * 由于状态的提升props传过来的数据，开始的系统开始的时候不必要在本组件中储存数据用于初始化，所以它现在已经不需要保存 state 了，就删除了。
   */
  return (
    <botton className="square"
      //当点击事件触发时，执行传过来的函数
      onClick={props.onClick}>
      {/* value是props传过来的值，显示出结果 */}
      {props.value} 
    </botton>
  );
}
//把类或函数以模块的形式导出去
export default Square;