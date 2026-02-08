import UpdateCategoryCard from "@/components/modules/categories/updateCategoryCard";
import { categoriesServices } from "@/services/categoriesServices";

const Page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const {data }= await categoriesServices.getCategoryById(id)
    
    return (
        <div>
           <UpdateCategoryCard data={data} ></UpdateCategoryCard>
        </div>
    );
};

export default Page;