import React, { useEffect, useState } from 'react';
import { Tabs, Select, Space, InputNumber, Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFetchApi } from '@/Hooks/index';
import { useDispatch } from 'react-redux';
import { addItem } from '@/Redux/slices/cartSlice';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isActive: boolean;
  stock: number;
}

const ProductsDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [getPackages, response] = useFetchApi<Product>("/api/products/" + id);
  const [selectedImage, setSelectedImage] = useState('/images/products/2.jpg');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getPackages();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      setSelectedImage(response.image);
    }
  }, [response]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (response) {
      dispatch(addItem({
        _id: response._id,
        name: response.name,
        price: response.price,
        quantity,
        image: response.image,
      }));
      console.log(`Added ${quantity} items to the cart`);
    }
  };

  return (
    <div className='mb-48 px-4 md:px-16 lg:px-28'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1 h-auto'>
          <Image src={selectedImage} alt="product" width={500} height={500} className='rounded-lg cursor-pointer max-w-lg w-full h-auto' />
          <div className='flex gap-x-4 pt-4 pb-5 overflow-x-auto'>
            <Image src={response?.image || '/images/products/2.jpg'} alt="product" width={500} height={500} className='rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 w-20 h-20' onClick={() => handleImageClick(response?.image || '/images/products/2.jpg')} />
            <Image src='/images/products/3.jpg' alt="product" width={500} height={500} className='rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 w-20 h-20' onClick={() => handleImageClick('/images/products/3.jpg')} />
            <Image src='/images/products/2.jpg' alt="product" width={500} height={500} className='rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 w-20 h-20' onClick={() => handleImageClick('/images/products/2.jpg')} />
            <Image src='/images/products/1.jpg' alt="product" width={500} height={500} className='rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 w-20 h-20' onClick={() => handleImageClick('/images/products/1.jpg')} />
          </div>
        </div>
        <div className='md:pl-5 flex-1 mr-52 w-full'>
          <h1 className='text-4xl font-bold pb-3'>{response?.name}</h1>
          <p className='text-lg pb-5 text-gray-500'>{response?.description}</p>
          <span className='text-4xl'>{response?.price}$</span>
          <div>
            <h2 className='text-2xl font-semibold mt-10'>Boyut</h2>
            <div className='flex gap-x-4 mt-4'>
              <Space wrap>
                <Select
                  defaultValue="S"
                  style={{ width: 120 }}
                  options={[
                    { value: 'S', label: 'S' },
                    { value: 'M', label: 'M' },
                    { value: 'L', label: 'L' },
                    { value: 'XL', label: 'XL' },
                  ]}
                />
              </Space>
            </div>
            <h2 className='text-2xl font-semibold mt-10'>Adet</h2>
            <div className='flex gap-x-4 mt-4'>
              <InputNumber min={1} max={response?.stock} defaultValue={1} onChange={(value) => setQuantity(value ?? 1)} />
            </div>
            <Button type="primary" className='mt-4' onClick={handleAddToCart}>
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Tabs
          type="card"
          items={[
            {
              label: 'Ürün Açıklaması',
              key: '1',
              children: (
                <>
                  <h2 className='text-2xl font-semibold'>Ürün Açıklaması</h2>
                  <p className='text-lg mt-4 text-gray-500'>{response?.description}</p>
                </>
              ),
            },
            {
              label: 'Yorumlar',
              key: '2',
              children: (
                <>
                  <h2 className='text-2xl font-semibold'>Yorumlar</h2>
                  <p className='text-lg mt-4 text-gray-500'>Burada kullanıcı yorumları yer alacak.</p>
                </>
              ),
            },
            {
              label: 'Video',
              key: '3',
              children: (
                <>
                  <h2 className='text-2xl font-semibold'>Video</h2>
                  <p className='text-lg mt-4 text-gray-500'>Burada ürünle ilgili video yer alacak.</p>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsDetails;