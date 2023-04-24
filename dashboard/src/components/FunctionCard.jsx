import React from 'react';
import './ExceptionCard.css'

function FunctionCard(props) {
  return (
    <div className="function-card">
        <div className="function-name">{props.functionName}</div>
        <div className="function-execution-count">{props.executionCount}</div>
        <div className="function-time-executed">{props.timeExecuted}</div>
    </div>
  );
}

export default FunctionCard;
