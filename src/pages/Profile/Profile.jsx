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
      return toast.error("Passwords do not match.");
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
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
            My Profile
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Manage your personal information and keep your account secure.
          </p>
        </div>

        {/* Profile Information */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
            Personal Information
          </h2>

          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                College
              </label>

              <input
                name="college"
                value={formData.college}
                onChange={handleProfileChange}
                placeholder="College"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Branch
              </label>

              <input
                name="branch"
                value={formData.branch}
                onChange={handleProfileChange}
                placeholder="Branch"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Academic Year
              </label>

              <input
                name="year"
                value={formData.year}
                onChange={handleProfileChange}
                placeholder="Year"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>

              <input
                value={formData.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-100 p-3 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>

        {/* Change Password */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
            Change Password
          </h2>

          <form
            onSubmit={handlePasswordUpdate}
            className="space-y-6"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Current Password
              </label>

              <input
                type="password"
                name="oldPassword"
                placeholder="Current Password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
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