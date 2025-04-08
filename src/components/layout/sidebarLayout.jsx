import React from 'react'
import Sidebar from '../sidebar/sidebar'
import { Outlet } from 'react-router-dom'

const SidebarLayout = () => {
  return (
    <>
    <Sidebar />
    <main className="p-8 ml-20 md:ml-64 py-16 px-4  md:px-12 bg-gray-100 min-h-screen flex-1">
      <Outlet />
    </main>
  </>
  )
}

export default SidebarLayout