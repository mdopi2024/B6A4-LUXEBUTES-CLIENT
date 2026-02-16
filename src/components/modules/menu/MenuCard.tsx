import { MenuType } from "@/app/(commonLayout)/menu/page";
import Image from "next/image";

const MenuCard = ({ menu }: { menu: MenuType }) => {
  const { name, description, price, image, isAvailable, category } = menu;

  return (
    <div className="  flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">

      {/* Image */}
      <div className="p-2">
        <div className="relative h-40 w-full overflow-hidden border rounded-md ">
          {/* <Image
          src={image}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        /> */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Category */}
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "#0F766E" }}
        >
          {category?.categoryName}
        </span>

        {/* Name */}
        <h3 className="mt-1 text-lg font-bold text-gray-900 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-600 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Price & Availability */}
        <div className="flex items-center justify-between mt-3">

          <p className="text-md font-semibold" >
            ৳ {price}
          </p>

          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
              }`}
          >
            {isAvailable ? "Available" : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">

          {/* View Details */}
          <button
            className="flex-1  rounded-md transition border-2 hover:bg-[#0f766d4b] border-[#0F766E]">
            View
          </button>

          {/* Add to Cart */}
          <button
            disabled={!isAvailable}
            className={`flex-1 py-1 rounded-md   transition text-white ${isAvailable ? "" : "opacity-50 cursor-not-allowed"
              }`}
            style={{
              backgroundColor: isAvailable ? "#FBBF24" : "#FBBF24",
              color: isAvailable ? "#000" : "#fff",
            }}
          >
            Add
          </button>

        </div>

      </div>
    </div>
  );
};

export default MenuCard;
