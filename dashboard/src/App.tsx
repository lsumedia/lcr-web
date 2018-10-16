import * as React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { MainNavigation } from './components/navbar';

class App extends React.Component {

    public render() {

        return (
          <div className="App">
              <MainNavigation />
          </div>
        );
    }
}

export default App;
