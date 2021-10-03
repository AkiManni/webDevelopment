import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App 
                  applicationName={ "Create react app shopping list" }
                  applicationDescription= { "Buttons either generate missing food items, or insert some into already existing quantity - random amount between 1-10 into each." } />,
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
