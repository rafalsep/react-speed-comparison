import React, { createElement, Component } from "react";
import { render } from "react-dom";

let iterations;
let prevTime;
let max = 100000;

function start(cmp) {
    if (!cmp) {
        return;
    }
    iterations = max;
    console.log(
        `%cTesting componenent`,
        "color: green; font-weight: bold;"
    );
    prevTime = performance.now();
    iterate(cmp);
}

function rerender(cmp, i) {
    render(
        <Main currentCmp={cmp} iteration={i} />,
        document.getElementById("pureVsStateless")
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
}

class Main extends Component {
    render() {
        const { currentCmp, iteration } = this.props;
        return createElement(currentCmp, { iteration, aa: iteration, bb: iteration, cc: iteration, dd: iteration, ee: iteration  });
    }
}

console.log(`Starting ${max} tests with %cReact 16...`, "font-weight: bold");

export default (comp) => setTimeout(() => start(comp), 100);