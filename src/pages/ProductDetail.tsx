import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Ruler, ShoppingBag, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Heart, Star } from 'lucide-react';
import { ReturnPolicyModal } from '../components/ReturnPolicyModal';
import { ProductReview } from '../components/ProductReview';
import { SimilarProducts } from '../components/SimilarProducts';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [reviews, setReviews] = useState([
    {
      id: '1',
      rating: 5,
      comment: 'Great quality and perfect fit!',
      images: [],
      userName: 'John D.',
      date: '2024-01-15'
    },
    {
      id: '2',
      rating: 4,
      comment: 'Nice design, shipping was fast.',
      images: [],
      userName: 'Sarah M.',
      date: '2024-01-10'
    }
  ]);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlistState.items.some(item => item.id === id);
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Assuming your product data now includes multiple images
  const productImages = [
    { url: product.image, alt: product.name },
    { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600', alt: `${product.name} - Back View` },
    { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600', alt: `${product.name} - Side View` },
    { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600', alt: `${product.name} - Detail View` },
  ];

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const element = event.currentTarget;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    setPosition({ x, y });
  }, [isZoomed]);

  const toggleZoom = () => setIsZoomed(prev => !prev);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size: selectedSize } });
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleReviewSubmit = (review: { rating: number; comment: string; images: string[] }) => {
    const newReview = {
      id: Date.now().toString(),
      ...review,
      userName: 'Anonymous',
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left side - Product Images */}
          <div className="md:w-1/2">
            <div className="relative h-[500px] overflow-hidden rounded-lg bg-gray-100">
              <div
                className={`w-full h-full relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'} transition-transform duration-500`}
                onClick={toggleZoom}
                onMouseMove={handleMouseMove}
                style={{
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: isZoomed ? `${position.x}% ${position.y}%` : 'center'
                }}
              >
                <img
                  src={productImages[currentImageIndex].url}
                  alt={productImages[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                {isZoomed ? (
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                ) : (
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    currentImageIndex === index ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-purple-800 mb-4">{product.name}</h1>
              <button
                onClick={handleWishlistToggle}
                className="p-2 hover:bg-purple-50 rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
                  fill={isInWishlist ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({reviews.length} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-2xl font-bold text-purple-600 mb-6">
              ${product.price}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 font-medium">Select Size</label>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-purple-600 flex items-center gap-1 hover:text-purple-800"
                >
                  <Ruler className="w-4 h-4" />
                  Size Chart
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md ${
                      selectedSize === size
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => setShowReturnPolicy(true)}
                className="w-full text-purple-600 underline text-sm hover:text-purple-700"
              >
                View Return Policy
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts
          currentProductId={product.id}
          category={product.category}
          anime={product.anime}
        />

        {/* Reviews Section */}
        <div className="border-t mt-8 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          
          {/* Add Review Form */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Write a Review</h3>
            <ProductReview productId={product.id} onSubmit={handleReviewSubmit} />
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-2">{review.comment}</p>
                <div className="flex gap-4 mt-2">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {review.userName} - {review.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Size Chart</h2>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest (inches)</th>
                  <th className="py-2">Length (inches)</th>
                  <th className="py-2">Shoulders (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-center">S</td>
                  <td className="py-2 text-center">36-38</td>
                  <td className="py-2 text-center">27</td>
                  <td className="py-2 text-center">17</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-center">M</td>
                  <td className="py-2 text-center">38-40</td>
                  <td className="py-2 text-center">28</td>
                  <td className="py-2 text-center">18</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-center">L</td>
                  <td className="py-2 text-center">40-42</td>
                  <td className="py-2 text-center">29</td>
                  <td className="py-2 text-center">19</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-center">XL</td>
                  <td className="py-2 text-center">42-44</td>
                  <td className="py-2 text-center">30</td>
                  <td className="py-2 text-center">20</td>
                </tr>
                <tr>
                  <td className="py-2 text-center">XXL</td>
                  <td className="py-2 text-center">44-46</td>
                  <td className="py-2 text-center">31</td>
                  <td className="py-2 text-center">21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Return Policy Modal */}
      <ReturnPolicyModal isOpen={showReturnPolicy} onClose={() => setShowReturnPolicy(false)} />
    </div>
  );
};