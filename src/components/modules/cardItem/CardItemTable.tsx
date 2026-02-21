"use client";

import { deleteCardItem } from '@/actions/addToCard.action';
import { CartItemType } from '@/app/(dashboardLayout)/@user/dashboard/my-card/page';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

interface CardItemTableProps {
    data: CartItemType[];
}

const CardItemTable: React.FC<CardItemTableProps> = ({ data }) => {
    const handleDeleteCardItem = async (id: string) => {
        const toastId = toast.loading("Item is deleting.......");
        try {
            const data = await deleteCardItem(id);
            if (!data.success) {
                return toast.error(data?.message || 'Failed to delete item', { id: toastId })
            }
            toast.success(data?.message || "Item deleted successfully", { id: toastId })
        } catch (err: any) {
            toast.error(err.message || "something went wrong, please try again later", { id: toastId })
        }
    }

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full border   text-sm">
                <thead>
                    <tr className="text-gray-700 bg-teal-100">
                        <th className="px-3 py-2 text-left">#</th>
                        <th className="py-2 text-left">Meal</th>
                        <th className=" py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-left">Price (৳)</th>
                        <th className=" py-2 text-left">Availability</th>
                        <th className=" py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                No items in cart
                            </td>
                        </tr>
                    )}

                    {data.map((item, index) => (
                        <tr
                            key={item.id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>

                            {/* Meal Name + Image */}
                            <td className="py-2 flex items-center gap-3 whitespace-nowrap">
                                <img
                                    src={item.meal.image}
                                    alt={item.meal.name}
                                    className="w-12 h-12 object-cover rounded-md border"
                                />
                                <span className="font-medium">{item.meal.name}</span>
                            </td>

                            {/* Category */}
                            <td className=" py-2 whitespace-nowrap">{item.meal?.category?.categoryName || "N/A"}</td>

                            {/* Price */}
                            <td className="px-3 py-2 whitespace-nowrap">{item.meal.price}</td>

                            {/* Availability */}
                            <td
                                className={` py-2 font-medium whitespace-nowrap ${item.meal.isAvailable ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {item.meal.isAvailable ? "Available" : "Out of Stock"}
                            </td>

                            {/* Actions */}
                            <td className="  py-2 flex justify-center items-center gap-2 whitespace-nowrap">
                                <Link href={`/dashboard/my-card/order/${item?.id}`}
                                    className={`${!item.meal.isAvailable ? "pointer-events-none opacity-50  px-3 py-1" : ""}px-3 py-1 bg-green-600 text-white rounded-md cursor-pointer transition hover:bg-green-700 `}
                                >
                                    Order
                                </Link>
                                <button onClick={() => handleDeleteCardItem(item?.id)} className="px-3 py-1 bg-red-600 text-white rounded-md cursor-pointer transition hover:bg-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CardItemTable;
