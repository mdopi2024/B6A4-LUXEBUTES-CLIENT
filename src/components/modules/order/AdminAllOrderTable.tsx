'use client'

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

export interface Orders {
  id: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  mealId: string;
  delevaryAddress: string;
  paymentMethod: string;
  quantity: number;
  totalAmount: string;
  status: "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;

  meal: {
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
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const UserAllOrderTable = ({ orders }: { orders: Orders[] }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl border">
        No orders available
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PREPARING":
        return "bg-blue-100 text-blue-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Meal</th>
            <th className="px-6 py-3">Delivery Address</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Payment</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4">
                <p className="font-medium text-gray-800">
                  {order.user?.name || "Unknown User"}
                </p>
                <p className="text-xs text-gray-400">{order.user?.email}</p>
              </td>

              <td className="px-6 py-4 flex items-center gap-3">
                <img
                  src={order.meal.image}
                  alt={order.meal.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{order.meal.name}</p>
                  <p className="text-xs text-gray-400">৳ {order.meal.price}</p>
                </div>
              </td>

              <td className="px-6 py-4 text-gray-600">{order.delevaryAddress}</td>

              <td className="px-6 py-4">{order.quantity}</td>

              <td className="px-6 py-4 font-semibold text-gray-800">
                ৳ {order.totalAmount}
              </td>

              <td className="px-6 py-4">{order.paymentMethod}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <Tooltip.Provider>
                  <Tooltip.Root delayDuration={300}>
                    <Tooltip.Trigger asChild>
                      {order.status === "CANCELLED" ? (
                        <span
                          className="text-gray-300 cursor-not-allowed transition"
                        >
                          <FiEdit size={18} />
                        </span>
                      ) : (
                        <Link
                          href={`/admin-dashboard/orders/update/${order.id}`}
                          className="text-gray-500 hover:text-blue-600 transition"
                        >
                          <FiEdit size={18} />
                        </Link>
                      )}
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      className="rounded-md bg-gray-500 text-white text-xs px-2 py-1 shadow-lg z-50"
                    >
                      {order.status === "CANCELLED"
                        ? "Cannot update a cancelled order"
                        : "Update Order Status"}
                      <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAllOrderTable;