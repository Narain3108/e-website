import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Eye, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-purple-600 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-purple-50 transition-colors"
          >
            <Eye className="w-5 h-5" />
            View Details
          </Link>
        </div>
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-purple-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
            fill={isInWishlist ? 'currentColor' : 'none'}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-purple-600 font-bold">${product.price}</p>
          <span className="text-sm text-gray-500">{product.anime}</span>
        </div>
      </div>
    </div>
  );
};