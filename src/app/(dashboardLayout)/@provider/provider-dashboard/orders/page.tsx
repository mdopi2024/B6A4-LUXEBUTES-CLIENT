import ProviderAllOrderTable from '@/components/modules/order/ProviderAllOrderTable';
import { orderServices } from '@/services/orderServices';
import React from 'react';

const ProviderOrderPage = async() => {
    const {data} = await orderServices.getAllOrders()
    return (
        <div>
            <ProviderAllOrderTable orders={data}></ProviderAllOrderTable>
        </div>
    );
};

export default ProviderOrderPage;