import StatCard from "../common/StatCard";

const stats = [
  {
    number: "1000+",
    label: "Students",
  },
  {
    number: "500+",
    label: "Coding Questions",
  },
  {
    number: "95%",
    label: "Placement Success",
  },
  {
    number: "24/7",
    label: "AI Support",
  },
];

function Stats() {
  return (
    <section className="bg-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white">
          Trusted by Students
        </h2>

        <p className="text-gray-400 text-center mt-4">
          Helping thousands of students prepare smarter.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">

          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;