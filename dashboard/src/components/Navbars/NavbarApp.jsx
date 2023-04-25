import React from 'react'
import sourceCode from '../../assets/sourceCode.png'

function NavbarApp() {
  return (
    <>
                      
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className=" flex flex-wrap items-center justify-between mx-2 p-3">
        <a href="https://flowbite.com/" className="flex items-center">
            <img src={sourceCode} className="bg-white mx-3 ml-1" alt="sourceM Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">sourceM</span>
        </a>
        <div className="flex justify-between md:order-last">
            <button type="button" className="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>
        </div>
        <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Program Flow </a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Program Statistics</a>
            </li>
          
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Function Details</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>

              
    </>
  )
}

export default NavbarApp