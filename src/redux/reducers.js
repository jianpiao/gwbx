import { combineReducers } from 'redux';
import data from './data';


//  改变数据
function store(state = data, action) {
    switch (action.type) {
        case 'GET_REPAIR_LIST':
            return { ...state, getRepairList: action.text }    
        case 'IS_REFRESHING':
            return { ...state, isRefreshing: action.text }    
        default:
            return state;
    }
}

export default combineReducers({
    store
});