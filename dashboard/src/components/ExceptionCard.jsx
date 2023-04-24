import React from 'react';
import './ExceptionCard.css'

function ExceptionCard(props) {
  return (
    <div className="exception-card">
        <div className="exception-card-title">{props.title}</div>
        <div className="exception-card-function-name">{props.functionName}</div>
        <div className="exception-card-called-by">{props.calledBy}</div>
        <div className="exception-card-num-calls">{props.numCalls}</div>
    </div>
  );
}

export default ExceptionCard;
