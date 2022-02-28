import { ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, SHOW_USERS, SHOW_USERS_ERROR, SHOW_USERS_SUCCESS } from "../actions"


export const showUser=(user)=>({
    type: SHOW_USERS,
    payload:{user}
})
export const showUserSuccess=(user)=>({
    type: SHOW_USERS_SUCCESS,
    payload: user
})
export const showUserError=(message)=>({
    type: SHOW_USERS_ERROR,
    payload: {message}
})
export const addUser =(user)=>({
    type: ADD_USER,
    payload:{user}
})
export const addUserSuccess =(user)=>({
    type:ADD_USER_SUCCESS,
    payload:user
})
export const addUserError=(message)=>({
    type:ADD_USER_ERROR,
    payload:{message}
})