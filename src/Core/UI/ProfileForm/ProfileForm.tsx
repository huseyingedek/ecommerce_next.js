import React, { useEffect, useState } from 'react';
import { Form, Input, Spin, Button, message, List } from 'antd';
import { useFetchApi, useApi } from '@/Hooks/index';
import { getCookie } from "cookies-next";

interface ProfileFormProps {
    formType: 'profile' | 'address' | 'orders';
    id: string | string[] | undefined;
}

interface Profile {
    _id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
}

interface Order {
    _id: string;
    product: string;
    quantity: number;
    price: number;
    date: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formType, id }) => {
    const token = getCookie("token");
    const [getProfile, response, loading] = useFetchApi<Profile>(`/api/users/${id}`);
    const { apiRequest, loading: updating, error, data } = useApi();
    const [profile, setProfile] = useState<Profile>({});
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (id) {
            console.log("Fetching profile with token:", token);
            getProfile(undefined, { Authorization: `Bearer ${token}` });
        }
    }, [id, token]);

    useEffect(() => {
        if (response) {
            setProfile(response);
        }
    }, [response]);

    useEffect(() => {
        if (formType === 'orders' && id) {
            fetchOrders();
        }
    }, [formType, id]);

    const fetchOrders = async () => {
        const result = await apiRequest("GET", `/api/orders/${id}`, undefined, {
            Authorization: `Bearer ${token}`,
        });

        if (result.error) {
            message.error(result.error);
        } else {
            setOrders(result.data);
        }
    };

    const handleUpdateProfile = async () => {
        if (profile) {
            const { _id, ...profileData } = profile;

            const result = await apiRequest("PUT", `/api/users/${_id}`, profileData, {
                Authorization: `Bearer ${token}`,
            });

            if (result.error) {
                message.error(result.error);
            } else {
                message.success('Profil güncellendi!');
                setProfile(result.data);
            }
        } else {
            message.error('Profil bilgileri yüklenmedi.');
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='space-y-4 w-full max-w-md'>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <Form layout="vertical" initialValues={profile} key={profile._id}>
                        {formType === 'profile' && (
                            <>
                                <Form.Item label="Ad" name="name">
                                    <Input 
                                        value={profile.name || ''} 
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                                    />
                                </Form.Item>
                                <Form.Item label="Soyad" name="lastName">
                                    <Input 
                                        value={profile.lastName || ''} 
                                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} 
                                    />
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input 
                                        type="email" 
                                        value={profile.email || ''} 
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                                    />
                                </Form.Item>
                                <Form.Item label="Phone" name="phone">
                                    <Input 
                                        value={profile.phone || ''} 
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })} 
                                    />
                                </Form.Item>
                            </>
                        )}
                        {formType === 'address' && (
                            <Form.Item label="Açık Adres" name="address">
                                <Input.TextArea 
                                    value={profile.address || ''} 
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })} 
                                    rows={4}
                                />
                            </Form.Item>
                        )}
                        {formType === 'orders' && (
                            <List
                                itemLayout="horizontal"
                                dataSource={orders}
                                renderItem={order => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={`Ürün: ${order.product}`}
                                            description={`Miktar: ${order.quantity} | Fiyat: ${order.price} | Tarih: ${order.date}`}
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                        {formType !== 'orders' && (
                            <Form.Item>
                                <Button type="primary" onClick={handleUpdateProfile} loading={updating}>
                                    Güncelle
                                </Button>
                            </Form.Item>
                        )}
                    </Form>
                )}
                {/* Siparişler formu buraya eklenecek */}
            </div>
        </div>
    );
};

export default ProfileForm;