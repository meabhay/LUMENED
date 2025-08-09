import React from 'react';

// Universal Loader Component with different variants
const Loader = ({ 
  variant = 'spinner', 
  size = 'medium', 
  color = 'primary', 
  text = '', 
  fullscreen = false,
  className = '' 
}) => {
  // Size configurations
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  // Color configurations
  const colorClasses = {
    primary: 'border-yellow-50 text-yellow-50',
    secondary: 'border-blue-50 text-blue-50',
    white: 'border-white text-white',
    dark: 'border-richblack-800 text-richblack-800'
  };

  // Loader variants
  const renderLoader = () => {
    const sizeClass = sizeClasses[size] || sizeClasses.medium;
    const colorClass = colorClasses[color] || colorClasses.primary;

    switch (variant) {
      case 'spinner':
        return (
          <div className={`animate-spin rounded-full border-b-2 ${sizeClass} ${colorClass} ${className}`}>
          </div>
        );

      case 'dots':
        return (
          <div className={`flex space-x-1 ${className}`}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`rounded-full animate-pulse ${colorClass} ${
                  size === 'small' ? 'w-2 h-2' : 
                  size === 'large' ? 'w-4 h-4' : 'w-3 h-3'
                }`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.6s'
                }}
              ></div>
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`animate-pulse rounded-full bg-current opacity-75 ${sizeClass} ${colorClass} ${className}`}>
          </div>
        );

      case 'bars':
        return (
          <div className={`flex space-x-1 ${className}`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`animate-pulse bg-current ${colorClass} ${
                  size === 'small' ? 'w-1 h-4' : 
                  size === 'large' ? 'w-2 h-8' : 'w-1.5 h-6'
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s',
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate'
                }}
              ></div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`animate-spin rounded-full border-b-2 ${sizeClass} ${colorClass} ${className}`}>
          </div>
        );
    }
  };

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-richblack-800 rounded-lg p-8 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            {renderLoader()}
            {text && (
              <p className="text-richblack-100 text-sm font-medium animate-pulse">
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {renderLoader()}
      {text && (
        <p className={`text-sm font-medium ${colorClasses[color]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
