import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Mobile Frame */}
      <div className="w-full max-w-md min-h-screen bg-white shadow-2xl overflow-hidden relative flex flex-col border-x border-gray-200">
        
        {/* Top Status Bar Decoration */}
        <div className="bg-blue-600 h-1 w-full shrink-0"></div>

        {/* Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;