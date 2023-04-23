import React from 'react'
import Navbar from './Navbar.jsx'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const applicationData = [
    {
      id: 1,
      applicationName: 'Application 1',
      status: 'Active',
    },
    {
      id: 2,
      applicationName : 'Application 2',
      status: 'Active',
    },
  ]

  const navigate = useNavigate()

  // const [applicationData, setApplicationData] = useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const getApplicationData = async () => {
  //     try {
  //       const response = await fetch('http://some_url');
  //       const jsonData = await response.json();
  //       setApplicationData(jsonData);
  //     }
  //     catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  //   getApplicationData();
  // }, [])

  const handleRedirect = (applicationName) => {
    
  }

  return (
    <>
      {/* <Navbar/> */}
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
                  {applicationData.map((data) => (
                    <tr key={data.id} className='border-b dark:border-neutral-500'>
                      <td class=" px-6 py-4 whitespace-nowrap">{data.id}</td>
                      <td class=" px-6 py-4 whitespace-nowrap">{data.applicationName}</td>
                      <td class=" px-6 py-4 whitespace-nowrap">{data.status}</td>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard