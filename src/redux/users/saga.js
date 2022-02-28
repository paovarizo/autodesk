import
    { SHOW_USERS,
    ADD_USER} 
    from "../actions";
import axios from "axios";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { addUserError, addUserSuccess, showUserError, showUserSuccess } from "./actions";

export function* watchShowUser(){
    yield takeEvery(SHOW_USERS,userShow);
}

const showUserApi= async ()=>{
    await axios.get('https://getusers.free.beeceptor.com/users-autodesk',{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

function* userShow({payload}){
    try{
        console.log("Start saga.showUsers...");
        const resShowUser= yield call(showUserApi,payload.user);
        console.log("Respond saga.showUsers...");
        if(resShowUser.data.succes){
            console.log("Success saga.showUsers...");
            yield put(showUserSuccess(resShowUser.data));
        }else{
            console.log("Error saga.showUsers...");
            yield put(showUserError(resShowUser.data));
        }
    }catch(error){
        console.log("Error saga.showUsers...");
        console.log(error);
        yield put(showUserError(error));
    }
}

export function* watchAddUser(){
    yield takeEvery(ADD_USER,userAdd);
}

const addUserApi= async ()=>{
    await axios.get('https://getusers.free.beeceptor.com/users-autodesk',{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

function* userAdd({payload}){
    try{
        console.log("Start saga.addUsers...");
        const resAddUser= yield call(addUserApi,payload.user);
        console.log("Respond saga.addUsers...");
        if(resAddUser.data.succes){
            console.log("Success saga.addUsers...");
            yield put(addUserSuccess(resAddUser.data));
        }else{
            console.log("Error saga.addUsers...");
            yield put(addUserError(resAddUser.data));
        }
    }catch(error){
        console.log("Error saga.addUsers...");
        console.log(error);
        yield put(addUserError(error));
    }
}

export default function* rootSaga(){
    yield all([
        fork(watchShowUser),
        fork(watchAddUser),
    ])
}