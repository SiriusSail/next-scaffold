import React, {Component} from 'react';
import {connect} from 'react-redux';
import {test_off, test_on, changeTestAPI} from "../../redux/actions/text_off_on_action";


class TestB extends Component {

  state = {
    userName: "",
    password: "",
    testAPIState: ""
  };

  changeTest = () => {
    this.props.testState ? this.props.test_off() : this.props.test_on();
  };

  testAPI = () => {
    const me = this;
    const {userName, password} = this.state;
    this.props.changeTestAPI({userName, password}).then(data => {
      me.setState({testAPIState: "请求成功"})
    })
  };

  render() {

    const me = this;
    const {testState} = this.props;
    return (
      <div>
        <div>
          <input
            type="text"
            // value={this.state.userName}
            onChange={e => {
              const value = e.target.value;
              me.setState({userName:value});
            }}/>
        </div>
        <div>
          <input
            type="text"
            // value={this.state.password}
            onChange={e => {
              const value = e.target.value;
              me.setState({password:value});
            }}/>
        </div>
        <div><button onClick={this.testAPI}>通过axios打开开关</button></div>
        <div>{this.state.testAPIState}</div>

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

export default connect(bindStateUserLocation, {test_off, test_on, changeTestAPI})(TestB);