import React from 'react';

const ResponsiveTable = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full lg:w-full md:w-full sm:w-full">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveTable;