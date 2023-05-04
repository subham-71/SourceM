import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { NewBarChart } from '../Graphs/NewBarChart.jsx';

function Exceptions(props) {

     const {appId} = props

    let useWeight = false;

  return (
    <>
        

       <div id="exceptions" class = "overflow-hidden w-3/4 h-5/6 mx-auto my-auto " style ={{marginTop : 80}}> 
            <NewBarChart height = "720px"  width = "800px" appId={appId} />
        </div>

    </>
  )
}

export default Exceptions