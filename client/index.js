import React from 'react';
import ReactDOM from 'react-dom';
import RootApp from './app';

const el = document.getElementById('root');
const render = (Component) => {
    ReactDOM.render(<Component />, el);
};

render(RootApp);
if (module.hot) {
    require('preact/devtools');
    module.hot.accept('./app', () => {
        render(RootApp)
    });
}
