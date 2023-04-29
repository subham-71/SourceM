import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BarChart } from '../Graphs/BarChart.jsx';

function Exceptions(props) {

     const {appId} = props

    let useWeight = false;

  return (
    <>
        

       <div class = "overflow-hidden w-3/4 h-5/6 mx-auto my-auto " style ={{marginTop : 80}}> 
            <BarChart height = "720px"  width = "800px" appId={appId} />
        </div>

    </>
  )
}

export default Exceptions