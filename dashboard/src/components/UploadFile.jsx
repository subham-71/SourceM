import React, {useState} from 'react'
import Navbar from './Navbars/Navbar.jsx'
import { useNavigate } from 'react-router-dom';
import { storage } from '../config/firebaseConfig.jsx'
import {ref, uploadBytes} from 'firebase/storage'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function UploadFile() {

    const base_url = "143.244.130.133:8000"
    const navigate = useNavigate()
    const {currentUser} = useAuth()
    const [appName, setAppName] = useState('');
    const [jarFile, setJarFile] = useState('');

    const handleAppNameChange = (event) => {
      setAppName(event.target.value);
    }
  
    const handleJarFileChange = (event) => {
      setJarFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://${base_url}/application/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                "clientId": currentUser.uid,
                "appName": appName,
                "appStatus": "Uploaded"
            }),
        })
        const appId = await response.text()

        const fileRef = ref(storage, `applications/${currentUser.uid}/${appId}/input.jar`);
        uploadBytes(fileRef, jarFile).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            const res = await fetch(`http://${base_url}/application/upload`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    "clientId": currentUser.uid,
                    "appId": appId,
                }),
            })
            navigate('/dashboard')
          }).catch((error) => {
            console.log(error)
          }
        );

        
    }

  return (
    <>
        <Navbar/>
        <div className="max-w-md mx-auto flex justify-center">
            <form onSubmit={handleSubmit} className="bg-gray shadow-lg rounded px-12 pt-8 pb-8 mt-60">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="appName">
                        Application Name
                        </label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="appName"
                        type="text"
                        placeholder="Enter application name"
                        value={appName}
                        onChange={handleAppNameChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="jarFile">
                        Jar File
                        </label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="jarFile"
                        type="file"
                        accept=".jar"
                        onChange={handleJarFileChange}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        >
                        Submit
                        </button>
                    </div>
                </form>
        </div>
        <div className="flex items-center justify-center mt-4">
            <button
              className="text-gray-300 hover:text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={()=>navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
        </div>
        
    </>
  )
}
