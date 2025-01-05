import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { assets } from '@/assets/assets'; // Make sure to import your assets properly

const Work = () => {
  // State to control the number of visible projects
  const [visibleProjects, setVisibleProjects] = useState(3); // Show first 3 projects by default
  const [projects, setProjects] = useState([]); // State for storing the fetched projects

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/some-data');
        console.log('Data received from API:', response.data);  // Add this line
        setProjects(response.data); // Set the data received from the backend
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = (event) => {
    event.preventDefault(); // Prevent the page from scrolling to the top
    setVisibleProjects(prev => prev + 3); // Load 3 more projects when clicked
  };

  return (
    <div id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>
        Galerie de la evenimente
      </h4>
      <h2 className='text-center text-5xl font-Ovo'>
        Momente de la ultimele mele evenimente
      </h2>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        Vezi momentele de neuitat capturate la cele mai recente evenimente.
      </p>

      <div className='grid grid-cols-auto my-10 gap-5'>
        {projects.length > 0 ? (
          projects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={index}
              className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
              style={{ backgroundImage: `url(${project.bgImage})` }}
            >
              <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                <div>
                  <h2 className='font-semibold'>{project.title}</h2>
                  <p className='text-sm text-gray-700'>{project.description}</p>
                </div>
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'
                >
                  <Image src={assets.send_icon} alt='send icon' className='w-5' />
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p> // Display message if no data is available
        )}
      </div>

      {visibleProjects < projects.length && (
        <a
          href="#"
          onClick={handleShowMore}
          className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500'>
          Arată mai multe
          <Image src={assets.right_arrow_bold} alt='Right arrow' className='w-4'/>
        </a>
      )}
    </div>
  );
};

export default Work;
