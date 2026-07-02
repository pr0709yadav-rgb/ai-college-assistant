import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-bold text-cyan-400">
              AI College Assistant
            </h2>

            <p className="mt-5 text-gray-400 leading-7">
              Your AI Powered Placement Companion helping students
              prepare smarter with Resume Review, Mock Interviews,
              AI Chat, Coding Practice and Placement Roadmaps.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Features
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                About
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Contact
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-cyan-400 cursor-pointer transition">
                AI Chat
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Resume Review
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Mock Interview
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Coding Practice
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">

              <FaGithub className="cursor-pointer hover:text-cyan-400 transition" />

              <FaLinkedin className="cursor-pointer hover:text-cyan-400 transition" />

              <FaTwitter className="cursor-pointer hover:text-cyan-400 transition" />

            </div>

            <button
              className="mt-10 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg transition"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              <FaArrowUp />

              Back To Top
            </button>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 AI College Assistant. All Rights Reserved.
          </p>

          <p className="text-gray-500 mt-3 md:mt-0">
            Built with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;