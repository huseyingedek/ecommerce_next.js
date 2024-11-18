import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFetchApi } from '@/Hooks/index';

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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await router.prefetch(`/products/${product._id}`);
    router.push(`/products/${product._id}`);
  };

  return (
    <Link 
      href={`/products/${product._id}`} 
      onClick={handleClick}
      className={`relative block bg-white rounded-lg overflow-hidden
        shadow-sm hover:shadow-xl hover:-translate-y-1 
        active:translate-y-0 active:shadow-md 
        transition-all duration-300 h-full max-w-[220px] 
        mx-auto w-full ${isLoading ? 'opacity-70' : ''}`}
    >
      <div className="aspect-square relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover rounded-t-lg"
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
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      )}
    </Link>
  );
};

const BestSellers: React.FC = () => {
  const router = useRouter();
  const [fetchProducts, products] = useFetchApi<Product[]>("/api/products/", {
    onError: (error) => console.error('Failed to fetch products:', error)
  });

  const activeProducts = useMemo(() => 
    products?.filter(product => product.isActive) ?? [],
    [products]
  );

  useEffect(() => {
    fetchProducts();
    
    // Ön belleğe alma
    if (activeProducts.length > 0) {
      activeProducts.forEach(product => {
        router.prefetch(`/products/${product._id}`);
      });
    }
  }, [activeProducts.length]);

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">En Çok Satanlar</h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto mb-3"></div>
        <p className="text-base md:text-lg text-teal-800">En Popüler Ürünlerimiz</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 xl:gap-8">
        {activeProducts.length > 0 ? (
          activeProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
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