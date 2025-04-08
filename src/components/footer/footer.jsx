import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <>
 <footer className="padding-lr text-white py-16 bg-gradient-to-r from-[#F7641E] to-[#800000]">
 <div className="container mx-auto max-w-6xl  grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-16">
  {/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6"> */}
    <div>
      <h3 className="text-lg font-bold mb-3">About</h3>
      <p className='text-sm'>Trusted Indian Matrimony site for meaningful matches.</p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-3">Contact</h3>
      <p>Email: <Link to="mailto:info@kalyanavennila.com" className="hover:text-gray-400">info@kalyanavennila.com</Link></p>
      <p>Phone:  +91 8331085410</p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-3">Quick Links</h3>
      <ul className="space-y-1">
        <li><Link to="#" className="hover:underline hover:text-gray-400">Privacy Policy</Link></li>
        <li><Link tp="#" className="hover:underline hover:text-gray-400">Terms & Conditions</Link></li>
        <li><Link to="#" className="hover:underline hover:text-gray-400">FAQ</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-3">Follow Us</h3>
      <div className="flex items-center space-x-3">
          <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
          </Link>
          <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitterSquare className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
          </Link>
          <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
          </Link>
        </div>
    </div>
  </div>

  <div className="text-center mt-6 border-t pt-4 text-sm">
    © 2025 KalyanaVennila. All rights reserved.
  </div>
</footer>
    </>
  )
}

export default Footer