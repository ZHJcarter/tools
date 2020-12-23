import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/index.jsx';
import style from './styles.css'

const renderApp = store => {
    // debugger;
    // if (document.readyState === 'loading') {
    //     document.addEventListener('DOMCotentLoaded', render)
    // } else {
    //     render();
    // }

    // function render() {

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    )

    // }
}

let store;

const startClient = state => {
    renderApp();
}

startClient();

export function render({
    domNode,
    props = { props: {} } = {}
}) {
    ReactDOM.render(<App key={domNode.id} props={props} />, domNode || domNode.getElementById('root'))
};
