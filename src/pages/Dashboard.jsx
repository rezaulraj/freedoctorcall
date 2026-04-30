import { useAuthStore } from "../stores/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.fullName}
        </h2>
        <p className="text-gray-500 mt-1">You are logged in as {user?.role}.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <p className="text-gray-500">Appointments</p>
          <h3 className="text-3xl font-bold text-teal-600 mt-2">0</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <p className="text-gray-500">Prescriptions</p>
          <h3 className="text-3xl font-bold text-teal-600 mt-2">0</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <p className="text-gray-500">Notifications</p>
          <h3 className="text-3xl font-bold text-teal-600 mt-2">0</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
