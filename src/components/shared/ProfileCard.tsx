import React from "react";

interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
  status: "ACTIVE" | "SUSPENDED";
}

const ProfileCard = ({ user }: { user: UserType }) => {
  if(!user) {
    return null
  }
  const { name, email, role, emailVerified, createdAt, updatedAt, status, image } = user;

  // Badge colors
  const roleColors: Record<string, string> = {
    ADMIN: "bg-teal-100 text-teal-800",
    PROVIDER: "bg-purple-100 text-purple-800",
    CUSTOMER: "bg-blue-100 text-blue-800",
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    SUSPENDED: "bg-red-100 text-red-800",
  };

  const emailColors = emailVerified
    ? "bg-blue-100 text-blue-800"
    : "bg-yellow-100 text-yellow-800";

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden my-8 border border-gray-200 dark:border-gray-700">
      <div className="md:flex">
        {/* Left Panel: Image */}
        <div className="md:w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
          {image ? (
            <img
              className="h-40 w-40 rounded-full object-cover border-4 border-teal-600 shadow-md"
              src={image}
              alt={name}
            />
          ) : (
            <div className="h-40 w-40 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-5xl font-bold text-gray-600">
              {name.charAt(0)}
            </div>
          )}

          {/* Name */}
          <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">{name}</h1>

          {/* Badges Row */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[role]}`}
            >
              {role}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
            >
              {status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${emailColors}`}>
              {emailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        {/* Right Panel: Info */}
        <div className="md:w-2/3 p-6 flex flex-col justify-center space-y-5">
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Email</p>
            <p className="text-gray-900 dark:text-gray-200">{email}</p>
          </div>

          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Created At</p>
              <p className="text-gray-900 dark:text-gray-200">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Updated At</p>
              <p className="text-gray-900 dark:text-gray-200">
                {new Date(updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;