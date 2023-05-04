import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BubbleChart } from '../Graphs/BubbleChart.jsx';

function ExecTime(props) {

     const {appId} = props

    let useWeight = false;

  return (
    <>
        
        <div id="execution-time" class = "overflow-hidden w-3/4 h-5/6 mx-auto my-auto " style ={{marginTop : 80}}>          
        <BubbleChart height = "720px"  width = "800px" appId={appId}  />
        </div>
    </>
  )
}

export default ExecTime