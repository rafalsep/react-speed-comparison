import React, {createElement, Component, useState} from "react";
import {render} from "react-dom";
import Memo from './components/Memo'
import Pure from './components/Pure'
import Stateful from './components/Stateful'
import Stateless from './components/Stateless'

const components = [
    {component: Stateless, name: "Stateless"},
    {component: Stateful, name: "Stateful"},
    {component: Pure, name: "Pure"},
    {component: Memo, name: "Memo"}
];

const Wrapper = () => {
  let iterations = 0;
  if(iterations++ < 100) {
    return <Stateless iterations={iterations}/>;
  }

}

const Main = () => {

    const [showStateless, toggleStateless] = useState(0);

    const renderStatelessComponent = () => {
      toggleStateless(!showStateless);
    };

    return <div>
        <button onClick={renderStatelessComponent}>render Stateless</button>
        {showStateless && <Wrapper/>}
    </div>;
}

render(
    <Main/>,
    document.getElementById("main")
);




