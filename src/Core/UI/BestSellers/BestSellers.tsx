import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFetchApi } from '@/Hooks/index';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  color: string;
  size: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const BestSellers: React.FC = () => {
  const [fetchProducts, products] = useFetchApi<Product[]>("/api/products/");
  const [clickedProductId, setClickedProductId] = useState<string | null>(null);
  const router = useRouter();

  const activeProducts = products?.filter(product => product.isActive);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    setClickedProductId(productId);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">En Çok Satanlar</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto mb-3"></div>
        <p className="text-base md:text-lg text-teal-800">En Popüler Ürünlerimiz</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 xl:gap-8">
        {activeProducts && activeProducts.length > 0 ? (
          activeProducts.map((product: Product) => (
            <Link 
              href={`/products/${product._id}`} 
              key={product._id}
            >
              <div
                className={`relative block bg-white rounded-lg overflow-hidden
                  shadow-sm hover:shadow-xl hover:-translate-y-1 
                  active:translate-y-0 active:shadow-md 
                  transition-all duration-300 h-full max-w-[220px] 
                  mx-auto w-full
                  ${clickedProductId === product._id ? 'opacity-50' : 'opacity-100'}`}
                onClick={() => handleProductClick(product._id)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                    priority={activeProducts.indexOf(product) < 5}
                  />
                </div>
                <div className="p-2 sm:p-3">
                  <h2 className="text-sm sm:text-base font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-1 hover:text-teal-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-base sm:text-lg font-bold text-teal-600">
                    {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}₺
                  </p>
                </div>
              </div>

              {clickedProductId === product._id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Ürün bulunamadı
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
