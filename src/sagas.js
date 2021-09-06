import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
//import AppRh from "./App.rh";

const requestList = () => {
  return { type: "REQUESTED_List" };
};

const requestListSuccess = (data) => {
  return { type: "REQUESTED_List_SUCCEEDED", payload: data };
};

const requestListError = () => {
  return { type: "REQUESTED_List_FAILED" };
};

export const fetchList = () => {
  return { type: "FETCHED_List" };
};

//Reducer
const initialState = {
  data: [],
  loaded: false,
  error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_List":
      console.log("initial");
      return {
        data: [],
        loaded: false,
        error: false,
      };
    case "REQUESTED_List_SUCCEEDED":
      console.log("succeeded");
      return {
        data: action.payload,
        loaded: true,
        error: false,
      };
    case "REQUESTED_List_FAILED":
      return {
        data: [],
        loaded: false,
        error: true,
      };
    default:
      return state;
  }
};

export function* watchFetchList() {
  console.log("saga");
  yield takeEvery("FETCHED_List", fetchListAsync);
}

function* rootSaga() {
  yield all([call(watchFetchList)]);
}

export function* fetchListAsync() {
  try {
    yield put(requestList());
    const data = yield call(() => {
      return fetch("https://jsonplaceholder.typicode.com/users").then(
        (responde) => responde.json()
      );
    });
    console.log(data);
    yield put(requestListSuccess(data));
  } catch (error) {
    yield put(requestListError());
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
