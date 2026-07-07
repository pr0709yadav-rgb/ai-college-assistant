import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

      <div className="flex h-full">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-shrink-0 border-r border-white/10 bg-slate-900/70 backdrop-blur-xl">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-slate-900 shadow-2xl lg:hidden">
              <Sidebar
                closeSidebar={() =>
                  setSidebarOpen(false)
                }
              />
            </aside>
          </>
        )}

        {/* Main Section */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Navbar */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">

            <div className="flex h-20 items-center px-4 sm:px-6 lg:px-8">

              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 rounded-xl border border-white/10 bg-slate-800/60 p-2 transition hover:bg-slate-700 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="flex-1">
                <Topbar />
              </div>

            </div>

          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">

            <div className="min-h-full p-4 sm:p-6 lg:p-8">

              {children}

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;