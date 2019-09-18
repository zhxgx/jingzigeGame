import React from "react"
class Square extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     value: null,
    //     };
    // }
    render() {
        return (
          <button className="square"  
          //3. onClick={() => this.setState({value:"X"})
            // 2.alert("click")
          onClick={() => this.props.onClick()
          }>
            {/* TODO */}
            {/*1. this.state.value */}
            {this.props.value}
          </button>
        );
    }
}
export default Square;