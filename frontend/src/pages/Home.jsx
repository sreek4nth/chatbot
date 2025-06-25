import React, { useEffect, useRef, useContext } from 'react'
import { gsap } from "gsap";
import { AppContext } from '../context/AppContext';
import Chatbot from '../components/Chatbot';
import Navbar from '../components/Navbar'
import pic from '../assets/Sjc113-1.jpg'


const Home = () => {
  const { isLoggedin } = useContext(AppContext);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const navbarRef = useRef(null);

useEffect(() => {
  if (!navbarRef.current || !headingRef.current || !contentRef.current) return;

  // Now run GSAP animations
  gsap.set(navbarRef.current, { y: -100, opacity: 0 });
  gsap.set(headingRef.current, { opacity: 0, scale: 0.8 });
  gsap.set(contentRef.current.querySelectorAll('h3, p, li'), { y: 50, opacity: 0 });

  gsap.to(navbarRef.current, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  gsap.to(headingRef.current, {
    opacity: 1,
    scale: 1,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
  });

  gsap.to(contentRef.current.querySelectorAll('h3, p, li'), {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
  });
}, []);

  

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${pic})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navbar with fixed positioning */}
      <div ref={navbarRef} className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div ref={contentRef}
        className="relative z-10 text-white flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <h2 ref={headingRef} className="text-5xl font-bold mb-8">SJCET Chatbot</h2>

        <div className="text-white text-lg max-w-3xl space-y-6">
          <h3 className="text-2xl font-semibold">Our Vision</h3>
          <p>
            To emerge as a center of excellence in the field of computer education with distinct identity and quality in all areas of its activities and develop a new generation of computer professionals with proper leadership, commitment and moral values.
          </p>

          <h3 className="text-2xl font-semibold">Our Mission</h3>
          <ul className="list-disc pl-5 space-y-2 text-left">
            <li>Provide quality education in Computer Applications and bridge the gap between the academia and industry.</li>
            <li>Promoting innovation research and leadership in areas relevant to the socio-economic progress of the country.</li>
            <li>Develop intellectual curiosity and a commitment to lifelong learning in students, with societal and environmental concerns.</li>
          </ul>
        </div>
      </div>
      {/* Floating Chatbot */}
      {isLoggedin && (
        <Chatbot />
      )}    
    </div>
  );
};

export default Home;
