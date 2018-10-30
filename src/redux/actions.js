export const getRepairList = data => {    //  登录状态
    return {
        type: 'GET_REPAIR_LIST',
        text: data
    }
}

export const isRefreshing = data => {    //  登录状态
    return {
        type: 'IS_REFRESHING',
        text: data
    }
}

