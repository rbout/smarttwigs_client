import {IUsernameState} from "./states/IUsernameState";
import {IUserServe} from "./states/IUserServe";
import {IOpponentServe} from "./states/IOpponentServe";

export interface IRootReducer {
    usernameReducer: IUsernameState
    userServeReducer:IUserServe
    opponentReducer:IOpponentServe
}