import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//const appComponent = <div><App/></div>

//ReactDOM.render(appComponent, document.getElementById('root') as HTMLElement)

ReactDOM.render( <BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'));


