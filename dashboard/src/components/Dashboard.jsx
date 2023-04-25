import React, {useState, useEffect} from 'react'
import Navbar from './Navbars/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { storage } from '../config/firebaseConfig.jsx'

function Dashboard() {

  const navigate = useNavigate()

  const {currentUser} = useAuth()
  const [applicationData, setApplicationData] = useState([])

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await fetch('https://sourcem.onrender.com/application/get-client-app',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "clientId": currentUser.uid,
        }),
      })
      const applicationData = await response.json()
      console.log("applicationData",applicationData)
      setApplicationData(applicationData)
      }
      catch (error) {
        console.error(error.message);
      }
    }
    getApplicationData();
  }, [])

  const handleRedirect = (applicationName) => {
    navigate('/application', {state: {applicationId: applicationName}})
  }

  return (
    <>
      <Navbar/>
      {' '}
      
        

        <div class="overflow-hidden w-3/4 h-3/4 mx-auto my-auto"  style ={{marginTop : 100}}>
        <div class="flex justify-end mb-3">
            
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 mr-2 rounded" onClick={() => navigate('/upload')}>
                 <span className='text-white text-xl font-black rounded-full px-1'>+</span> Upload New App
            </button>
        </div>
          <table class="min-w-full text-center text-sm font-light">
            <thead
              class="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
              <tr>
                <th scope="col" class=" px-6 py-4">#</th>
                <th scope="col" class=" px-6 py-4">Application Name</th>
                <th scope="col" class=" px-6 py-4">Application Status</th>
                <th scope="col" class=" px-6 py-4">Functions</th>
              </tr>
            </thead>
            <tbody>
              {applicationData.map((data, id) => (
                <tr key={id+1} className='border-b dark:border-neutral-500'>
                  <td class=" px-6 py-4 whitespace-nowrap">{id+1}</td>
                  <td class=" px-6 py-4 whitespace-nowrap">{data.appName}</td>
                  <td class=" px-6 py-4 whitespace-nowrap">{data.appStatus}</td>
                  <td class=" px-6 py-4 whitespace-nowrap">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRedirect(data.appId)}>
                      View Application
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold ml-10 py-2 px-4 rounded" onClick={() => handleRedirect(data.appId)}>
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Dashboard