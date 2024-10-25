import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
