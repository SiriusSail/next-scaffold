import {TEST_OFF_OR_ON} from '../../config/reduxConstant';
import {testAPI} from '../../config/asynchronousList'

export function test_off (){
  return {
    type: TEST_OFF_OR_ON.OFF
  }
}
export function test_on (){
  return {
    type: TEST_OFF_OR_ON.ON
  }
}

export function changeTestAPI(data) {//获取订单列表
  return {
    types: TEST_OFF_OR_ON,
    promise: testAPI(data)
  };
}