import { combineReducers } from "redux";
import loginReducer from "../../Components/Login/reducer";
import polllistReducer from "../../Components/PollList/reducer";
const rootReducer = combineReducers({
  login: loginReducer,
  polllist: polllistReducer,
});

export default rootReducer;
