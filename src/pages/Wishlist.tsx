import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { state, dispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const handleAddToCart = (product: any) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { product, size: 'M' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">My Wishlist</h1>
      
      {state.items.length === 0 ? (
        <div className="text-center text-gray-600">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="text-purple-600 hover:text-purple-700 mt-2 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                >
                  <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-purple-600 font-bold">${item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};