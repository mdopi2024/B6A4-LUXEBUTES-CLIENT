import { getMenuById } from "@/actions/menu.action";
import { getReviewByMealId } from "@/actions/review.actions";
import MenuDetailCard from "@/components/modules/menu/MenuDetailCard";
import ReviewCard from "@/components/modules/ReviewCard";
import { userServices } from "@/services/userServices";



const MenuDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const session = await userServices.getSession()
    const menuPromise = getMenuById(id);
    const reviewPromise = getReviewByMealId(id)

    const [data, review] = await Promise.all([menuPromise, reviewPromise])
     
    console.log(review.data)

    return (
        <div>
            <div className="h-full md:h-87.5  ">
                <MenuDetailCard data={data?.data} userId={session?.user?.id} ></MenuDetailCard>
            </div>
            <div className=" mt-2 p-3  flex justify-center items-center">
                <div className="border-2 border-teal-700 rounded-md  md:w-3/5">
                    <ReviewCard review={review.data}></ReviewCard>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;