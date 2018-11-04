import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

/* Import components */
import { MainNavigation } from './components/navbar';

/* Import views (pages) */
import { DashboardView } from './views/dashboard/dashboard';
import { EpisodeListView } from './views/episodes/episodes'
import { TokensView } from './views/tokens/tokens';
import { BackupsView } from './views/backups/backups';

class App extends React.Component {

    public render() {

        return (
            <BrowserRouter>
                <div>
                    <MainNavigation />
                    <Switch>
                        <Route path="/dashboard" exact name="dashboard" component={DashboardView} />
                        <Route path="/dashboard/episodes" name="episodes" component={EpisodeListView} />
                        <Route path="/dashboard/tokens" name="tokens" component={TokensView} />
                        <Route path="/dashboard/backups" name="backups" component={BackupsView} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
