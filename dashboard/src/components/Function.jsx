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
      const functionData = await http.get(`http://localhost:8000/all-func-exec`,{
        body: {
          appId: "appId"
        }
      })
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
              key={index}
              functionName={data.functionName}
              executionCount = {data.executionCount}
              timeExecuted = {data.timeExecuted}
            />
          )
        })
      }
    </>
  )
}

export default Function