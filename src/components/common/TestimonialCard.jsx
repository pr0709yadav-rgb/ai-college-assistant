import { FaQuoteLeft } from "react-icons/fa";


function TestimonialCard({ review, name, role }) {
  return (
    <div className="bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-cyan-500/20 transition duration-300">

      <div className="text-cyan-400 text-3xl">
            <FaQuoteLeft />
      </div>

      <p className="text-gray-300 mt-5 italic">
        "{review}"
      </p>

      <div className="mt-8">

        <h3 className="text-white font-bold text-xl">
          {name}
        </h3>

        <p className="text-cyan-400">
          {role}
        </p>

      </div>

    </div>
  );
}

export default TestimonialCard;