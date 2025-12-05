import React from 'react';
import { UserRole, View } from '../types';
import { GraduationCap, LogOut, Menu, X, BookOpen, User, Phone, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  currentUser: { role: UserRole; name?: string } | null;
  onChangeView: (view: View) => void;
  onLogout: () => void;
  onLoginRequest: (role: UserRole) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  currentUser, 
  onChangeView, 
  onLogout,
  onLoginRequest
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavLink = ({ view, label, icon: Icon }: { view: View; label: string; icon: any }) => (
    <button
      onClick={() => {
        onChangeView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        currentView === view 
          ? 'bg-primary-100 text-primary-700' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => onChangeView('HOME')}>
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduGrade</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink view="HOME" label="Home" icon={BookOpen} />
              <NavLink view="FEATURES" label="Features" icon={LayoutDashboard} />
              <NavLink view="ABOUT" label="About & Contact" icon={Phone} />
              
              {currentUser ? (
                <div className="flex items-center ml-4 space-x-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-700 font-medium">
                    {currentUser.name || currentUser.role}
                  </span>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center ml-4 space-x-2">
                   <div className="relative group">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700">
                        Login
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100">
                        <button onClick={() => onLoginRequest(UserRole.ADMIN)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Login</button>
                        <button onClick={() => onLoginRequest(UserRole.FACULTY)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Faculty Login</button>
                        <button onClick={() => onLoginRequest(UserRole.STUDENT)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Student Login</button>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1 px-2">
              <NavLink view="HOME" label="Home" icon={BookOpen} />
              <NavLink view="FEATURES" label="Features" icon={LayoutDashboard} />
              <NavLink view="ABOUT" label="About" icon={Phone} />
              {!currentUser && (
                <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
                   <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Login As</p>
                   <button onClick={() => { onLoginRequest(UserRole.ADMIN); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-md">Admin</button>
                   <button onClick={() => { onLoginRequest(UserRole.FACULTY); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-md">Faculty</button>
                   <button onClick={() => { onLoginRequest(UserRole.STUDENT); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-md">Student</button>
                </div>
              )}
              {currentUser && (
                 <button
                 onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                 className="w-full mt-4 flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
               >
                 <LogOut size={18} />
                 <span>Logout</span>
               </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
             <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <GraduationCap className="h-6 w-6 text-gray-400" />
                <span className="text-gray-500 text-sm">© 2024 EduGrade System</span>
             </div>
             <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Support</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
