import { getAllMenu } from '@/actions/menu.action';
import MenuCard from '@/components/modules/menu/MenuCard';

export interface MenuType {
  id: string;
  name: string;
  description: string;
  price: string; // You can change to number if needed
  image: string;
  isAvailable: boolean;

  categoryId: string;
  category: {
    categoryName: string;
  };

  createdAt: string;
  updatedAt: string;
}

const MenuPage =async () => {
    const {data} = await getAllMenu()
    return (
        <div className='grid grid-cols-5 gap-3 mx-4'>
            {
                data?.map((menu:MenuType)=><MenuCard key={menu?.id}  menu={menu}></MenuCard>)
            }
        </div>
    );
};

export default MenuPage;