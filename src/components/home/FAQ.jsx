import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is AI College Assistant?",
      answer:
        "AI College Assistant is an AI-powered platform that helps students with placement preparation, coding practice, resume review, mock interviews, attendance tracking, and chatting with syllabus PDFs.",
    },
    {
      question: "Can I upload my syllabus PDFs?",
      answer:
        "Yes. You can upload your syllabus or notes in PDF format and ask questions directly from them using AI.",
    },
    {
      question: "Is Resume Review free?",
      answer:
        "Yes. Basic resume analysis is free. Premium AI feedback and ATS optimization will be available in future updates.",
    },
    {
      question: "How does the Mock Interview work?",
      answer:
        "The AI asks technical and HR interview questions based on your selected role and provides feedback on your answers.",
    },
    {
      question: "Can I practice coding on this platform?",
      answer:
        "Yes. You can solve coding problems, view solutions, track your progress, and prepare for technical interviews.",
    },
    {
      question: "Does it create a Placement Roadmap?",
      answer:
        "Yes. Based on your skills, semester, and target company, the AI generates a personalized placement preparation roadmap.",
    },
  ];

  return (
    <section id="faq" className="bg-slate-900 py-24 text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Find answers to the most common questions about AI College Assistant.
        </p>

        {/* FAQ Items */}
        <div className="mt-16 space-y-5">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-xl font-semibold">
                  {item.question}
                </span>

                <span className="text-3xl text-cyan-400 font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-8">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;