import React, { useEffect, useState } from 'react';
import { Tabs, Button, Radio, Skeleton } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFetchApi } from '@/Hooks/index';
import { useDispatch } from 'react-redux';
import { addItem } from '@/Redux/slices/cartSlice';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  isActive: boolean;
  stock: number;
  colors: string[];
  sizes: string[];
}

const ProductSkeleton: React.FC = () => (
  <div className='flex flex-col md:flex-row gap-8'>
    <div className='flex-1 md:max-w-[500px]'>
      <Skeleton.Image className="w-full h-[500px] rounded-lg" active />
      <div className='flex gap-3 pt-4'>
        {[1, 2, 3, 4].map(i => (
          <Skeleton.Image key={i} className="w-20 h-20 rounded-lg" active />
        ))}
      </div>
    </div>
    
    <div className='flex-1 md:pl-8'>
      <Skeleton.Input className="mb-3" size="large" block active />
      <Skeleton.Input className="mb-5" size="large" block active />
      <Skeleton paragraph={{ rows: 4 }} active />
      <div className='mt-8'>
        <Skeleton.Button className="w-full md:w-auto" size="large" active />
      </div>
    </div>
  </div>
);

const ProductsDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [getPackages, response] = useFetchApi<Product>("/api/products/" + id, {
    onSuccess: () => setLoading(false),
    onError: (err: string) => {
      setLoading(false);
      setError(err);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          await getPackages();
        } catch (err) {
          setError("Ürün yüklenirken bir hata oluştu");
          console.error("Ürün yükleme hatası:", err);
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      setSelectedImage(response.images[0]);
      setSelectedSize(response.sizes[0]);
      setSelectedColor(response.colors[0]);
    }
  }, [response]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < (response?.stock || 1)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (response) {
      dispatch(addItem({
        _id: response._id,
        name: response.name,
        price: response.price,
        quantity,
        image: selectedImage || '',
        sizes: selectedSize,
        colors: selectedColor,
      }));
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Bir Hata Oluştu</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => router.reload()} type="primary">
          Tekrar Dene
        </Button>
      </div>
    );
  }

  if (loading) {
    return <ProductSkeleton />;
  }
  return (
    <div className='mb-48 px-4 md:px-8 lg:px-16 xl:px-28'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-1 md:max-w-[500px]'>
          {selectedImage && (
            <div className='relative w-full'>
              <Image
                src={selectedImage}
                alt="product"
                width={500}
                height={500}
                className='rounded-lg object-cover w-full h-auto'
                priority
              />
            </div>
          )}
          <div className='flex gap-3 pt-4 overflow-x-auto scrollbar-hide'>
            {response?.images.map((image, index) => (
              <div
                key={index}
                className='relative w-20 h-20 flex-shrink-0'
              >
                <Image
                  src={image}
                  alt="product"
                  fill
                  className={`rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 object-cover
                    ${selectedImage === image ? 'ring-2 ring-teal-500' : ''}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='flex-1 md:pl-8'>
          <h1 className='text-3xl md:text-4xl font-bold pb-3'>{response?.name}</h1>
          {/* <p className='text-base md:text-lg pb-5 text-gray-500'>{response?.description}</p> */}
          <span className='text-3xl md:text-4xl font-semibold text-teal-600'>{response?.price}₺</span>

          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Renk</h2>
            <Radio.Group
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className='flex flex-wrap gap-3'
            >
              {response?.colors.map(color => (
                <Radio.Button
                  key={color}
                  value={color}
                  className='flex items-center gap-2 p-2'
                >
                  <span
                    className='w-6 h-6 rounded-full border border-gray-300'
                  />
                  {color}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Boyut</h2>
            <Radio.Group
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              className='flex flex-wrap gap-3'
            >
              {response?.sizes.map(size => (
                <Radio.Button
                  key={size}
                  value={size}
                  className='min-w-[60px] text-center'
                >
                  {size}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Adet</h2>
            <div className='flex items-center gap-4'>
              <div className='flex items-center border rounded-md'>
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                  className='border-0'
                />
                <span className='px-4 min-w-[50px] text-center'>{quantity}</span>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= (response?.stock || 1)}
                  className='border-0'
                />
              </div>
              <span className='text-gray-500'>
                Stok: {response?.stock || 0}
              </span>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            className='mt-8 w-full md:w-auto px-8'
            onClick={handleAddToCart}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>

      <div className='mt-12'>
        <Tabs
          type="card"
          className="custom-tabs"
          items={[
            {
              label: 'Ürün Açıklaması',
              key: '1',
              children: (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className='text-2xl font-semibold text-teal-700'>Ürün Açıklaması</h2>
                  <p className='text-lg mt-4 text-gray-600'>{response?.description}</p>
                </div>
              ),
            },
            {
              label: 'Yorumlar',
              key: '2',
              children: (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className='text-2xl font-semibold text-teal-700'>Yorumlar</h2>
                  <p className='text-lg mt-4 text-gray-600'>Burada kullanıcı yorumları yer alacak.</p>
                </div>
              ),
            },
          ]}
          style={{
            '--ant-primary-color': '#0d9488',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default ProductsDetails;
