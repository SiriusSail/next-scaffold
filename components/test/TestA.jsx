import React,{Component} from 'react';
import { connect } from 'react-redux';


class TestA extends Component{


  render() {

    const {testState} = this.props;
    return (
      <div>
        testA表示测试开关testB已经被{testState?"打开":"关闭"}
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
export default connect(bindStateUserLocation, {})(TestA);