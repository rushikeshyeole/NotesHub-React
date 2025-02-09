import React from 'react';

const testimonials = [
  {
    name: 'Akash Gowda',
    feedback: 'NotesHub has transformed my study habits! The notes are incredibly helpful.',
    rating: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Aditya Patidar',
    feedback: 'I love how easy it is to share notes with my classmates. Highly recommend!',
    rating: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Rushikesh Yeole',
    feedback: 'A fantastic platform for accessing quality study materials. Thank you, NotesHub!',
    rating: '⭐⭐⭐⭐⭐'
  }
];

const Testimonials = () => {
  return (
    <div className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-medium text-gray-900">{testimonial.feedback}</p>
              <p className="mt-4 text-gray-500">{testimonial.name}</p>
              <p className="mt-1 text-yellow-500">{testimonial.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;