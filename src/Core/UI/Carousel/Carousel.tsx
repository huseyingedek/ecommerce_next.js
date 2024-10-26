import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

const contentStyle: React.CSSProperties = {
    height: '340px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Slider: React.FC = () => (
    <Carousel autoplay>
        <div>
            <Image
                style={contentStyle}
                src="/images/slider/5.jpg"
                alt="image 5"
                width={800}
                height={340}
                className="h-full w-full object-cover"
            />
        </div>
        <div>
            <Image
                style={contentStyle}
                src="/images/slider/6.jpg"
                alt="image 6"
                width={800}
                height={340}
                className="h-full w-full object-cover"
            />
        </div>
        <div>
            <Image
                style={contentStyle}
                src="/images/slider/7.jpg"
                alt="image 1"
                width={800}
                height={340}
                className="h-full w-full object-cover"
            />
        </div>
    </Carousel>
);

export default Slider;