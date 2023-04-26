import React from 'react'
import sourceCode from '../../assets/sourceCode.png'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const {logout} = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/')
    } catch {
      console.log('Failed to log out')
    }
  }

  return (
    <>
                      
      <nav class="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
        <div class=" flex flex-wrap items-center justify-between mx-2 p-4">
        <a class="flex items-center">
            <img src={sourceCode} class="bg-white mx-3 ml-1" alt="sourceM Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">sourceM</span>
        </a>
        <div class="flex justify-between md:order-last">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 bg-red-600 hover:bg-red-700 focus:ring-red-800"
            onClick={()=>handleLogout()}>Logout</button>
        </div>
        
        </div>
      </nav>

              
    </>
  )
}

export default Navbar