import React from 'react';

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
                                <td className="px-4 py-2">{order.totalAmount}</td>
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
                                    <button
                                        disabled={!canCancel}
                                        className={`px-3 py-1 rounded text-white transition ${
                                            canCancel
                                                ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                                                : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                        title={
                                            !canCancel
                                                ? 'You can cancel only when status is PREPARING'
                                                : ''
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                        Review
                                    </button>
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