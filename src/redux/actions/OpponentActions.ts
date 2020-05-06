export enum EOpponentActions {
    CHANGE_OPPONENTSERVE = "CHANGE_OPPONENTSERVE"
}

export function changeOpponentServe(opponentServe:boolean) {
    return {
        type: EOpponentActions.CHANGE_OPPONENTSERVE,
        opponentServe
    }
}