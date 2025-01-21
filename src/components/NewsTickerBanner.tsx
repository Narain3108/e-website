import React from 'react';

export const NewsTickerBanner = () => {
  return (
    <div className="bg-purple-900 text-white py-2 overflow-hidden fixed w-full z-40 top-16">
      <div className="animate-marquee whitespace-nowrap">
        <span className="inline-block mx-4">🎉 Special Offer: 20% off on all Demon Slayer merchandise!</span>
        <span className="inline-block mx-4">|</span>
        <span className="inline-block mx-4">🌟 New Attack on Titan collection dropping next week!</span>
        <span className="inline-block mx-4">|</span>
        <span className="inline-block mx-4">🚚 Free shipping on orders above $50</span>
        <span className="inline-block mx-4">|</span>
        <span className="inline-block mx-4">💫 Join our loyalty program for exclusive benefits!</span>
      </div>
    </div>
  );
};