"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { deleteCategory } from "@/actions/category/createCategory";
import { toast } from "sonner";

interface Category {
  id: string;
  categoryName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  categories: Category[];
}

const CategoryTable: React.FC<Props> = ({ categories }) => {
  const handleDeleteCategory = async(id:string)=>{
    const toastId = toast.loading("Deleting category....")
    const data =await deleteCategory(id)
    if(!data.success){
      return toast.error("Failed to delete category. Please try again.",{id:toastId})
    }
    toast.success("Category deleted successfully.",{id:toastId})
  }
  return (
    <Tooltip.Provider>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-300 rounded-lg">
          {/* Table Head */}
          <thead className="bg-teal-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 uppercase">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 uppercase">Category Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 uppercase">Created At</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 uppercase">Updated At</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-100 uppercase">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800">
            {categories?.map((cat, index) => (
              <tr
                key={cat.id}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-teal-50 transition-colors"
                    : "bg-gray-100 hover:bg-teal-50 transition-colors"
                }
              >
                <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-medium">{cat.categoryName}</td>
                <td className="px-4 py-2 text-sm">{cat.description}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{new Date(cat.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{new Date(cat.updatedAt).toLocaleString()}</td>

                {/* Action Buttons with Visible Tooltips */}
                <td className="px-4 py-2 flex justify-center gap-2">
                  {/* Edit Button */}
                 <Link href={`/admin-dashboard/all-categories/${cat?.id}`}>
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <div className="p-2 rounded-full bg-[#FBBF24] hover:bg-yellow-400 text-white cursor-pointer transition-colors duration-200">
                        <Pencil size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg z-50 select-none"
                    >
                      Edit Category
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                 </Link>

                  {/* Delete Button */}
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <div onClick={()=>handleDeleteCategory(cat.id)} className="p-2 rounded-full bg-[#FBBF24] hover:bg-yellow-400 text-white cursor-pointer transition-colors duration-200">
                        <Trash2 size={16} />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg z-50 select-none"
                    >
                      Delete Category
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

export default CategoryTable;
