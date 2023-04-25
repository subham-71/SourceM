import React, {useState, useEffect} from 'react'
import FunctionCard from './FunctionCard.jsx'
import axios from "axios";
import {useAuth} from '../../contexts/AuthContext.jsx'
import {db} from '../../config/firebaseConfig.jsx'

function TimeFormat(time){
  if(time>1000 &&  time<1000000){
    return (time/1000).toFixed(2) + "K"+"+"
  }
  else if(time>1000000 && time<1000000000){
    return (time/1000000).toFixed(2) + "M"+"+"
  }
  else if(time>1000000000){
    return (time/1000000000).toFixed(2) + "B"+"+"
  }
  else{
    return time
  }
}


function Function(props) {

  const { appId } = props;
  const [functionData, setFunctionData] = useState([])

  const {currentUser} = useAuth()

  useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(
                    "https://sourcem.onrender.com/exec-time/all-func-exec",
                    {
                        "appId": appId,
                    }
                )                
            setFunctionData(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
  
  

  return (
    <>

<div class="mt-10 p-10 grid grid-cols-2 gap-2">
        {
        functionData.map((data) => {
          return (
            <FunctionCard
              functionName={data.functionName}
              executionCount = {TimeFormat(data.executionCount)}
              executionTime = {TimeFormat(data.executionTime)}
            />
            )
          })
        }
  
        </div>
    </>
  )
}

export default Function