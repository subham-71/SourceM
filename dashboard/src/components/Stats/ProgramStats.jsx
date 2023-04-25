import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import NavbarApp from './Navbars/NavbarApp.jsx'
import { Sankey } from '../Graphs/Sankey.jsx'

function ProgramStats(props) {

     const {appId} = props

    let useWeight = false;

  return (
    <>
        <div class = "overflow-hidden w-3/4 h-5/6 mx-auto my-auto " style ={{marginTop : 80}}>            
        <Sankey height = "720px"  width = "800px" appId={appId}  />
        </div>
    </>
  )
}

export default ProgramStats