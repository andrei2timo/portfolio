import { useEffect, useState } from 'react';  // Import useState and useEffect
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';  // Importing icons

const Footer = ({isDarkMode}) => {

  const [currentYear, setCurrentYear] = useState(null);  // State to store the current year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());  // Set the year after the component mounts
  }, []);  // Empty dependency array means this runs once after the initial render

  if (currentYear === null) {
    return null;  // Return nothing until the year is set to avoid rendering incomplete HTML
  }

  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='' className='w-36 mx-auto mb-2'/>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='' className='w-6'/>
            andreimorun01@yahoo.com
        </div>
      </div>

    <div className='text-center sm:flex items-center justify-between border-t
    border-gray-400 mx-[10%] mt-12 py-6'>
        <p>&copy; {currentYear} Dj Morone. All rights reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target='_blank' href="https://www.facebook.com/profile.php?id=100009458918112" className="flex items-center gap-2"><FaFacebook/>Facebook</a></li>
            <li><a target='_blank' href="https://www.instagram.com/dj_mor_one/" className="flex items-center gap-2"><FaInstagram/>Instagram</a></li>
            <li><a target='_blank' href="https://www.linkedin.com/in/morun-andrei-86152a224" className='flex items-center gap-2'><FaLinkedin/>LinkedIn</a></li>
        </ul>
    </div>

    </div>
  )
}

export default Footer
