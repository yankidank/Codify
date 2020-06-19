import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { config } from 'dotenv';
import * as serviceWorker from './serviceWorker';

config();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
