import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import { LayoutDashboard, FileSpreadsheet, LogOut, Settings, HelpCircle } from 'lucide-react';

    export default function Layout({ children }: { children: React.ReactNode }) {
      const { signOut } = useAuth();
      const location = useLocation();

      const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Campaigns', href: '/campaigns', icon: FileSpreadsheet },
        { name: 'Help', href: '/help', icon: HelpCircle },
        { name: 'Settings', href: '/settings', icon: Settings },
      ];

      return (
        <div className="min-h-screen flex"> {/* Added flex to the parent */}
          {/* Sidebar */}
          <div className="w-64 flex flex-col bg-indigo-950 text-white">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto h-screen"> {/* Added h-screen */}
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold">Leadlabs</h1>
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
                            ? 'bg-indigo-800 text-white'
                            : 'text-gray-300 hover:bg-indigo-800 hover:text-white'
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <Icon className="mr-3 h-6 w-6" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                <button
                  onClick={() => signOut()}
                  className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
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
      );
    }
