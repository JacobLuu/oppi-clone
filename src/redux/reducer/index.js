import { combineReducers } from "redux";
import loginReducer from "../../Components/Login/reducer";
import polllistReducer from "../../Components/PollList/reducer";
import pollDetailReducer from "../../Components/PollDetail/reducer";
const rootReducer = combineReducers({
  login: loginReducer,
  polllist: polllistReducer,
  polldetail: pollDetailReducer,
});

export default rootReducer;
