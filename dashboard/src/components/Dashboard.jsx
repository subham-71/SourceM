import React, {useState, useEffect} from 'react'
import Navbar from './Navbar.jsx'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  // const applicationData = [
  //   {
  //     id: 1,
  //     applicationName: 'Application 1',
  //     status: 'Active',
  //   },
  //   {
  //     id: 2,
  //     applicationName : 'Application 2',
  //     status: 'Active',
  //   }
  // ]

  const navigate = useNavigate()

  const [applicationData, setApplicationData] = useState([{
    id: 1,
    applicationName: 'Application 1',
    status: 'Active',
  },
  {
    id: 2,
    applicationName : 'Application 2',
    status: 'Active',
  }])

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const data = await db.collection('Client').doc(currentUser.uid).get()
        setApplicationData(data.data().applications)  
      }
      catch (error) {
        console.error(error.message);
      }
    }
    getApplicationData();
  }, [])

  const handleRedirect = (applicationName) => {
    
  }

  return (
    <>
      <Navbar/>
        <div class="overflow-hidden w-3/4 h-3/4 mx-auto my-auto">
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
                  <td class=" px-6 py-4 whitespace-nowrap">{data.applicationName}</td>
                  <td class=" px-6 py-4 whitespace-nowrap">{"Active"}</td>
                  <td class=" px-6 py-4 whitespace-nowrap">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRedirect(data.applicationName)}>
                      View Functions
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