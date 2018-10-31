export const getRepairList = data => {    //  获取待处理维修订单列表
    return {
        type: 'GET_REPAIR_LIST',
        text: data
    }
}

export const getDoneRepairList = data => {    //  获取处理完成维修订单列表
    return {
        type: 'GET_DONE_REPAIR_LIST',
        text: data
    }
}

export const detail = data => {    //  详情
    return {
        type: 'DETAIL',
        text: data
    }
}

export const refreshing = data => {    //  刷新
    return {
        type: 'REFRESHING',
        text: data
    }
}

export const userInfo = data => {    //  获取用户信息
    return {
        type: 'USER_INFO',
        text: data
    }
}

export const notice = data => {    //  获取通知
    return {
        type: 'NOTICE',
        text: data
    }
}