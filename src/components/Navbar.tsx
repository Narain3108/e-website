import React, { useState } from 'react';
import { ShoppingCart, Menu, Heart, Settings, HelpCircle, Gift, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { UserAvatar } from './UserAvatar';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const { state: authState } = useAuth();

  const cartItemsCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistState.items.length;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.anime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <nav className="bg-black text-white fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 hover:bg-purple-800 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-purple-800 rounded-lg"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Center section with logo */}
          <div className="flex-1 flex items-center justify-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mugen.jpg-ZQ6XgXH3gShNdHA2nfg6tmszV7Facv.jpeg"
                alt="Mugen Logo" 
                className="h-12 w-auto brightness-100 contrast-100"
              />
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative hover:text-purple-200">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative hover:text-purple-200">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar with animation */}
        <div className={`overflow-hidden transition-all duration-300 ${isSearchOpen ? 'h-16' : 'h-0'}`}>
          <div className="py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full bg-purple-800/50 text-white placeholder-purple-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-purple-300" />
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchQuery && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSuggestions(false);
                        setIsSearchOpen(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-gray-800 font-medium">{product.name}</p>
                        <p className="text-gray-500 text-sm">{product.category}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-gray-500 text-center">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings dropdown */}
      {isSettingsOpen && (
        <div className="absolute left-4 top-16 w-64 bg-purple-900/95 backdrop-blur-md rounded-lg shadow-lg py-2 border border-purple-800">
          {!authState.isAuthenticated && (
            <Link 
              to="/login" 
              className="flex items-center px-6 py-3 text-white hover:bg-purple-800 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Login</span>
            </Link>
          )}
          <Link 
            to="/help" 
            className="flex items-center px-6 py-3 text-white hover:bg-purple-800 transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            <span>Help Center</span>
          </Link>
          <Link 
            to="/offers" 
            className="flex items-center px-6 py-3 text-white hover:bg-purple-800 transition-colors"
          >
            <Gift className="w-5 h-5 mr-3" />
            <span>Special Offers</span>
          </Link>
        </div>
      )}
    </nav>
  );
};