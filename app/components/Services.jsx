import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Services = () => {
  return (
    <div id="services" className='w-ful px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>
      Ce îți pot oferi ca DJ pentru evenimentul tău</h4>
      <h2 className='text-center text-5xl font-Ovo'>
      Serviciile mele</h2>

      <ul className='text-center list-inside max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        <li>🎶 Mixuri personalizate pentru fiecare eveniment.</li>
        <li>💃 Experiență vastă în diverse genuri muzicale</li>
        <li>🎉 Capacitatea de a menține mulțimea implicată și dansând toată noaptea!</li>
        <li>📅 Disponibilitate flexibilă pentru nunți, petreceri și botezuri.</li>
      </ul>
      
      {/* --------- <Service Data from Assets> ---------*/}
      <div className='grid grid-cols-auto gap-6 my-10'>
        {serviceData.map(({icon, title, description, link}, index) => (
            <div key={index}
             className='border border-gray-400 rounded-lg px-8 py-12 cursor-auto hover:shadow-black hover:bg-lightHover hover:-translate-y-3 duration-500'>
                <Image src={icon} alt='' className='w-10'/>
                <h3 className='text-lg my-4 text-gray-700'>{title}</h3>
                <p className='text-sm text-gray-600 leading-5'>
                    {description}
                </p>
                <a href={link} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-sm mt-5 text-blue-500 hover:underline'>
                Află mai multe <Image alt='' src={assets.right_arrow} className='w-4'/>
               </a>
            </div>
        ))}
      </div>
      
      
    </div>
  )
}

export default Services
