import { getAllMenu } from '@/actions/menu.action';
import MenuTable from '@/components/modules/menu/MenuTable';
import React from 'react';

const ManageManu =async () => {
    const {data}= await getAllMenu()
    
    return (
        <div>
            <MenuTable data={data}></MenuTable>
        </div>
    );
};

export default ManageManu;
