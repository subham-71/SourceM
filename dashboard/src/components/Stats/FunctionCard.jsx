import React, {useState, useEffect} from 'react'
import {useAuth} from '../../contexts/AuthContext'

const functionCard = (props) => {

  const { functionName, executionCount,executionTime } = props;    

  const [exceptionData, setExceptionData] = useState([])
  const {currentUser} = useAuth()

 
return (

        <>
         
        <div class="mx-auto bg-white rounded-lg md:p-8 dark:bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
              <div> HI </div>
              <dl class="grid grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">{executionTime}</dt>
                      <dd class="text-gray-500 dark:text-gray-400">Execution Time</dd>
                  </div>
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">{executionCount}</dt>
                      <dd class="text-gray-500 dark:text-gray-400">Function Calls</dd>
                  </div>
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">1000 GB </dt>
                      <dd class="text-gray-500 dark:text-gray-400">Memory Consumption</dd>
                  </div>
              </dl>
              
        </div>


       </>
  );
};
export default functionCard;

