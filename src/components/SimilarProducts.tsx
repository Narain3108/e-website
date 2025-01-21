import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
  anime: string;
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProductId,
  category,
  anime
}) => {
  const { dispatch } = useCart();

  // Filter similar products based on category and anime
  const similarProducts = products
    .filter(product => 
      product.id !== currentProductId && 
      (product.category === category || product.anime === anime)
    )
    .slice(0, 3); // Show up to 3 similar products

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size: 'M' } });
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              </Link>
              <p className="text-purple-600 font-bold mb-4">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};