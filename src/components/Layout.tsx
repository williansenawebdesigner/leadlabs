import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import { LayoutDashboard, FileSpreadsheet, LogOut } from 'lucide-react';

    export default function Layout({ children }: { children: React.ReactNode }) {
      const { signOut } = useAuth();
      const location = useLocation();

      const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Campaigns', href: '/campaigns', icon: FileSpreadsheet },
      ];

      return (
        <div className="min-h-screen bg-gray-100">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
              <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <h1 className="text-xl font-bold text-gray-900">Leadlabs</h1>
                </div>
                <div className="mt-5 flex-grow flex flex-col">
                  <nav className="flex-1 px-2 space-y-1">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`${
                            location.pathname === item.href
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                        >
                          <Icon className="mr-3 h-6 w-6" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="mr-3 h-6 w-6" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <main className="flex-1 pb-8">
                <div className="mt-8">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    }
