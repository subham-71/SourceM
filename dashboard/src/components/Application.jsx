import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavbarApp from './Navbars/NavbarApp.jsx'
import ProgramFlow from './Stats/ProgramFlow.jsx'

function Application() {

  const navigate = useNavigate()
  const {state} = useLocation()
  const applicationId = state.applicationId

  console.log(applicationId)
  const [applicationData, setApplicationData] = useState([])

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        // const data = await db.collection('Client').doc(currentUser.uid).collection('Application').doc(applicationName).get()
        // setApplicationData(data.data())  
      }
      catch (error) {
        console.error(error.message);
      }
    }
    getApplicationData();
  }, [])

  return (
    <>
      <NavbarApp/>      
      
      <div class = '"overflow-hidden w-3/4 h-3/4 mx-auto my-auto mt-40"'>
        <ProgramFlow appId = {applicationId} />  
      </div>
    </>
  )
}

export default Application