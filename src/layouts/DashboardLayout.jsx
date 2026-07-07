import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
      min-h-screen
      overflow-hidden
      bg-slate-100
      dark:bg-slate-950
    "
    >
      {/* Background Decoration */}

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="flex min-h-screen">

        {/* Desktop Sidebar */}

        <aside className="hidden lg:block w-78 p-5">
          <div className="h-full overflow-hidden rounded-3xl shadow-xl">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile Sidebar */}

        {sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              className="
              fixed
              inset-0
              z-40
              bg-black/50
              backdrop-blur-sm
              lg:hidden
            "
            />

            <aside
              className="
              fixed
              left-0
              top-0
              z-50
              h-full
              w-72
              shadow-2xl
              lg:hidden
            "
            >
              <div className="relative h-full">
                <Sidebar
                  closeSidebar={() => setSidebarOpen(false)}
                />

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="
                  absolute
                  right-4
                  top-4
                  rounded-xl
                  bg-slate-800
                  p-2
                  text-white
                "
                >
                  <X size={20} />
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main */}

        <div className="flex flex-1 flex-col">

          {/* Topbar */}

          <header
            className="
            sticky
            top-0
            z-30
            px-4
            pt-4
            sm:px-6
            lg:px-8
          "
          >
            <div className="flex items-center gap-4">

              <button
                onClick={() => setSidebarOpen(true)}
                className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-sm
                transition
                hover:shadow-lg
                dark:border-slate-700
                dark:bg-slate-900
                lg:hidden
              "
              >
                <Menu size={22} />
              </button>

              <div className="flex-1">
                <Topbar />
              </div>

            </div>
          </header>

          {/* Content */}

          <main
            className="
            flex-1
            overflow-y-auto
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
          >
            {children}
          </main>

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;