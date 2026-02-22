"use client";

import { addToCard } from "@/actions/addToCard.action";
import { MenuType } from "@/app/(commonLayout)/menu/page";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

const MenuDetailCard = ({ data,userId}: { data: MenuType , userId:string}) => {

  const router = useRouter()
  const handleAddToCardButton = async (mealId: string) => {
    const toastId = toast.loading("Adding to cart...")
    if (!userId) {
      toast.error("Please login first to add items to cart", { id: toastId })
      router.push('/login')
      return
    }
    const cardData = {userId, mealId }

    const data = await addToCard(cardData);

    if (!data?.success) {
      return toast.error(data?.message || "Failed to add item to cart", { id: toastId })
    }

    toast.success(data?.message || "Item added to cart successfully", { id: toastId })
  }

  return (
    <div className=" mt-1  flex items-center justify-center px-4 py-10">

      {/* Card Wrapper */}
      <div className="lg:w-3/5 h-full md:h-75 p-5 rounded-md  border shadow-xl shadow-gray-400 overflow-hidden md:flex md:gap-2">

        {/* Left: Image */}
        <div className="w-full  border  rounded-md ">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-full h-full object-cover border  rounded-md "
          />
        </div>

        {/* Right: Info Section */}
        <div className="w-full p-3  flex flex-col justify-around">

          {/* Top Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              {data?.name}
            </h1>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              {data?.description}
            </p>

            <p className="text-gray-500 text-sm mb-2">
              Category: <span className="text-gray-700 font-medium">{data?.category?.categoryName}</span>
            </p>

            <p className={`text-sm font-medium mb-4 ${data.isAvailable ? "text-green-600" : "text-red-600"}`}>
              {data.isAvailable ? "Available" : "Out of Stock"}
            </p>
          </div>

          {/* Bottom Section: Price + Button */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <h2 className="text-3xl font-semibold text-teal-600">
                ৳ {data?.price}
              </h2>
            </div>

            <button 
              className={`px-3 py-2 rounded-lg font-medium shadow-md text-black transition ${data.isAvailable
                  ? "bg-[#fbbe24d5] hover:bg-[#FBBF24] "
                  : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={!data.isAvailable}
              onClick={()=>handleAddToCardButton(data?.id)}
            >
              Add to Cart
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MenuDetailCard;
