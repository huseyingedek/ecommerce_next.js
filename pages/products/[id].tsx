import React, { useEffect, useState } from 'react';
import { Tabs, Select, Space, Button, Radio } from 'antd';
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
}

const ProductsDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [getPackages, response] = useFetchApi<Product>("/api/products/" + id);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const dispatch = useDispatch();

  const colors = [
    { value: 'black', label: 'Siyah', color: '#000000' },
    { value: 'white', label: 'Beyaz', color: '#FFFFFF' },
    { value: 'red', label: 'Kırmızı', color: '#FF0000' },
    { value: 'blue', label: 'Mavi', color: '#0000FF' },
    { value: 'green', label: 'Yeşil', color: '#008000' },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    if (id) {
      getPackages();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      setSelectedImage(response.images[0]);
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
        size: selectedSize,
        color: selectedColor,
      }));
      console.log(`Added ${quantity} items to the cart`);
    }
  };

  return (
    <div className='mb-48 px-4 md:px-8 lg:px-16 xl:px-28'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Sol Taraf - Ürün Görselleri */}
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
                    ${selectedImage === image ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf - Ürün Detayları */}
        <div className='flex-1 md:pl-8'>
          <h1 className='text-3xl md:text-4xl font-bold pb-3'>{response?.name}</h1>
          <p className='text-base md:text-lg pb-5 text-gray-500'>{response?.description}</p>
          <span className='text-3xl md:text-4xl font-semibold'>{response?.price}₺</span>

          {/* Renk Seçimi */}
          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Renk</h2>
            <Radio.Group 
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className='flex flex-wrap gap-3'
            >
              {colors.map(color => (
                <Radio.Button 
                  key={color.value} 
                  value={color.value}
                  className='flex items-center gap-2 p-2'
                >
                  <span 
                    className='w-6 h-6 rounded-full border border-gray-300' 
                    style={{ backgroundColor: color.color }}
                  />
                  <span>{color.label}</span>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          {/* Boyut Seçimi */}
          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Boyut</h2>
            <Radio.Group 
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              className='flex flex-wrap gap-3'
            >
              {sizes.map(size => (
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

          {/* Adet Seçimi */}
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

          {/* Sepete Ekle Butonu */}
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

      {/* Tabs Bölümü */}
      <div className='mt-12'>
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