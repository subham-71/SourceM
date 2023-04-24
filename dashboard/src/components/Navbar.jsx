import React from 'react'
import sourceCode from '../assets/sourceCode.png'

function Navbar() {
  return (
    <>
        <div class="flex flex-wrap justify-between items-center mx-5 px-2 my-auto py-5">
            <a class="flex items-center">
                <img src={sourceCode} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SourceM</span>
            </a>
            <div class="flex-end items-end text-right mx-5">
                <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">LogOut</a>
            </div>
        </div>
    </>
  )
}

export default Navbar