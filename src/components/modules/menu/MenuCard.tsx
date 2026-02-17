

import { MenuType } from "@/app/(commonLayout)/menu/page";
import { userServices } from "@/services/userServices";
import MenuCardActions from "./MenuCardActions";

const MenuCard = async ({ menu }: { menu: MenuType }) => {
  const { id, name, description, price, image, isAvailable, category } = menu;
  const session = await userServices.getSession()
  return (
    <div className="  flex flex-col h-full bg-teal-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">

      {/* Image */}
      <div className="p-2">
        <div className="relative h-40 w-full overflow-hidden border rounded-md ">
          <img
            src={image}
            alt={name}
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
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
        <h3 className="mt-1 text-lg text-gray-700 font-bold text-gray-00 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-600 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Price & Availability */}
        <div className="flex items-center justify-between mt-3">

          <p className="text-md font-semibold" >
            <span >৳</span> {price}
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
        <MenuCardActions cardId={id} userId={session?.user?.id}  isAvailable={isAvailable}></MenuCardActions>


      </div>
    </div>
  );
};

export default MenuCard;
