import React from 'react';

const features = [
  {
    title: 'Easy Sharing',
    description: 'Share your notes with just a few clicks and help others learn.',
    icon: '📝'
  },
  {
    title: 'Organized Content',
    description: 'Find notes organized by subject, topic, and education level.',
    icon: '📚'
  },
  {
    title: 'Collaborative Learning',
    description: 'Connect with other students and learn together.',
    icon: '👥'
  },
  {
    title: 'Quality Content',
    description: 'Access verified and high-quality study materials.',
    icon: '⭐'
  }
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose NotesHub?
          </h2>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;