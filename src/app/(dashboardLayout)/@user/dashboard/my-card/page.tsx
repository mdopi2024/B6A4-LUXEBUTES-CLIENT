import { getAllCardItems } from '@/actions/addToCard.action';
import CardItemTable from '@/components/modules/cardItem/CardItemTable';
import { userServices } from '@/services/userServices';
import React from 'react';

export interface CartItemType {
  id: string;
  userId: string;
  mealId: string;
  createdAt: string;
  updatedAt: string;
  meal: {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: string;
    image: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      categoryName: string;
    }
  }
}


const MYCard = async() => {
    const session = await userServices.getSession()
    const {data} = await getAllCardItems(session?.user?.id)
    const mealData = data?.map((meal:CartItemType)=> meal.meal);
    console.log(mealData)
    console.log(data)
    return (
        <div>
            <CardItemTable data={data}></CardItemTable>
        </div>
    );
};

export default MYCard;
