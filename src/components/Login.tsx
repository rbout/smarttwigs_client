import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Axios from "axios"
import {useDispatch} from "react-redux";
import {changeUsername} from "../redux/actions/UsernameActions";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'fit-content',
        textAlign: 'center',
        margin: 'auto',
    },
    textField: {
        display: 'block',
        margin: theme.spacing(1)
    }
}));

export interface ILogin {
    history:any
}

export default function Login(props:ILogin) {

    const classes = useStyles();

    const [username, setUsername] = React.useState('');

    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();

    function handleUsernameChange(e: any) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value);
    }

    async function handleLoginClick() {
        const user = {
            username:username,
            password:password
        };
        await Axios.post('http://localhost:4000/user/isValid', user);
        dispatch(changeUsername(username));
        setUsername('');
        setPassword('');
        props.history.push('/creategame');
    }

    function handleBackClick() {
        props.history.push('/');
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <TextField
                    label={'Username'}
                    value={username}
                    onChange={handleUsernameChange}
                    className={classes.textField}
                    variant={'outlined'}
                />
                <TextField
                    label={'password'}
                    value={password}
                    type={'password'}
                    onChange={handlePasswordChange}
                    className={classes.textField}
                    variant={'outlined'}
                />
                <Button onClick={handleLoginClick}>Login</Button>
                <Button onClick={handleBackClick}>Back</Button>
            </Paper>
        </div>
    )
}