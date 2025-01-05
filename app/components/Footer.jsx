import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';  // Importing icons

const Footer = () => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image src={assets.logo} alt='' className='w-36 mx-auto mb-2'/>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={assets.mail_icon} alt='' className='w-6'/>
            andreitimo048@gmail.com
        </div>
      </div>

    <div className='text-center sm:flex items-center justify-between border-t
    border-gray-400 mx-[10%] mt-12 py-6'>
        <p>&copy; {new Date().getFullYear()} Dj Morone. All rights reserved.</p>
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
