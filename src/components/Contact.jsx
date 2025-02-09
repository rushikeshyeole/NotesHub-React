import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 py-10" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-500 text-sm">Reach out to us for any queries or assistance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Box 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-600">johndoe@example.com</p>
            <p className="text-sm text-gray-600">+1 234 567 8901</p>
          </div>

          {/* Contact Box 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Jane Smith</h3>
            <p className="text-sm text-gray-600">janesmith@example.com</p>
            <p className="text-sm text-gray-600">+1 987 654 3210</p>
          </div>

          {/* Contact Box 3 */}
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Alex Johnson</h3>
            <p className="text-sm text-gray-600">alexjohnson@example.com</p>
            <p className="text-sm text-gray-600">+1 555 678 9012</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;