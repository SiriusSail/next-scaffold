import React,{Component} from 'react';
import { connect } from 'react-redux';
import {test_off, test_on} from "../../redux/actions/text_off_on_action";


class TestB extends Component{


  changeTest = () =>{
    this.props.testState ?this.props.test_off(): this.props.test_on();
  }

  render() {

    const {testState} = this.props;
    return (
      <div>
        <a onClick={this.changeTest}>{testState?"关闭":"打开"}测试开关</a>
      </div>
    )
  }
}



//需要从storeli面获取哪些值
function bindStateUserLocation(state) {
  return {
    testState: state.test_off_on.state,
  };
}
export default connect(bindStateUserLocation, {test_off, test_on})(TestB);