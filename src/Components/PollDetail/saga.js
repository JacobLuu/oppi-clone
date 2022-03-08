import { put, call, takeEvery, select } from "redux-saga/effects";
import { fetchDataPollAction, setDataPoll, updatePollAction } from "./reducer";
import {
  fetchDataPollDetail,
  updatePoll,
} from "../../services/PollDetailService";
import { STATUS_CODE } from "../../constants/status";

function* fetchPollDetailWorker({ payload }) {
  try {
    const response = yield call(fetchDataPollDetail, payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put(setDataPoll(response.data));
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* updatePollWorker({ payload: { data, pollId } }) {
  const dataPoll = yield select((state) => state.polldetail.dataPoll);
  if (data.title && data.question && data.description) {
    const dataUpdate = {
      ...dataPoll,
      name: data.title.trim(),
      question: data.question.trim(),
      description: data.description.trim(),
      is_turn_on_intergration_setting: true,
      passcode: "2123124",
    };
    console.log(dataUpdate);
    yield call(updatePoll, { pollId, dataUpdate });
    yield put(fetchDataPollAction(pollId));
  }
}

export default function* pollDetailSaga() {
  yield takeEvery(fetchDataPollAction, fetchPollDetailWorker);
  yield takeEvery(updatePollAction, updatePollWorker);
}
