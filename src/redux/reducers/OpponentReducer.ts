import {IOpponentServe} from "../states/IOpponentServe";
import {AnyAction} from "redux";
import {EOpponentActions} from "../actions/OpponentActions";

const DEFAULT_STATE: IOpponentServe = {
    opponentServe: false
};

export function opponentReducer(state = DEFAULT_STATE, action: AnyAction): IOpponentServe {
    switch (action.type) {
        case EOpponentActions.CHANGE_OPPONENTSERVE:
            return {...state, opponentServe:action.opponentServe};
        default:
            return state;
    }
}