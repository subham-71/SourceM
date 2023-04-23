import React, {useState} from 'react'
import ExceptionCard from './ExceptionCard.jsx'

function Exception() {
  const ExceptionCardData = [
    {
      functionName: "functionName",
      calledBy: "calledBy",
      numCalls: "numCalls"
    },
    {
      functionName: "functionName",
      calledBy: "calledBy",
      numCalls: "numCalls"
    }
  ]

  return (
    <>
    <div>Exception</div>
    {ExceptionCardData.map((data, index) => {
      return (
        <ExceptionCard
          key={index}
          title={data.title}
          functionName={data.functionName}
          calledBy={data.calledBy}
          numCalls={data.numCalls}
        />
      )
    }
    )}
    </>
  )
}

export default Exception