import React from "react";
import workHard from "../workHard";

export default ({ iterations }) => {
    workHard();
    return <div>Hello Cmp3: stateless {iterations}</div>;
}