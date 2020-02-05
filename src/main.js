import React, { createElement, Component, useState } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, bindActionCreators, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { createSelector } from 'reselect';
import Memo from './components/Memo';
import Pure from './components/Pure';
import Stateful from './components/Stateful';
import Stateless from './components/Stateless';
import testPerformance from './testPerformance';

let prevTime;

const components = [
  { component: Stateless, name: 'Stateless' },
  { component: Stateful, name: 'Stateful' },
  { component: Pure, name: 'Pure' },
  { component: Memo, name: 'Memo' }
];

const todos = (state = { awe: { cc: 'cc' } }, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, text: action.text };
    case 'UPDATE_TODO':
      return { ...state, text: action.text };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunkMiddleware)));

// const mapStateToProps = createSelector(
//   state => state.todos,
//   todos => todos.text
// );

const selectorM = createSelector(
  state => state.todos,
    todos => todos.text
);

const mapStateToProps = state => ({ text: state.todos.text });

export const addTodo = text => {
  prevTime = performance.now();
  return dispatch => {
    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {
        dispatch({ type: 'ADD_TODO', text: i });
        if (i === 9999) {
          console.log(`Time: %c${Math.round(performance.now() - prevTime)}ms`, 'color:red');
        }
      }, 0);
    }
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTodo }, dispatch)
});

let a = 0;

const Main = ({ actions, text }) => {
  //console.log('render');
  const [showStateless, toggleStateless] = useState(0);

  const renderStatelessComponent = () => {
    for (let i = 0; i < 10; i++) testPerformance(Stateful);
  };

  const renderStatelessComponent2 = () => {
    //for (let i = 0; i < 10000; i++) {
    const test = {};
    actions.addTodo(test);
    //}
  };

  return (
    <div>
      <button onClick={renderStatelessComponent2}>render Stateless</button>
      <div id="pureVsStateless"></div>
      {/*{text}*/}
    </div>
  );
};

const MainConnect = connect(mapStateToProps, mapDispatchToProps)(Main);

render(
  <Provider store={store}>
    <MainConnect />
  </Provider>,
  document.getElementById('main')
);
