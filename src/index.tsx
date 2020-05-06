import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from "redux";
import {usernameReducer} from "./redux/reducers/UsenameReducer";
import {userServeReducer} from "./redux/reducers/UserServeReducer"
import {opponentReducer} from "./redux/reducers/OpponentReducer";

const rootReducer = combineReducers({
    usernameReducer,
    userServeReducer,
    opponentReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
