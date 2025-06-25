import React from 'react';
import Navbar from '../components/Navbar';
import pic from '../assets/Sjc113-1.jpg';
import Card from '../components/Card';

const Feedback = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${pic})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Navbar with fixed positioning */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Centered Card */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <Card />
      </div>
    </div>
  );
};

export default Feedback;
