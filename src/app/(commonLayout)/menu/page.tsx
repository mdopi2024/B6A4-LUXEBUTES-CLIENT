// app/(commonLayout)/menu/page.tsx

import { getAllMenu } from '@/actions/menu.action';
import MenuCard from '@/components/modules/menu/MenuCard';
import MenuSearch from '@/components/modules/menu/MenuSearch';
import MenuPagination from '@/components/modules/menu/MenuPagination';

export interface MenuType {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isAvailable: boolean;
  categoryId: string;
  category: {
    categoryName: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface MenuPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const { search, page, sortBy, sortOrder } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, meta } = await getAllMenu({
    searchTerm: search,
    page: currentPage,
    limit: 10,
    sortBy,
    sortOrder,
  });

  console.log(meta)
  return (
    <div>
      <div className="flex justify-center">
        <MenuSearch />
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mx-4 mt-6 mb-12">
        {data?.map((menu: MenuType) => (
          <MenuCard key={menu?.id} menu={menu} />
        ))}
      </div>

      {data?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No menu items found.</p>
      )}

     <div className='mb-12'>
         <MenuPagination totalPage={meta?.totalPages || 1} />
     </div>
    </div>
  );
};

export default MenuPage;