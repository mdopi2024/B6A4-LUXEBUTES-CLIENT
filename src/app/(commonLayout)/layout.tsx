import { Navbar1 } from '@/components/layout/navbar1';
import Footer from '@/components/modules/home/Footer';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
            <div className="" >
                <Footer></Footer>
            </div>
        </div>
    );
};

export default layout;