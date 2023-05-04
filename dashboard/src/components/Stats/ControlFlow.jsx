import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { NewSankey } from '../Graphs/NewSankey.jsx'

function ControlFlow(props) {

     const {appId} = props

    let useWeight = false;

  return (
    <>
        <div id="control-flow" className = "overflow-hidden w-3/4 h-5/6 mx-auto my-auto " style ={{marginTop : 80}}>            
        <NewSankey height = "720px"  width = "800px" appId={appId} useWeight={useWeight} />
        </div>
    </>
  )
}

export default ControlFlow