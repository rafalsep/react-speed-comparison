import React from "react";

import workHard from "../workHard";

const Stateless = () => {
    workHard();
    return <div>Hello Cmp3: stateless</div>;
}

export default React.memo(Stateless);
