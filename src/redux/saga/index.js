import { all } from "redux-saga/effects";
import loginSaga from "../../Components/Login/saga";
import polllistSaga from "../../Components/PollList/saga";

export default function* rootSaga() {
  yield all([loginSaga(), polllistSaga()]);
}
