import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Bug, Sprout, Leaf } from 'lucide-react';

const MainLayout = () => {

  // Sleek, Apple-like active states for desktop
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm ${
      isActive 
        ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50 font-medium' 
        : 'text-gray-500 hover:bg-gray-100/60 hover:text-gray-900 font-medium'
    }`;

  // Subtle active states for mobile
  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `p-2.5 rounded-xl transition-all ${
      isActive 
        ? 'bg-gray-100 text-gray-900' 
        : 'text-gray-500 hover:bg-gray-50'
    }`;

  return (
    <div className="min-h-screen flex bg-[#f5f5f7] font-sans text-gray-900 selection:bg-gray-200">
      
      {/* macOS Style Sidebar (Frosted Glass) */}
      <aside className="w-64 bg-white/60 backdrop-blur-xl border-r border-gray-200/60 hidden md:flex flex-col z-10 flex-shrink-0">
        <div className="p-6 pt-8 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
            <Leaf className="text-white" size={18} />
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900">Project Melvin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <NavLink to="/dashboard" className={navLinkClasses}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/disease-detection" className={navLinkClasses}>
            <Bug size={18} />
            <span>Disease Detect</span>
          </NavLink>
          
          <NavLink to="/growth-tracker" className={navLinkClasses}>
            <Sprout size={18} />
            <span>Growth Tracker</span>
          </NavLink>
        </nav>
        
        {/* Minimalist User Profile Area */}
        <div className="p-4 m-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center space-x-3 cursor-pointer hover:bg-white transition-colors shadow-sm">
           <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex-shrink-0 overflow-hidden">
             {/* Add a user profile image here later */}
             <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-100"></div>
           </div>
           <div className="flex-col flex">
             <span className="text-sm font-medium text-gray-900 leading-tight">Farm Admin</span>
             <span className="text-xs text-gray-500">Premium Plan</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* iOS Style Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200/60 p-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center space-x-2">
             <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
              <Leaf className="text-white" size={16} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">Melvin</span>
          </div>
          <div className="flex space-x-1">
            <NavLink to="/dashboard" className={mobileLinkClasses}><LayoutDashboard size={20}/></NavLink>
            <NavLink to="/disease-detection" className={mobileLinkClasses}><Bug size={20}/></NavLink>
            <NavLink to="/growth-tracker" className={mobileLinkClasses}><Sprout size={20}/></NavLink>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:px-10 lg:py-8">
          <div className="w-full h-full flex flex-col">
            {/* Page Content Rendered Here */}
            <div className="w-full flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;