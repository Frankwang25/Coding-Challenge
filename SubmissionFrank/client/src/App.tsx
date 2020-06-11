import * as React from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import EditMessage from './components/messages/EditMessage';
import ShowMessages from './components/messages/ShowMessages';
import ReviewMessage from './components/messages/ReviewMessage';

//Applying react router to switch to different component.
const App: React.FC = () => {
  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
          </ul>
        </nav>
        <Switch >
          <Route path={'/'} exact component={ShowMessages} />
          <Route path={'/edit/:id/:message'} exact component={EditMessage} />
          <Route path={'/review/:id/:message'} exact component={ReviewMessage} />
        </Switch>
      </div>
  );
}

export default App;
