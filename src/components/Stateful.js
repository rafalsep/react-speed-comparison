import React, { Component, PureComponent } from 'react';
import workHard from '../workHard';
import package2 from '../../package-lock';

const aa = JSON.stringify(package2);

class Stateful extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    workHard();
    return <div>Hello Cmp1: stateful {aa}</div>;
  }
}

// Stateful.defaultProps = {
//   test: 'test',
//   test2: 'test2',
//   test3: 'test3'
// };

export default Stateful;
