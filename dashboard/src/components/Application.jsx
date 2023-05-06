import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ControlFlow from './Stats/ControlFlow.jsx'
import Exceptions from './Stats/Exceptions.jsx'
import ExecTime from './Stats/ExecTime.jsx'
import sourceCode from '../assets/sourceCode.png'
import Function from './Stats/Function.jsx'
import { useAuth } from '../contexts/AuthContext'

function Application() {

  const navigate = useNavigate()
  const {logout} = useAuth()
  const {state} = useLocation()
  const applicationId = state.applicationId
  
  const [toggle, setToggle] = useState([0,1,0,0,0])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    }
    catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
        <div className=" flex flex-wrap items-center justify-between mx-2 p-3">
        <a className="flex items-center">
            <img src={sourceCode} className="bg-white mx-3 ml-1" alt="sourceM Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">sourceM</span>
        </a>
        <div className="flex justify-between md:order-last">
            <button type="button" className="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 bg-red-600 hover:bg-red-700 focus:ring-red-800"
            onClick={()=>handleLogout()}>Logout</button>
        </div>
        <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <a href="#" className={toggle[0] == 1 ? "block py-2 pl-3 pr-4 md:bg-transparent md:text-blue-700 md:p-0 md:text-blue-500":"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"} onClick={(e)=>{e.preventDefault();setToggle([1,0,0,0,0])}}>Dashboard</a>
            </li>
            <li>
              <a href="#" className={toggle[1] == 1 ? "block py-2 pl-3 pr-4 rounded bg-transparent text-blue-700 md:p-0 md:text-blue-500":"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"} onClick={(e)=>{e.preventDefault();setToggle([0,1,0,0,0])}}>Control-flow</a>
            </li>
            <li>
              <a href="#" className={toggle[2] == 1 ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-blue-500":"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"} onClick={(e)=>{e.preventDefault();setToggle([0,0,1,0,0])}}>Exec-time</a>
            </li>
            <li>
              <a href="#" className={toggle[3] == 1 ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-blue-500":"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"} onClick={(e)=>{e.preventDefault();setToggle([0,0,0,1,0])}}>Functions</a>
            </li>
            <li>
              <a href="#" className={toggle[4] == 1 ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-blue-500":"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"} onClick={(e)=>{e.preventDefault();setToggle([0,0,0,0,1])}}>Exception</a>
            </li>
          
          </ul>
        </div>
        </div>
      </nav>    
      
      {
        toggle[0] == 1 ? navigate('/dashboard') : null
      }
      <div className = '"overflow-hidden w-3/4 h-3/4 mx-auto my-auto mt-40"'>
        {
          toggle[1] == 1 ? <ControlFlow appId = {applicationId} /> : null
        }
        {
          toggle[2] == 1 ? <ExecTime appId = {applicationId} /> : null
        }
        {
          toggle[4] == 1 ? <Exceptions appId = {applicationId} /> : null
        }
      </div>
      <div className = '"overflow-hidden mx-auto my-auto mt-40"'>
        {
          toggle[3] == 1 ? <Function appId = {applicationId} /> : null
        }
        
      </div>
    </>
  )
}

export default Application