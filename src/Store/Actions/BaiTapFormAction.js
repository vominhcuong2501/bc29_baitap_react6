import { ADD_MEMBER, DELETE_MEMBER, EDIT_MEMBER, UPDATE_MEMBER } from "../Types/BaiTapFormType"


const addMemberAction = (values) => {
    return {
        type: ADD_MEMBER,
        payload: values
    }
}

const deleteMemberAction = (userName) => {
    return {
        type: DELETE_MEMBER,
        payload: userName
    }
}

const editMemberAction = (member) => {
    return {
        type: EDIT_MEMBER,
        payload: member
    }
}

const updateMemberAction = (values) => {
    return {
        type: UPDATE_MEMBER,
        payload: values
    }
}


export {addMemberAction, deleteMemberAction, editMemberAction, updateMemberAction}