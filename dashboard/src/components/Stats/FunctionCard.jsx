import React, {useState, useEffect} from 'react'
import { LineChart } from '../Graphs/LineChart';


function NameParse(functionName){
    var name = functionName.split(" ")[1]
    name = name.split("(")[0]
    return name

}
  

const functionCard = (props) => {

  const { appId,functionName, executionCount,executionTime } = props;    

  const [exceptionData, setExceptionData] = useState([])

    
return (

        <>
         
        <div class="flex-wrap mx-auto rounded-lg md:p-8 bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
              <div class ="mb-2 text-orange-400 text-xl font-extrabold flex flex-wrap"> {NameParse(functionName)} </div>
              <dl class="grid grid-cols-3 gap-10 p-4 mx-auto text-gray-900 sm:grid-cols-1 xl:grid-cols-3 text-white sm:p-8">
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">{executionTime}</dt>
                      <dd class="text-gray-400">Execution Time</dd>
                  </div>
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold">{executionCount}</dt>
                      <dd class="text-gray-400">Function Calls</dd>
                  </div>
                  <div class="flex flex-col text-center">
                      <dt class="mb-2 text-3xl font-extrabold"> -- </dt>
                      <dd class="text-gray-400">Memory Consumption</dd>
                  </div>
              </dl>
                <div class = "overflow-hidden items-center" style ={{marginTop : 40}}>            
                    <LineChart height = "350px"  appId={appId} functionId={functionName} />
                </div>
              
        </div>


       </>
  );
};
export default functionCard;

