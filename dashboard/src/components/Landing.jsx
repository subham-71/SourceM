import React, {useState, useEffect} from 'react'
import Navbar from './Navbars/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Landing() {


  return (
    <>
      <Navbar/>

    <div class="py-20"
    >
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-2 text-white">
          Smart Health Monitoring Wristwatch!
        </h2>
        <h3 class="text-2xl mb-8 text-gray-200">
          Monitor your health vitals smartly anywhere you go.
        </h3>

        <button class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
          Pre Order
        </button>
      </div>
    </div>

    </>
  )
}

export default Landing