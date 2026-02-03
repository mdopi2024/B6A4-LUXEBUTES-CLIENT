import { Navbar1 } from '@/components/layout/navbar1';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
        </div>
    );
};

export default layout;