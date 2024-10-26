import React from 'react'
import { StoreSection, Carousel } from '@/Core/index';
import BestSellers from '@/Core/UI/BestSellers';
const HomePage = () => {
    return (
        <div>
            <StoreSection />
            <Carousel />
            <BestSellers />
        </div>
    )
}

export default HomePage;