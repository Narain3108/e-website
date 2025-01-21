import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export const Products = () => {
  const { dispatch } = useCart();

  const handleAddToCart = (product, size) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size } });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/product.jpg-HsVsBOOiXz2nhbnAqoZGBk12ivlph0.jpeg")`
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Our Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};