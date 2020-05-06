import React from 'react';
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import {IRootReducer} from "../redux/IRootReducer";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch} from "react-redux";
import {changeOpponentServe} from "../redux/actions/OpponentActions";
import {changeUserServe} from "../redux/actions/UserServeActions";
import Axios from 'axios';

export interface IGame {
    history:any
    opponent:string
}

export const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'fit-content',
        textAlign: 'center',
    },
}));

export default function Game(props:IGame) {

    const dispatch = useDispatch();

    const classes = useStyles();

    const [opponentScore, setOpponentScore] = React.useState(0);

    const [userScore, setUserScore] = React.useState(0);

    const [counter, setCounter] = React.useState(1);

    const username: string = useSelector<IRootReducer, string>(
        state => state.usernameReducer.username
    );

    const userServe: boolean = useSelector<IRootReducer, boolean>(
        state => state.userServeReducer.userServe
    );

    const opponentServe: boolean = useSelector<IRootReducer, boolean>(
        state => state.opponentReducer.opponentServe
    );

    async function handleOpponentScoreClick() {
        await setOpponentScore(opponentScore + 1);
        await setCounter(counter + 1);
        if(counter % 2 === 0) {
            dispatch(changeOpponentServe(!opponentServe));
            dispatch(changeUserServe(!userServe));
        }
    }

    async function handleUserScoreClick() {
        await setUserScore(userScore + 1);
        await setCounter(counter + 1);
        if(counter % 2 === 0) {
            dispatch(changeOpponentServe(!opponentServe));
            dispatch(changeUserServe(!userServe));
        }
    }

    async function handleWin() {
        const opponentUser = {
            username: props.opponent,
            pointsScored: opponentScore
        };
        const user = {
            username: username,
            pointsScored: userScore
        };
        await Axios.post('/user/score', opponentUser);
        await Axios.post('/user/score', user);
    }

    return (
        <div>
            <Paper className={classes.paper}>
                {props.opponent}
                <br/>
                {opponentScore}
                <br/>
                {!((opponentScore === 11 && userScore < 9) || (userScore >= 9 && opponentScore >= 9 && opponentScore - userScore >= 2)
                || (userScore >= 9 && opponentScore >= 9 && userScore - opponentScore >= 2)) &&
                <Button onClick={handleOpponentScoreClick}>scored</Button>}
                {opponentServe && <div>serve</div>}
                {((opponentScore === 11 && userScore < 9) || (userScore >= 9 && opponentScore >= 9 && opponentScore - userScore >= 2)) &&
                <div onLoad={handleWin}>you win</div>}
            </Paper>
            vs
            <Paper className={classes.paper}>
                {username}
                <br/>
                {userScore}
                <br/>
                {!((userScore === 11 && opponentScore < 9) || (userScore >= 9 && opponentScore >= 9 && userScore - opponentScore >= 2)
                || (userScore >= 9 && opponentScore >= 9 && opponentScore - userScore >= 2)) &&
                <Button onClick={handleUserScoreClick}>scored</Button>}
                {userServe && <div>serve</div>}
                {((userScore === 11 && opponentScore < 9) || (userScore >= 9 && opponentScore >= 9 && userScore - opponentScore >= 2)) &&
                <div onLoad={handleWin}>you win</div>}
            </Paper>
        </div>
    )
}