import React from 'react';
import Paper from "@material-ui/core/Paper"
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import {IRootReducer} from "../redux/IRootReducer";
import {useSelector} from 'react-redux';
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch} from "react-redux";
import {changeOpponentServe} from "../redux/actions/OpponentActions";
import {changeUserServe} from "../redux/actions/UserServeActions";

export const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'fit-content',
        textAlign: 'center',
        margin: 'auto',
    },
}));

export interface ICreateGame {
    history:any
    opponent: string
    setOpponent:any
}

export interface IUser {
    username:string
}

export default function CreateGame(props:ICreateGame) {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [users, setUsers] = React.useState([]);

    const username: string = useSelector<IRootReducer, string>(
        state => state.usernameReducer.username
    );

    const userServe: boolean = useSelector<IRootReducer, boolean>(
        state => state.userServeReducer.userServe
    );

    const opponentServe: boolean = useSelector<IRootReducer, boolean>(
        state => state.opponentReducer.opponentServe
    );

    React.useEffect(() => {
        Axios.get('http://localhost:4000/user').then(function (response) {
            setUsers(response.data);
        });
        console.log(username);
    }, [username]);

    function handleSelectChange(event: React.ChangeEvent<{value: unknown}>) {
        props.setOpponent(event.target.value as string);
    }

    async function handleCreateGameClick() {
        const game = {
            firstUser: username,
            secondUser: props.opponent,
        };
        await Axios.post('http://localhost:4000/game', game);
        props.history.push('/game');
    }

    function handleOpponentServeClick() {
        dispatch(changeOpponentServe(true));
        handleCreateGameClick();
    }

    function handleUserServeClick() {
        dispatch(changeUserServe(true));
        handleCreateGameClick();
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <Select value={props.opponent} onChange={handleSelectChange}>
                    {users.map((user:IUser) => {
                        return <MenuItem value={user.username}>{user.username}</MenuItem>
                    })}
                </Select>
                <Button onClick={handleOpponentServeClick}>Opponent's serve</Button>
                <Button onClick={handleUserServeClick}>User's serve</Button>
            </Paper>
        </div>
    )
}