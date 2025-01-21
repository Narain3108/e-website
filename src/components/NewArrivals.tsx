import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

export const NewArrivals = () => {
  // Simulate AI-powered sorting by taking the last 3 products as "new arrivals"
  const newProducts = products.slice(-3);

  return (
    <div className="py-16 bg-gradient-to-b from-purple-900/10 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black-900">New Arrivals</h2>
          <Link 
            to="/products" 
            className="flex items-center gap-2 text-black-600 hover:text-white-700"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newProducts.map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-purple-600 font-bold">${product.price}</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};