import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const StoreSection = () => {
    const stores = [
        { name: 'Mağaza 1', imgSrc: '/images/magza/1.png' },
        { name: 'Mağaza 2', imgSrc: '/images/magza/2.png' },
        { name: 'Mağaza 3', imgSrc: '/images/magza/3.png' },
        { name: 'Mağaza 4', imgSrc: '/images/magza/4.png' },
        { name: 'Mağaza 5', imgSrc: '/images/magza/5.png' },
        { name: 'Mağaza 6', imgSrc: '/images/magza/6.png' },
        { name: 'Mağaza 7', imgSrc: '/images/magza/7.png' },
        // { name: 'Mağaza 8', imgSrc: '/images/products/6.png' },
        // { name: 'Mağaza 9', imgSrc: '/images/products/6.png' },
        // { name: 'Mağaza 10', imgSrc: '/images/products/6.png' },
        // { name: 'Mağaza 11', imgSrc: '/images/products/6.png' },
    ];

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='slider-container px-7 md:px-40'>
            <Slider {...settings}>
                {stores.map((store, index) => (
                    <div key={index} className='flex flex-col justify-center pb-3'>
                        <Image
                            src={store.imgSrc}
                            alt={store.name}
                            width={96}
                            height={96}
                            className='rounded-full w-16 h-16 md:w-24 md:h-24 border-2 border-red-600 cursor-pointer'
                        />
                        <span className='mt-1 text-sm md:text-base'>{store.name}</span>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default StoreSection;
