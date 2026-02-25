import { MenuType } from '@/app/(commonLayout)/menu/page';
import { menuServices } from '@/services/menuServices';
import React from 'react';
import MenuCard from '../menu/MenuCard';


const LatestMenus = async () => {
    const { data } = await menuServices.getAllMenu();
    console.log(data)
    return (
        <section className="bg-white  px-6 md:px-0">
            {/* Section Heading */}
            <div className="max-w-7xl mx-auto text-center mb-8">
                <h2 className=" text-4xl md:text-5xl  font-bold text-teal-800">Latest Menus</h2>
                <p className="text-lg md:text-xl pt-4 mb-12 text-center text-gray-700 max-w-3xl mx-auto">
                    Check out the 5 most recently added meals to our menu!
                </p>
            </div>

            {/* Menu Grid */}
            <div className="grid gap-2 md:grid-cols-5">
                {data
                    ?.sort(
                        (a:any, b:any) => (b.created_at) - (a.created_at))
                    .slice(0, 5) 
                    .map((menu: MenuType) => (
                        <MenuCard key={menu.id} menu={menu} />
                    ))}
            </div>
        </section>
    );
};

export default LatestMenus;