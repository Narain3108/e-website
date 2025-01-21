import React from 'react';
import { X } from 'lucide-react';

interface ReturnPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReturnPolicyModal: React.FC<ReturnPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Return Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Return Window</h3>
            <p>Products can be returned within 10 days of delivery for a full refund or exchange.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Eligibility Conditions</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be unused and in original condition</li>
              <li>All tags and packaging must be intact</li>
              <li>Product must not be damaged or altered</li>
              <li>Original proof of purchase required</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Return Process</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Initiate return request through your account</li>
              <li>Print return shipping label</li>
              <li>Pack item securely with all original materials</li>
              <li>Drop off at specified shipping location</li>
              <li>Refund will be processed within 5-7 business days after receipt</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Non-Returnable Items</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customized or personalized items</li>
              <li>Items marked as final sale</li>
              <li>Intimate wear and accessories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};