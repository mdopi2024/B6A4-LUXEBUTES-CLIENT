import { getMenuById } from "@/actions/menu.action";
import MenuDetailCard from "@/components/modules/menu/MenuDetailCard";



const MenuDetails =async ({params}:{params:Promise<{id:string}>}) => {
   const {id} = await params

   const {data} = await getMenuById(id);
   
    
    return (
        <div className="">
           <MenuDetailCard data={data}></MenuDetailCard>
        </div>
    );
};

export default MenuDetails;