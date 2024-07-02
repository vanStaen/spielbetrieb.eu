import React from "react";

import "./GlitchText.less";

export const GlitchText = (props) => {
  const { glitchText, overText } = props;

  return (
    <div className="glitch">
      <span className="overText">{overText}</span>
      <div className="glitchText" style={{ "--stacks": 3 }}>
        <span style={{ "--index": 0 }}>{glitchText}</span>
        <span style={{ "--index": 1 }}>{glitchText}</span>
        <span style={{ "--index": 2 }}>{glitchText}</span>
      </div>
    </div>
  );
};
