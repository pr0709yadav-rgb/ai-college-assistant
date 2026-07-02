import TestimonialCard from "../common/TestimonialCard";

const testimonials = [
  {
    review:
      "The AI Resume Review helped me improve my resume and get shortlisted.",
    name: "Rahul Sharma",
    role: "Software Engineer",
  },
  {
    review:
      "Mock Interviews boosted my confidence before placements.",
    name: "Priya Verma",
    role: "SDE Intern",
  },
  {
    review:
      "The PDF Chat feature saved hours of studying before exams.",
    name: "Aman Gupta",
    role: "B.Tech Student",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-900 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white">
          What Students Say
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Trusted by students preparing for placements.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {testimonials.map((student) => (
            <TestimonialCard
              key={student.name}
              review={student.review}
              name={student.name}
              role={student.role}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;