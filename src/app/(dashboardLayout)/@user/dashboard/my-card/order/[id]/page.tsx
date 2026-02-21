import OrderForm from '@/components/modules/order/OrderForm';
import { userServices } from '@/services/userServices';


const OrderPage =async ({params}:{params:Promise<{id:string}>}) => {
 const {id} = await params
 const{user} = await userServices.getSession()
    return (
        <div>
            <OrderForm userId={user?.id} id={id}></OrderForm>
        </div>
    );
};

export default OrderPage;