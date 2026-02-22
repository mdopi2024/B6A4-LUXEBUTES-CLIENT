import { getOrderByUserId } from '@/actions/order.actions';
import CustomerOrderTable from '@/components/modules/order/CustomerOrderTable';
import { userServices } from '@/services/userServices';


const MyOrdersPage = async() => {
    const session = await userServices.getSession()
    const {data} = await getOrderByUserId(session?.user?.id)
    return (
        <div>
          <CustomerOrderTable data={data}></CustomerOrderTable>
        </div>
    );
};

export default MyOrdersPage;