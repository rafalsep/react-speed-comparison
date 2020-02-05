import React, { useState } from 'react';
import { createStore, combineReducers, bindActionCreators, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Stateful from './components/Stateful';
import Stateless from './components/Stateless';
import testPerformance from './testPerformance';

const mapStateToProps = state => ({ iteration: state.funcVsClass.iteration, diff: state.funcVsClass.diff });

const measurePerfFunctional = dispatch => {
  const prev = performance.now();
  dispatch({ type: 'RENDER_FUNCTIONAL_START', start: prev });
  return new Promise(resolve => {
    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {
        dispatch({ type: 'RENDER_FUNCTIONAL', iteration: i });
        if (i === 9999) {
          dispatch({ type: 'RENDER_FUNCTIONAL_END', end: performance.now() - prev });
          // console.log(`Time: %c${Math.round(performance.now() - prevTime)}ms`, 'color:red');
          resolve();
        }
      }, 0);
    }
  });
};

export const measurePerformance = () => {
  return async dispatch => {
    for (let i = 0; i < 200; i++) {
      await measurePerfFunctional(dispatch);
    }
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ measurePerformance }, dispatch)
});

const Main = ({ actions, iteration, diff }) => {
  const startPerfTest = () => {
    actions.measurePerformance();
  };

  return (
    <div>
      <button onClick={startPerfTest}>render Stateless</button>
      {/*{diff.join(', ')}*/}
      <div>{diff.reduce((total, item) => total + item, 0) / diff.length}</div>
      <Stateful iteration={iteration} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
