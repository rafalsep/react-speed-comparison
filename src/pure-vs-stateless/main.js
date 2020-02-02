import React, { createElement, Component } from "react";
import { render } from "react-dom";
import Memo from '../components/Memo'
import Pure from '../components/Pure'
import Stateful from '../components/Stateful'
import Stateless from '../components/Stateless'

let iterations;
let prevTime;
let currentCmp;
let max = 100000;


function* cmpCycle(components) {
  yield* components;
}

const components = [
  { component: Stateless, name: "Stateless" },
  { component: Stateful, name: "Stateful" },
  { component: Pure, name: "Pure" },
  { component: Memo, name: "Memo" }
];
const cmpSwitcher = cmpCycle(components);

function nextComponent() {
  console.log(
    "%c                                         ",
    "border-top: 1px solid #999;"
  );
  start(cmpSwitcher.next().value);
}

function start(cmp) {
  if (!cmp) {
    return;
  }
  iterations = max;
  console.log(
    `%cTesting componenent ${cmp.name}`,
    "color: green; font-weight: bold;"
  );
  prevTime = performance.now();
  iterate(cmp.component);
}

function rerender(cmp, i) {
  render(
    <Main currentCmp={cmp} iteration={i} />,
    document.getElementById("main")
  );
}

function iterate(cmp) {
  while (iterations--) {
    rerender(cmp, iterations);
  }
  console.log(
    `Time: %c${Math.round(performance.now() - prevTime)}ms`,
    "color:red"
  );
  setTimeout(nextComponent, 500);
}

class Main extends Component {
  render() {
    const { currentCmp } = this.props;
    return createElement(currentCmp, {});
  }
}

console.log(`Starting ${max} tests with %cReact 16...`, "font-weight: bold");
setTimeout(nextComponent, 1000);
