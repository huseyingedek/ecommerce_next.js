import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Redux/store';
import { List, Button, Empty, Typography } from 'antd';
import { removeItem, clearCart } from '@/Redux/slices/cartSlice';

const { Title } = Typography;

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className='container mx-auto p-4 mb-[84px]'>
            <h1 className='text-4xl text-teal-500 font-semibold text-center mb-8'>Sepet</h1>
            {cartItems.length === 0 ? (
                <Empty description="Sepetinizde ürün yok." />
            ) : (
                <div className='mb-2'>
                    <List
                        itemLayout="horizontal"
                        dataSource={cartItems}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button type="link" onClick={() => handleRemoveItem(item._id)}>Kaldır</Button>
                                ]}
                                className="border-b py-4"
                            >
                                <List.Item.Meta
                                    avatar={<img src={item.image} alt={item.name} width={50} />}
                                    title={item.name}
                                    description={`Fiyat: ${item.price}$ | Adet: ${item.quantity}`}
                                />
                            </List.Item>
                        )}
                    />
                    <Button type="primary" danger onClick={handleClearCart} className='mt-4 w-full'>
                        Sepeti Temizle
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Cart;
