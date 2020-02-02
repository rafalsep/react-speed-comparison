import React, { PureComponent } from "react";
import workHard from "../workHard";

export default class Pure extends PureComponent {
    render() {
        workHard();
        return <div >Hello Cmp2: stateful, pure, no updates</div>;
    }
}