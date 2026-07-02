function StatCard({ number, label }) {
  return (
    <div className="bg-slate-800 rounded-xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">

      <h2 className="text-5xl font-bold text-cyan-400">
        {number}
      </h2>

      <p className="mt-4 text-gray-300 text-lg">
        {label}
      </p>

    </div>
  );
}

export default StatCard;