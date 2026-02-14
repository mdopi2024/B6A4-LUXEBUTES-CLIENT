"use client";

import React from "react";
import { Pencil, UserCircle, Trash2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { toast } from "sonner";
import { deleteUser } from "@/actions/user.actions";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  data: UserData[];
}

const UserTableCard: React.FC<Props> = ({ data }) => {
  const handleDeleteUser = async(id:string)=>{
    const toastId = toast.loading("Deleting user......");
    const data = await deleteUser(id);
    if(!data.success){
      return toast.error(data.message || "Failed to user, please try againg ",{id:toastId})
    }
    toast.success(data.message || "User deleted successfully",{id:toastId});
  }
  return (
    <Tooltip.Provider>
      <div className="overflow-x-auto w-full rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-white">
            <tr className="text-left text-gray-700 uppercase text-sm">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Updated At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800">
            {data?.map((user, index) => (
              <tr
                key={user.id}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-[#E6FFFA] transition-colors"
                    : "bg-gray-100 hover:bg-[#E6FFFA] transition-colors"
                }
              >
                <td className="px-4 py-2 text-sm text-gray-600 font-medium">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-semibold text-[#0F766E]">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700 italic">{user.email}</td>
                <td className="px-4 py-2 text-sm font-medium text-[#0F766E]">{user.role}</td>
                <td className="px-4 py-2 text-sm text-[#FBBF24] font-semibold">{user.status}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}{" "}
                  <span className="text-gray-500 text-xs">{new Date(user.createdAt).toLocaleTimeString()}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(user.updatedAt).toLocaleDateString()}{" "}
                  <span className="text-gray-500 text-xs">{new Date(user.updatedAt).toLocaleTimeString()}</span>
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-2 flex justify-center gap-2">
                  {/* Update Status */}
                  <Link href={`/admin-dashboard/manageUser/update-user-status/${user.id}`}>
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <div className="p-2 rounded-full bg-[#FBBF24] hover:bg-yellow-400 text-white cursor-pointer transition-colors duration-200">
                        <UserCircle size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg select-none"
                    >
                      Update Status
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                  
                  </Link>

                  {/* Update Role */}
              <Link href={`/admin-dashboard/manageUser/update-user-role/${user.id}`}>
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <div className="p-2 rounded-full bg-[#0F766E] hover:bg-teal-700 text-white cursor-pointer transition-colors duration-200">
                        <Pencil size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg select-none"
                    >
                      Update Role
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>
              </Link>

                  {/* Delete User */}
                  <Tooltip.Root   delayDuration={150}>
                    <Tooltip.Trigger onClick={()=>handleDeleteUser(user?.id)} asChild>
                      <div className="p-2 rounded-full bg-[#FBBF24] hover:bg-yellow-400 text-white cursor-pointer transition-colors duration-200">
                        <Trash2 size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg select-none"
                    >
                      Delete User
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>

                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tooltip.Provider>
  );
};

export default UserTableCard;
