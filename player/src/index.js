import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './containers/App';

import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import { unregister } from './registerServiceWorker';

const history = createBrowserHistory();

ReactDOM.render((
    <BrowserRouter history={history}>
        <Switch>
            <Route path="/" name="Home" component={App}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));

unregister();
