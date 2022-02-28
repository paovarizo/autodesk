import { ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, SHOW_USERS, SHOW_USERS_ERROR, SHOW_USERS_SUCCESS } from "../actions"

const INIT_STATE ={
    error:null,
    success:null
}

const UsersReducer=(state = INIT_STATE,action)=>{
    switch(action.type){
        case SHOW_USERS:
            return{...state,error:null};
        case SHOW_USERS_SUCCESS:
            return{...state,error:false, success:true};
        case SHOW_USERS_ERROR:
            return{...state,error:true,success:false};
        case ADD_USER:
            return{...state,error:null};
        case ADD_USER_SUCCESS:
            return{...state,error:false,success:true};
        case ADD_USER_ERROR:
            return{...state,error:true,success:false};
        default: return {...state};
    }
}

export default UsersReducer;