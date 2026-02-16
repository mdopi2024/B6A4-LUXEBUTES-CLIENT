"use client";

import React from "react";
import { Pencil, UserCircle, Trash2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { toast } from 'sonner';
import { deleteMenu } from "@/actions/menu.action";

export type Meal = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    categoryName: string;
  };
};

interface Props {
  data: Meal[];
}

const MenuTable: React.FC<Props> = ({ data }) => {

  const handleDeleteMenu = async(id:string)=>{
    const toastId = toast.loading("Deleting menu.......")
        try{
          const data = await deleteMenu(id)
          if(!data?.success) return toast.error(data?.message|| "Failed to delete menu",{id:toastId})
          toast.success(data?.message || "Deleted menu successfully",{id:toastId})
        }catch(error){
           toast.error("Something went wrong, Please try again",{id:toastId})
        }
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
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Updated At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800">
            {data?.map((meal, index) => (
              <tr
                key={meal.id}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-[#E6FFFA] transition-colors"
                    : "bg-gray-100 hover:bg-[#E6FFFA] transition-colors"
                }
              >
                <td className="px-4 py-2 text-sm text-gray-600 font-medium">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-semibold text-[#0F766E]">{meal.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700 italic">{meal.description}</td>
                <td className="px-4 py-2 text-sm text-gray-700 italic">{meal.category.categoryName}</td>
                <td className="px-4 py-2 text-sm text-gray-800"> ৳ {meal.price}</td>
                <td
                  className= "px-4 py-2 text-sm font-medium text-[#0F766E]"
                >
                  {meal.isAvailable ? "Yes" : "Not"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(meal.createdAt).toLocaleDateString()}{" "}
                  <span className="text-gray-500 text-xs">{new Date(meal.createdAt).toLocaleTimeString()}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(meal.updatedAt).toLocaleDateString()}{" "}
                  <span className="text-gray-500 text-xs">{new Date(meal.updatedAt).toLocaleTimeString()}</span>
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-2 flex justify-center gap-2">
                  {/* Update menu */}
                 <Link href={`/provider-dashboard/manage-menu/update-menu/${meal.id}`}>
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <div className="p-2 rounded-full bg-[#FBBF24] hover:bg-yellow-400 text-white cursor-pointer transition-colors duration-200">
                        <Pencil size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg select-none"
                    >
                      Update Menu
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                 </Link>

                  {/* Delete */}
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <div onClick={()=>handleDeleteMenu(meal?.id)} className="p-2 rounded-full bg-red-500 hover:bg-red-700 text-white cursor-pointer transition-colors duration-200">
                        <Trash2 size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg select-none"
                    >
                      Delete Menu
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

export default MenuTable;
