import DashboardLayout from "../../layouts/DashboardLayout";

const Attendance = () => {
  return (
    <DashboardLayout>

      <div className="bg-slate-800 rounded-xl p-8">

        <h1 className="text-3xl font-bold">
          Attendance Predictor
        </h1>

        <p className="text-slate-400 mt-3">
          Calculate attendance percentage and required classes.
        </p>

      </div>

    </DashboardLayout>
  );
};

export default Attendance;