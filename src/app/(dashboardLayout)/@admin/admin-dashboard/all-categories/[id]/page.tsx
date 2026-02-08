import UpdateCategoryCard from "@/components/modules/categories/updateCategoryCard";

const Page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    return (
        <div>
           <UpdateCategoryCard></UpdateCategoryCard>
        </div>
    );
};

export default Page;