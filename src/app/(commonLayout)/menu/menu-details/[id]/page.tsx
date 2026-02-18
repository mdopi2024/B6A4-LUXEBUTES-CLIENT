import { getMenuById } from "@/actions/menu.action";
import MenuDetailCard from "@/components/modules/menu/MenuDetailCard";
import { userServices } from "@/services/userServices";



const MenuDetails =async ({params}:{params:Promise<{id:string}>}) => {
   const {id} = await params
   const session = await userServices.getSession()
   const {data} = await getMenuById(id);
   
    
    return (
        <div className="">
           <MenuDetailCard data={data} userId={session?.user?.id } ></MenuDetailCard>
        </div>
    );
};

export default MenuDetails;