import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './containers/App';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import { unregister } from './registerServiceWorker';

const history = createBrowserHistory();

ReactDOM.render((
    <HashRouter history={history}>
        <Switch>
            <Route path="/" name="Home" component={App}/>
        </Switch>
    </HashRouter>
), document.getElementById('root'));

unregister();
