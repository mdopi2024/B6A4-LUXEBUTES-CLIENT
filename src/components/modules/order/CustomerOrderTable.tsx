'use client'

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { toast } from 'sonner';
import { updateOrderStatus } from '@/actions/order.actions';

export interface OrderWithMeal {
  id: string;
  userId: string;
  mealId: string;
  deliveryAddress: string;
  paymentMethod: string;
  quantity: number;
  totalAmount: string;
  status: string;
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
  };
}

interface Props {
  data: OrderWithMeal[];
}

const CustomerOrderTable: React.FC<Props> = ({ data }) => {

  const handleCancelOrder = async(id:string,status:"CANCELLED")=>{
    const toastId = toast.loading("Updating status......")
    try{
      const payload = {status}
      const result = await updateOrderStatus(id,payload)
      if(!result?.success) return toast.error(result?.message || "Failed to update order",{id:toastId})
      toast.success(result?.message || "Order updated successfully.",{id:toastId})
    }catch(err){
      toast.error("Something went wrong, please try later",{id:toastId})
    }
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 text-left text-sm rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Meal</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => {
            const canCancel = order.status === 'PREPARING';
            const canReview = order.status === 'DELIVERED';

            return (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center gap-3">
                  <img
                    src={order.meal.image}
                    alt={order.meal.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{order.meal.name}</span>
                </td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">৳ {order.totalAmount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-md text-white text-xs font-medium ${
                      order.status === 'PREPARING'
                        ? 'bg-yellow-500'
                        : order.status === 'DELIVERED'
                        ? 'bg-green-500'
                        : order.status === 'CANCELLED'
                        ? 'bg-red-500'
                        : order.status === 'READY'
                        ? 'bg-blue-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {/* Cancel Button with Tooltip */}
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <button
                        disabled={!canCancel}
                        onClick={()=>handleCancelOrder(order.id,'CANCELLED')}
                        className={`px-3 py-1 rounded text-white transition ${
                          canCancel
                            ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Cancel
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-lg select-none"
                    >
                      {canCancel
                        ? 'Click to cancel order'
                        : "Can cancel only while preparing"}
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>

                  {/* Review Button with Tooltip */}
                  <Tooltip.Root delayDuration={150}>
                    <Tooltip.Trigger asChild>
                      <button
                        disabled={!canReview}
                        className={`px-3 py-1 rounded text-white transition ${
                          canReview
                            ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Review
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md shadow-md select-none"
                    >
                      {canReview
                        ? 'Click to review this meal'
                        : 'You can review only after delivery'}
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrderTable;