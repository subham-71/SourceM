import React, {useEffect, useState} from 'react'
import ExceptionCard from './ExceptionCard.jsx'

function Exception() {
  const [ExceptionCardData, setExceptionCardData] = useState([])

  const getExceptionCardData = async () => {
    try {
      const response = await fetch('http://localhost:8000/exception-throw/all-func-exception',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          "appId": "appId1",
          "functionId":"testA"
        }),
      })
      const ExceptionData = await response.json()
      setExceptionCardData(ExceptionData)
      console.log(ExceptionData)
    }
    catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getExceptionCardData()
  }, [])

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