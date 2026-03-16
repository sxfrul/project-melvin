import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Bug, Sprout } from 'lucide-react';
import melvinLogo from '../assets/melvin-textlogo.png';

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
        ? 'bg-gray-200/60 text-gray-900' 
        : 'text-gray-500 hover:bg-gray-100/60'
    }`;

  return (
    <div className="min-h-screen flex bg-[#f5f5f7] font-sans text-gray-900 selection:bg-gray-200">
      
      {/* macOS Style Sidebar (Frosted Glass) */}
      <aside className="w-64 bg-white/60 backdrop-blur-xl border-r border-gray-200/60 hidden md:flex flex-col z-10 flex-shrink-0">
        <div className="p-6 pt-8 flex items-center">
          <img src={melvinLogo} alt="Project Melvin Logo" className="h-8 w-auto object-contain scale-[3] origin-left" />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <NavLink to="/dashboard" className={navLinkClasses}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/disease-detection" className={navLinkClasses}>
            <Bug size={18} />
            <span>Chat with Melvin</span>
          </NavLink>
          
          <NavLink to="/field-manager" className={navLinkClasses}>
            <Sprout size={18} />
            <span>Field Manager</span>
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
      {/* 1. Changed to handle the scrolling: removed flex-col and overflow-hidden, added overflow-y-auto */}
      <main className="flex-1 h-screen overflow-y-auto min-w-0">
        
        {/* Transparent Mobile Header - FIXED WITH FROSTED GLASS */}
        <header
          className="md:hidden border-b border-gray-200/100 p-4 flex justify-between items-center sticky top-0 z-20"
          style={{
            backgroundColor: 'rgba(245, 245, 247, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className="flex items-center">
            <img src={melvinLogo} alt="Melvin Logo" className="h-7 w-auto object-contain scale-[2.7] origin-left" />
          </div>
          <div className="flex space-x-1">
            <NavLink to="/dashboard" className={mobileLinkClasses}><LayoutDashboard size={20}/></NavLink>
            <NavLink to="/disease-detection" className={mobileLinkClasses}><Bug size={20}/></NavLink>
            <NavLink to="/growth-tracker" className={mobileLinkClasses}><Sprout size={20}/></NavLink>
          </div>
        </header>

        {/* Dynamic Page Content */}
        {/* 2. Removed flex-1 and overflow-y-auto since <main> now handles the scrolling */}
        <div className="p-4 sm:p-6 md:p-8 lg:px-10 lg:py-8">
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