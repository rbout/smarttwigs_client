import {IUserServe} from "../states/IUserServe";
import {AnyAction} from "redux";
import {EUserActions} from "../actions/UserServeActions";

const DEFAULT_STATE: IUserServe = {
    userServe: false
};

export function userServeReducer(state = DEFAULT_STATE, action: AnyAction): IUserServe {
    switch (action.type) {
        case EUserActions.CHANGE_USERSERVE:
            return {...state, userServe:action.userServe};
        default:
            return state;
    }
}