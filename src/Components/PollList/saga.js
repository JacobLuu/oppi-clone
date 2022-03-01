import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  setOffset,
  pollId,
  setPolls,
  deletePollAction,
  setPages,
  getDataAction,
} from "./reducer";
import {
  getDataService,
  deletePollService,
} from "../../services/PollListService";
import { STATUS_CODE } from "../../constants/status";

function* getDataSaga() {
  const offset = yield select((state) => state.polllist.offset);
  console.log("offset : ", offset);
  try {
    const response = yield call(getDataService, offset);
    if (response.status === STATUS_CODE.SUCCESS) {
      const polls = yield call(getDataService, response.data.list);
      yield put(setPolls(polls));

      const pages = response.data.totalCount;
      pages % 10 === 0
        ? yield put(setPages(pages / 10))
        : yield put(setPages((pages - (pages % 10)) / 10 + 1));
    }
  } catch (error) {}
}

function* deletePollSaga() {
  const pollId = yield select((state) => state.polllist.pollId);
  const response = yield call(deletePollService, pollId);
  if (response.status === STATUS_CODE.SUCCESS) {
    console.log(`Delete poll have successfully`);
    yield put(getDataAction());
  }
}

export default function* polllistSaga() {
  yield takeEvery(getDataAction, getDataSaga);
  yield takeEvery(deletePollAction, deletePollSaga);
}
