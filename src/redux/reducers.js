import { combineReducers } from 'redux';
import data from './data';


//  改变数据
function store(state = data, action) {
    switch (action.type) {
        case 'GET_REPAIR_LIST':
            return { ...state, getRepairList: action.text }    
        case 'GET_DONE_REPAIR_LIST':
            return { ...state, getDoneRepairList: action.text }    
        case 'REFRESHING':
            return { ...state, refreshing: action.text }  
        case 'DETAIL':
            return { ...state, detail: action.text }   
        case 'USER_INFO':
            return { ...state, userInfo: action.text } 
        case 'NOTICE':
            return { ...state, notice: action.text } 
        default:
            return state;
    }
}

export default combineReducers({
    store
});