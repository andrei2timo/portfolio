'use client';

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";

export default function Home() {
  return (
    <>
    {/* --------- <Navigation Bar> ---------*/}
    <NavBar />

    {/* --------- <Header> ---------*/}
    <Header />

    {/* --------- <About> ---------*/}
    <About />
    </>
  );
}
