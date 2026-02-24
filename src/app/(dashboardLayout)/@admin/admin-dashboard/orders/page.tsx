import AllOrderTable from '@/components/modules/shared/AllOrderTable';
import { orderServices } from '@/services/orderServices';
import React from 'react';

const AdminOrderPage = async() => {

    const {data}= await orderServices.getAllOrders()
    return (
        <div>
           <AllOrderTable orders={data}></AllOrderTable>
        </div>
    );
};

export default AdminOrderPage;