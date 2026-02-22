import { getMenuById } from "@/actions/menu.action";
import { getReviewByMealId } from "@/actions/review.actions";
import MenuDetailCard from "@/components/modules/menu/MenuDetailCard";
import { userServices } from "@/services/userServices";



const MenuDetails =async ({params}:{params:Promise<{id:string}>}) => {
   const {id} = await params
   const session = await userServices.getSession()
   const menuPromise =  getMenuById(id);
   const reviewPromise = getReviewByMealId(id)

   const [data,review]= await Promise.all([menuPromise,reviewPromise])
   
    
    return (
        <div >
           <MenuDetailCard data={data?.data} userId={session?.user?.id } ></MenuDetailCard>
        </div>
    );
};

export default MenuDetails;