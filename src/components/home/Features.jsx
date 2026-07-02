import FeatureCard from "../common/FeatureCard";

const features = [
  {
    icon: "🤖",
    title: "AI Chat",
    description: "Ask questions from your syllabus instantly.",
  },
  {
    icon: "📄",
    title: "Resume Review",
    description: "Improve your resume using AI feedback.",
  },
  {
    icon: "🎤",
    title: "Mock Interview",
    description: "Practice interviews with AI.",
  },
  {
    icon: "💻",
    title: "Coding Practice",
    description: "Solve coding problems daily.",
  },
  {
    icon: "📚",
    title: "PDF Chat",
    description: "Chat with your notes and PDFs.",
  },
  {
    icon: "📈",
    title: "Placement Roadmap",
    description: "Track your placement journey.",
  },
];

function Features() {
  return (
    <section id="features" className="bg-slate-900 py-24">

      <h2 className="text-5xl font-bold text-center text-white">
        Powerful Features
      </h2>

      <p className="text-center text-gray-400 mt-4">
        Everything you need to crack placements
      </p>

      <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-8 px-6">

        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>

    </section>
  );
}

export default Features;