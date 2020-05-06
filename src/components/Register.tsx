import React from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Axios from "axios";

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

export interface IRegister {
    history:any
}

export default function Register(props:IRegister) {

    const classes = useStyles();

    const [username, setUsername] = React.useState('');

    const [password, setPassword] = React.useState('');

    function handleUsernameChange(e: any) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value);
    }

    async function handleRegisterClick() {
        const user = {
            username,
            password
        };
        const response = await Axios.post('http://localhost:4000/user', user);
        console.log(response.status);
        setUsername('');
        setPassword('');
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
                <Button onClick={handleRegisterClick}>Register</Button>
                <Button onClick={handleBackClick}>Back</Button>
            </Paper>
        </div>
    )

}