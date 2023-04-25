import React, {useState, useEffect} from 'react'
// import FunctionCard from './FunctionCard.jsx'
import {useAuth} from '../../contexts/AuthContext'
import ExceptionCard from './ExceptionCard.jsx'

const functionCard = (props) => {

    const { appId, functionName } = props;    

    const [exceptionData, setExceptionData] = useState([{
      "functionName" : functionName ,
      "exceptionClass" : exceptionClass,
      "timestamps" : timestamps
  
  }])
  const {currentUser} = useAuth()

  const getExecptionData = async () => {
    try {
      const response = await fetch('https://sourcem.onrender.com/exception-throw/all-func-exception',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "functionId" : "functionId",
          "appId": "appId"
        }),
      })
      const exceptionData = await response.json()
      setExceptionData(exceptionData)
      console.log(exceptionData)
    }
    catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getExecptionData()
  }, [])
    return (

        <>
         <div class="p-10 grid grid-cols-2 gap-2">
        <div class="mx-auto bg-white rounded-lg md:p-8 dark:bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
              <dl class="grid grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">73M+</dt>
                      <dd class="text-gray-500 dark:text-gray-400">Execution Time</dd>
                  </div>
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
                      <dd class="text-gray-500 dark:text-gray-400">Function Calls</dd>
                  </div>
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">1000 GB </dt>
                      <dd class="text-gray-500 dark:text-gray-400">Memory Consumption</dd>
                  </div>
              </dl>
              <div className="exception-card">
                <ol class="items-center sm:flex">
                  
                    {
                      exceptionData.map((data, index) => {
                        return (
                          <ExceptionCard
                            key={index+1}
                            functionName={data.exceptionClass}
                            executionCount = {data.functionName}
                            timeExecuted = {data.timestamps}
                          />
                        )
                      })
                    }

                </ol>
              </div>
        </div>
       </div>

       </>
  );
};
export default functionCard;

