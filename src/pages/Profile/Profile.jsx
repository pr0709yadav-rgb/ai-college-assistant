import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/user.service";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setFormData({
        name: data.user.name || "",
        college: data.user.college || "",
        branch: data.user.branch || "",
        year: data.user.year || "",
        email: data.user.email || "",
      });
    } catch (error) {
      toast.error("Failed to load profile.");
    }
  };

  const handleProfileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // Update Profile
  // ==========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile({
        name: formData.name,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Change Password
  // ==========================

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setPasswordLoading(true);

      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password changed successfully.");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Profile */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-cyan-400 mb-8">
            My Profile
          </h1>

          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >

            <input
              name="name"
              value={formData.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              name="college"
              value={formData.college}
              onChange={handleProfileChange}
              placeholder="College"
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              name="branch"
              value={formData.branch}
              onChange={handleProfileChange}
              placeholder="Branch"
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              name="year"
              value={formData.year}
              onChange={handleProfileChange}
              placeholder="Year"
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              value={formData.email}
              disabled
              className="w-full p-3 rounded-lg bg-slate-900 text-slate-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Updating..."
                : "Update Profile"}
            </button>

          </form>

        </div>

        {/* Password */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Change Password
          </h2>

          <form
            onSubmit={handlePasswordUpdate}
            className="space-y-5"
          >

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold"
            >
              {passwordLoading
                ? "Changing..."
                : "Change Password"}
            </button>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;