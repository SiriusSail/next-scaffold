import {TEST_OFF_OR_ON} from '../../config/reduxConstant';

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