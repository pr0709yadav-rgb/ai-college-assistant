function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300">

      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="text-white text-2xl font-bold mt-4">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;