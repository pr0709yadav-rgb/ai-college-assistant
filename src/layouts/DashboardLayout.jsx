// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// import Sidebar from "../components/dashboard/Sidebar";
// import Topbar from "../components/dashboard/Topbar";

// const DashboardLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div
//       className="
//       min-h-screen
//       overflow-hidden
//       app-bg
//     "
//     >
//       <div className="flex min-h-screen">

//         {/* Desktop Sidebar */}

//         <aside className="hidden w-80 p-4 lg:block xl:p-5">
//           <div className="h-full overflow-hidden rounded-2xl shadow-2xl shadow-slate-950/10 dark:shadow-black/30">
//             <Sidebar />
//           </div>
//         </aside>

//         {/* Mobile Sidebar */}

//         {sidebarOpen && (
//           <>
//             <div
//               onClick={() => setSidebarOpen(false)}
//               className="
//               fixed
//               inset-0
//               z-40
//               bg-slate-950/55
//               backdrop-blur-md
//               lg:hidden
//             "
//             />

//             <aside
//               className="
//               fixed
//               left-0
//               top-0
//               z-50
//               h-full
//               w-72
//               shadow-2xl
//               lg:hidden
//             "
//             >
//               <div className="relative h-full">
//                 <Sidebar
//                   closeSidebar={() => setSidebarOpen(false)}
//                 />

//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="
//                   absolute
//                   right-4
//                   top-4
//                   rounded-full
//                   bg-slate-950/80
//                   p-2
//                   text-white
//                   shadow-lg
//                   backdrop-blur
//                 "
//                   aria-label="Close sidebar"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             </aside>
//           </>
//         )}

//         {/* Main */}

//         <div className="flex flex-1 flex-col">

//           {/* Topbar */}

//           <header
//             className="
//             sticky
//             top-0
//             z-30
//             px-4
//             pt-4
//             sm:px-6
//             lg:px-8
//           "
//           >
//             <div className="flex items-center gap-4">

//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="
//                 rounded-xl
//                 border
//                 border-white/70
//                 bg-white/85
//                 p-3
//                 shadow-lg
//                 shadow-slate-950/5
//                 backdrop-blur-xl
//                 transition-all
//                 hover:-translate-y-0.5
//                 hover:shadow-xl
//                 dark:border-white/10
//                 dark:bg-slate-900/80
//                 lg:hidden
//               "
//                 aria-label="Open sidebar"
//               >
//                 <Menu size={22} />
//               </button>

//               <div className="flex-1">
//                 <Topbar />
//               </div>

//             </div>
//           </header>

//           {/* Content */}

//           <main
//             className="
//             flex-1
//             overflow-y-auto
//             px-4
//             pb-8
//             pt-5
//             sm:px-6
//             lg:px-8
//           "
//           >
//             {children}
//           </main>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-bg h-screen overflow-hidden">
      <div className="flex h-full">

        {/* ================= Desktop Sidebar ================= */}

        <aside className="hidden h-full w-80 shrink-0 p-4 lg:block xl:p-5">
          <div className="h-full overflow-hidden rounded-2xl shadow-2xl shadow-slate-950/10 dark:shadow-black/30">
            <Sidebar />
          </div>
        </aside>

        {/* ================= Mobile Sidebar ================= */}

        {sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-md lg:hidden"
            />

            <aside className="fixed left-0 top-0 z-50 h-screen w-72 lg:hidden">
              <div className="relative h-full">
                <Sidebar
                  closeSidebar={() => setSidebarOpen(false)}
                />

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-slate-950/80 p-2 text-white shadow-lg backdrop-blur"
                >
                  <X size={20} />
                </button>
              </div>
            </aside>
          </>
        )}

        {/* ================= Main ================= */}

        <div className="flex h-full min-w-0 flex-1 flex-col">

          {/* Topbar */}

          <header className="sticky top-0 z-30 flex-shrink-0 px-4 pt-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">

              <button
                onClick={() => setSidebarOpen(true)}
                className="
                  rounded-xl
                  border
                  border-white/70
                  bg-white/85
                  p-3
                  shadow-lg
                  shadow-slate-950/5
                  backdrop-blur-xl
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  dark:border-white/10
                  dark:bg-slate-900/80
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

          {/* ================= Scrollable Content ================= */}

          <main
            className="
              flex-1
              overflow-y-auto
              px-4
              pt-5
              pb-8
              sm:px-6
              lg:px-8

              scrollbar-thin
              scrollbar-thumb-cyan-500
              dark:scrollbar-thumb-slate-600
              scrollbar-track-transparent
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