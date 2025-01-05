'use client';

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
    {/* --------- <Navigation Bar> ---------*/}
    <NavBar />

    {/* --------- <Header> ---------*/}
    <Header />

    {/* --------- <About> ---------*/}
    <About />

    {/* --------- <Services> ---------*/}
    <Services/>

    {/* --------- <Work> ---------*/}
    <Work/>

    {/* --------- <Contact> ---------*/}
    <Contact/>

    {/* --------- <Footer> ---------*/}
    <Footer/>
    </>
  );
}
