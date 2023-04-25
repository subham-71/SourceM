import React, {useState, useEffect} from 'react'
// import FunctionCard from './FunctionCard.jsx'
import {useAuth} from '../contexts/AuthContext'
import ExceptionCard from './ExceptionCard.jsx'

const functionCard = (props) => {

    const [exceptionData, setExceptionData] = useState([{
    exceptionClass: "exceptionClass",
    functionName: "functionName",
    timestamps: "timestamps" 
  }])
  const {currentUser} = useAuth()

  const getExecptionData = async () => {
    try {
      const response = await fetch('http://localhost:8000/exception-throw/func-exec',{
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
      
  <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    {/* <!--Card 1--> */}
    <div class="rounded overflow-hidden shadow-lg">
      {/* <img class="w-full" src="/mountain.jpg" alt="Mountain"> */}
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Mountain</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>
    {/* <!--Card 2--> */}
    <div class="rounded overflow-hidden shadow-lg">
      {/* <img class="w-full" src="/river.jpg" alt="River"> */}
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">River</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#summer</span>
      </div>
    </div>


  </div>
</div>
        {/* <div class="p-4 w-3/4 mx-auto bg-white rounded-lg md:p-8 dark:bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
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
        </div> */}
       

       </>
  );
};
export default functionCard;

