import { all } from "redux-saga/effects";
import userSagas from './users/reducer'

export default function* rootSaga(){
    yield all([
        userSagas(),
    ])
}