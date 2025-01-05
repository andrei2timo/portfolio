'use client';

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";


export default function Home() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  {/* --------- Detect if toggle for dark mode is on/off --------- */}
  useEffect(()=>{
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) &&
  window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDarkMode(true);
    } else {
        setIsDarkMode(false);
    }
  },[])

  {/* --------- Dark Mode --------- */}
  useEffect(()=>{
    if(isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = '';
    }
  },[isDarkMode])

  return (
    <>
    {/* --------- <Navigation Bar> ---------*/}
    <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

    {/* --------- <Header> ---------*/}
    <Header isDarkMode={isDarkMode} />

    {/* --------- <About> ---------*/}
    <About isDarkMode={isDarkMode} />

    {/* --------- <Services> ---------*/}
    <Services isDarkMode={isDarkMode} />

    {/* --------- <Work> ---------*/}
    <Work isDarkMode={isDarkMode} />

    {/* --------- <Contact> ---------*/}
    <Contact isDarkMode={isDarkMode} />

    {/* --------- <Footer> ---------*/}
    <Footer isDarkMode={isDarkMode} />
    </>
  );
}
