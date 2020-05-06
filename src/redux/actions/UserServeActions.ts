export enum EUserActions {
    CHANGE_USERSERVE = "CHANGE_USERSERVE"
}

export function changeUserServe(userServe:boolean) {
    return {
        type: EUserActions.CHANGE_USERSERVE,
        userServe
    }
}