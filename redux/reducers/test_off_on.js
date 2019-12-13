import { TEST_OFF_OR_ON } from '../../config/reduxConstant';

//初始值
const initState = {
  state:false
}

export default function reducer(state = initState, action) {
  let result;
  switch (action.type) {
    case TEST_OFF_OR_ON.OFF:
      result = {
        ...state,
        state:false
      };
      break;
    case TEST_OFF_OR_ON.ON:
      result = {
        ...state,
        state:true
      };
      break;
    default:
      return state;
  }
  return result;
}