import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

/* Import components */
import { MainNavigation } from './components/navbar';

/* Import views (pages) */
import { DashboardView } from './views/dashboard';

class App extends React.Component {

    public render() {

        return (
            <BrowserRouter>
                <div>
                    <MainNavigation />
                    <Switch>
                        <Route path="/" name="dashboard" component={DashboardView} /> 
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
