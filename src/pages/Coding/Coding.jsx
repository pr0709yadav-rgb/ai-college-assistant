import DashboardLayout from "../../layouts/DashboardLayout";

const Coding = () => {
  return (
    <DashboardLayout>

      <div className="bg-slate-800 rounded-xl p-8">

        <h1 className="text-3xl font-bold">
          AI Coding Assistant
        </h1>

        <p className="text-slate-400 mt-3">
          Ask coding questions, debug errors and generate code.
        </p>

      </div>

    </DashboardLayout>
  );
};

export default Coding;