import UserAllOrderTable from '@/components/modules/order/AdminAllOrderTable';
import AllOrderTable from '@/components/modules/order/AdminAllOrderTable';
import { orderServices } from '@/services/orderServices';


const AdminOrderPage = async() => {

    const {data}= await orderServices.getAllOrders()
    return (
        <div>
           <UserAllOrderTable orders={data}></UserAllOrderTable>
        </div>
    );
};

export default AdminOrderPage;