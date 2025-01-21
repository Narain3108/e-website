import React from 'react';

export const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              Welcome to Mugen. By accessing and using our website, you agree to be bound by these terms and conditions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Website</h2>
            <p className="text-gray-600">
              You agree to use our website for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Products and Pricing</h2>
            <p className="text-gray-600">
              All products are subject to availability. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products are subject to change at any time without notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Shipping and Delivery</h2>
            <p className="text-gray-600">
              Delivery times may vary depending on your location. We are not responsible for any delays caused by customs or other factors beyond our control.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Returns and Refunds</h2>
            <p className="text-gray-600">
              Products can be returned within 10 days of delivery. Items must be unused and in their original packaging. Refunds will be processed within 5-7 business days.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy Policy</h2>
            <p className="text-gray-600">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};