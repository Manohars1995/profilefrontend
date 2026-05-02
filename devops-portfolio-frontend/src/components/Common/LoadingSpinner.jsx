import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-devops-accent/20 rounded-full animate-spin border-t-devops-accent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-devops-secondary/20 rounded-full animate-spin border-b-devops-secondary"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;