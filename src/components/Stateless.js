import React from 'react';
import workHard from '../workHard';
import package2 from '../../package-lock';

const aa = JSON.stringify(package2);

const Stateless = ({ iteration }) => {
  workHard();
  return <div>Hello Cmp3: stateless {aa}</div>;
};

// Stateless.defaultProps = {
//     test: 'test',
//     test2: 'test2',
//     test3: 'test3',
// };

export default Stateless;
