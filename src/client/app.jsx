import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const App = () => {
    return (
    <div>
        Hello World
    </div>)
};

ReactDOM.render(<App/>, document.querySelector('.app'));