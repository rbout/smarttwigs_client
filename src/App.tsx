import React from 'react';
import Button from '@material-ui/core/Button';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import CreateGame from "./components/CreateGame";
import Game from "./components/Game";

const theme = createMuiTheme({
    typography : {
        h1: {
            fontWeight: 'bold',
            fontSize: '5rem',
            fontFamily: 'Roboto, sans-serif'
        },
        body1: {
            fontFamily: 'Open Sans, sans-serif'
        }
    }
});

function App() {

    const [opponent, setOpponent] = React.useState('');

      return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <Route exact={true} path={'/login'} render={({history}) => (<Login history={history} />)} />
                    <Route exact={true} path={'/register'} render={({history}) => (<Register history={history} />)} />
                    <Route exact={true} path={'/creategame'} render={({history}) => (<CreateGame
                        history={history}
                        opponent={opponent}
                        setOpponent={setOpponent}
                    />)} />
                    <Route exact={true} path={'/game'} render={({history}) => (<Game
                        history={history}
                        opponent={opponent}
                    />)} />
                    <Route exact={true} path={'/'} render={({history}) => (
                        <div>
                            <Button onClick={() => history.push('/login')}>Login</Button>
                            <Button onClick={() => history.push('/register')}>Register</Button>
                        </div>
                    )} />
                </Router>
            </ThemeProvider>
        </div>
  );
}

export default App;
