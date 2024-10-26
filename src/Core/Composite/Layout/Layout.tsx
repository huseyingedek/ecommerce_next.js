import React from 'react'
import { Layout } from "antd";
import { Header, Footer } from "@/Core/index";

export type LayoutProps = {
    children: React.ReactNode;
};

const LayoutPage: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Layout>
                <div className='mb-48'>
                <Header />
                </div>
                <div>
                    {children}
                </div>
                <Footer />
            </Layout>
        </div>
    )
}

export default LayoutPage;