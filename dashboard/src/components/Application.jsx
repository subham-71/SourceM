import React, {useState, useEffect} from 'react'
import Navbar from './Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import NavbarApp from './NavbarApp.jsx'

function Application(props) {

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
      <NavbarApp/>
        
    </>
  )
}

export default Application