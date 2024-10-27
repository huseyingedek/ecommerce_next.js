import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFetchApi } from '@/Hooks/index';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const BestSellers: React.FC = () => {
  const [fetchProducts, products] = useFetchApi<Product[]>("/api/products/");
  useEffect(() => {
    fetchProducts();
  }, []);

  const activeProducts = products?.filter(product => product.isActive);
  console.log(activeProducts);
  return (
    <div className='mt-5 mb-5 md:mx-16'>
      <div className='flex justify-center text-center flex-col items-center mb-4'>
        <h1 className='text-4xl text-teal-600'>En Çok Satanlar</h1>
        <p className='text-base text-teal-800'>En Popüler Ürünlerimiz</p>
      </div>
      <div className='flex justify-center flex-wrap mt-5 mb-7 gap-5'>
        {activeProducts && activeProducts.length > 0 ? (
          activeProducts.map((product: Product) => (
            <div key={product._id} className='h-72 w-40 xs:w-1/2 sm:w-1/2 md:w-1/5 lg:w-1/6 bg-white text-center transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200'>
              <Link href={`/products/${product._id}`}>
                <Image src={product.images[0]} alt="görsel yüklenemedi" width={200} height={208} className='pb-5 rounded h-52 w-full cursor-pointer' />
                <h1 className='pb-2 text-xl cursor-pointer'>{product.name}</h1>
                <span>{product.price}$</span>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default BestSellers;