"use client"

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MenuCardActions = ({ cardId, userId, isAvailable }: { cardId: string, userId: string, isAvailable: boolean }) => {
    
    const router = useRouter()
    const handleAddToCardButton = async (mealId: string) => {
        const toastId = toast.loading("Adding to cart...")
        if (!userId) {
            toast.error("Please login first to add items to cart", { id: toastId })
            router.push('/login')
            return
        }
        const data = {userId,mealId}
        console.log(data)
    }
    return (
        <div className="flex gap-2 mt-4">

            {/* View Details */}
            <button
                className="flex-1  rounded-md transition border-2 hover:bg-[#0f766d4b] border-[#0F766E]">
                View
            </button>

            {/* Add to Cart */}
            <button
                disabled={!isAvailable}
                onClick={() => handleAddToCardButton(cardId)}
                className={`flex-1 py-1 rounded-md hover:font-semibold    transition text-white ${isAvailable ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                style={{
                    backgroundColor: isAvailable ? "#FBBF24" : "#FBBF24",
                    color: isAvailable ? "#000" : "#fff",
                }}
            >
                Add to Card
            </button>

        </div>
    );
};

export default MenuCardActions;