import React from "react";
import workHard from "../workHard";

const Stateless = ({ iteration, test = 'test', test2 = 'test2', test3 = 'test3'}) => {
    workHard();
    return <div>Hello Cmp3: stateless {iteration}</div>;
}

// Stateless.defaultProps = {
//     test: 'test',
//     test2: 'test2',
//     test3: 'test3',
// };

export default Stateless;
