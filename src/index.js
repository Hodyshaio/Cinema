import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducers';
import thunk from 'redux-thunk'; 

//const store = createStore(rootReducer,applyMiddleware(thunk));

//ReactDOM.render(<App />,document.getElementById("root"));

ReactDOM.render(
    <Provider store={createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())} >
        <App />
    </Provider>,
    document.getElementById("root")
);

