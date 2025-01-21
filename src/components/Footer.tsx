import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Mugen</h3>
            <p className="text-purple-200">
              Express your anime passion through fashion with our unique collection of anime-inspired clothing.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-purple-200 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-purple-200 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-purple-200 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@mugen.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <a href="https://instagram.com/mugen" className="hover:text-purple-200">
                  @mugen
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Chennai, Tamil Nadu</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-purple-200 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
           
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-800 text-center text-purple-200">
          <p>&copy; 2024 Mugen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};