// 原始默认state
const data = {
    getRepairList: [
        {
            "repair_id": 2, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540980980782&di=ba44cfddc47c65cb36b3f6a303e9e828&imgtype=0&src=http%3A%2F%2Ffile29.mafengwo.net%2FM00%2F7B%2F34%2FwKgBpVYdGOiAS71LAABuKaLQB_887.groupinfo.w600.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540980980782&di=ba44cfddc47c65cb36b3f6a303e9e828&imgtype=0&src=http%3A%2F%2Ffile29.mafengwo.net%2FM00%2F7B%2F34%2FwKgBpVYdGOiAS71LAABuKaLQB_887.groupinfo.w600.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540980980782&di=ba44cfddc47c65cb36b3f6a303e9e828&imgtype=0&src=http%3A%2F%2Ffile29.mafengwo.net%2FM00%2F7B%2F34%2FwKgBpVYdGOiAS71LAABuKaLQB_887.groupinfo.w600.jpeg'], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 3, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 4, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 5, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 6, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 7, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 8, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        }, {
            "repair_id": 9, "user_name": "黄焯宇", "phone_number": "18929888220", "campus": 1, "campus_name": "高要校区", "building": "40", "dormitory": "40230", "repair_content": "我们的灯管坏了", "incidental_picture": [], "up_time": "2018-03-26 21:24:02", "processing_time": "2018-10-28 21:15:02", "repair_state": 2, "reply": "对不起，填写的信息不正确，请重新提交", "admin_id": null, "group": 13, "evaluate": "", "score": 0, "m_notes": "", "disObj_id": 13, "disObj_name": "1队", "admin_name": "[未分配]"
        },
    ],
    getDoneRepairList: [],
    detail: '',
    refreshing: false,
    userInfo: '',
    notice: [
        { "notice_id": 14, "notice_publisher": 1, "admin_name": "admin", "notice_type": 1, "notice_title": "我是", "notice_content": "123123", "release_time": "2018-04-16 10:47:42", "notice_state": 1, "default": 1 },
        { "notice_id": 15, "notice_publisher": 1, "admin_name": "admin", "notice_type": 1, "notice_title": "我是", "notice_content": "123123", "release_time": "2018-04-16 10:47:42", "notice_state": 1, "default": 1 },
        { "notice_id": 16, "notice_publisher": 1, "admin_name": "admin", "notice_type": 1, "notice_title": "我是", "notice_content": "123123", "release_time": "2018-04-16 10:47:42", "notice_state": 1, "default": 0 }
    ]
}

export default data