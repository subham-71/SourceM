import React, {useState, useEffect} from 'react'
import FunctionCard from './FunctionCard.jsx'
import {useAuth} from '../contexts/AuthContext'
import {db} from '../config/firebaseConfig.jsx'

function Function(props) {
  const [functionData, setFunctionData] = useState([{
    functionName: "functionName",
    executionCount: "executionCount",
    timeExecuted: "timeExecuted"
  }])
  const {currentUser} = useAuth()

  const getFunctionData = async () => {
    try {
      const response = await fetch('http://localhost:8000/exec-time/all-func-exec',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "appId": "appId"
        }),
      })
      const functionData = await response.json()
      setFunctionData(functionData)
    }
    catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getFunctionData()
  }, [])

  return (
    <>
      <div>Function</div>
      {
        functionData.map((data, index) => {
          return (
            <FunctionCard
              key={index+1}
              functionName={data.id}
              executionCount = {data.functionName}
              timeExecuted = {data.status}
            />
          )
        })
      }
    </>
  )
}

export default Function