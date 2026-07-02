function Hero() {
  return (
    <section className="bg-slate-900 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Side */}
          <div>
            <p className="text-cyan-400 font-semibold">
              🚀 AI Powered Learning Platform
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
              Crack Placements with
              <span className="text-cyan-400"> AI College Assistant</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg">
              Chat with your notes, improve your resume,
              practice coding, prepare for interviews,
              and track your placement journey.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-cyan-500 px-6 py-3 rounded-lg">
                Get Started
              </button>

              <button className="border border-cyan-500 px-6 py-3 rounded-lg">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <span className="text-8xl">🤖</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;