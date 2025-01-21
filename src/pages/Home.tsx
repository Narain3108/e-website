import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Instagram, MapPin } from 'lucide-react';
import { NewArrivals } from '../components/NewArrivals';
import { UserFeedback } from '../components/UserFeedback';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <div 
          className="relative min-h-[80vh] flex items-center justify-center"
          style={{
            backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bgg.jpg-9nfkRPK9mSThiUhRIkgVBDXAiXdG6Q.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white space-y-8">
              <div className="relative w-64 h-40 mx-auto bg-transparent rounded-lg overflow-hidden">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ic-YXWORPjriOjWlgb9YJf6TIvSD4JZjn.png"
                  alt="Mugen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Welcome to Mugen
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
                Express your anime passion through fashion
              </p>
              <Link
                to="/products"
                className="inline-block bg-black text-white font-bold py-4 px-10 rounded-full hover:bg-gray-900 transition duration-300 transform hover:scale-105 border border-amber-500/20 mt-8"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative bg-purple-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-6 text-white border border-amber-500/20 hover:bg-blue-800/40 transition duration-300">
                <h3 className="text-xl font-bold mb-2 text-amber-200">Unique Designs</h3>
                <p className="text-blue-100">Exclusive anime-inspired clothing you won't find anywhere else</p>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-6 text-white border border-amber-500/20 hover:bg-blue-800/40 transition duration-300">
                <h3 className="text-xl font-bold mb-2 text-amber-200">Premium Quality</h3>
                <p className="text-blue-100">High-quality materials for comfort and durability</p>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-6 text-white border border-amber-500/20 hover:bg-blue-800/40 transition duration-300">
                <h3 className="text-xl font-bold mb-2 text-amber-200">Express Shipping</h3>
                <p className="text-blue-100">Fast and reliable shipping to your doorstep</p>
              </div>
            </div>
          </div>

          {/* New Arrivals Section */}
          <NewArrivals />

          {/* User Feedback Section */}
          <UserFeedback />

          {/* Contact Section */}
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-900/30 backdrop-blur-md rounded-2xl p-8 text-white border border-amber-500/20 max-w-7xl mx-auto hover:bg-blue-800/40 transition duration-300">
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-100">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-amber-200">Our Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <p className="text-blue-100">Jash: 90909012</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <p className="text-blue-100">Narain: 79203384849</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <p className="text-blue-100">Naveen: 78943903</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-amber-200">Connect With Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5" />
                      <a 
                        href="https://instagram.com/mugen" 
                        className="text-blue-100 hover:text-amber-300"
                      >
                        @mugen
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <p className="text-blue-100">Chennai, Tamil Nadu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

