import React, { Component } from "react";
import workHard from "../workHard";

export default class Stateful extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        workHard();
        return <div >Hello Cmp1: stateful</div>;
    }
}