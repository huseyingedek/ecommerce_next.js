import React, { useState } from 'react';
import { LoginOutlined, UserAddOutlined, SearchOutlined, ShoppingCartOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Navigation from './Navigation';
import { LoginForm } from '@/Core/index';
import { RegisterForm } from '@/Core/index';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { useAuth } from '@/Hooks/index';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const { logout } = useAuth();
    const { user } = useSelector((state: RootState) => state.auth);
    const cartLength = useSelector((state: RootState) => state.cart.items.length);
    const userId = user?._id;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const showLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const handleLoginModalOk = () => {
        setIsLoginModalOpen(false);
    };

    const handleLoginModalCancel = () => {
        setIsLoginModalOpen(false);
    };

    const showRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const handleRegisterModalOk = () => {
        setIsRegisterModalOpen(false);
    };

    const handleRegisterModalCancel = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <header className='fixed top-0 left-0 right-0 flex flex-col border-b bg-white min-h-[70px] tracking-wide z-50 shadow-md px-4 lg:px-24'>
            <Navigation />
            <div className='flex items-center justify-between px-4 pt-5 pb-5 w-full'>
                <div className='flex items-center'>
                    <Link href="/">
                        <Image src="/images/gedek.jpg" alt="logo" width={144} height={36} className='w-24 lg:w-36 mb-2 pt-2' />
                    </Link>
                </div>
                <div className='flex-grow mx-4 hidden md:flex'>
                    <div className='flex items-center border border-gray-300 rounded-md overflow-hidden lg:w-[40%] lg:ml-[40%]'>
                        <input
                            type="text"
                            placeholder='Arama yapın...'
                            className='py-1 px-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400'
                        />
                        <SearchOutlined className='p-2 text-gray-500 cursor-pointer hover:text-teal-400' />
                    </div>
                </div>
                <div className='flex items-center md:gap-4'>
                    {user ? (
                        <>
                            <Link href={`/profile/${userId}`} className='flex items-center text-black hover:text-teal-400 text-lg'>
                                <UserOutlined className='mr-1' /> <span className='hidden md:inline'>Profil</span>
                            </Link>
                            <span className='mx-2'>|</span>
                            <a onClick={logout} className='flex items-center text-black hover:text-teal-400 text-lg'>
                                <LoginOutlined className='mr-1' /> <span className='hidden md:inline'>Çıkış</span>
                            </a>
                        </>
                    ) : (
                        <>
                            <a onClick={showLoginModal} className='flex items-center text-black hover:text-teal-400 text-lg'>
                                <LoginOutlined className='mr-1' /> <span className='hidden md:inline'>Giriş</span>
                            </a>
                            <span className='mx-2'>|</span>
                            <a onClick={showRegisterModal} className='flex items-center text-black hover:text-teal-400 text-lg'>
                                <UserAddOutlined className='mr-1' /> <span className='hidden md:inline'>Kayıt Ol</span>
                            </a>
                        </>
                    )}
                    <span className='mx-2'>|</span>
                    <Badge count={cartLength}>
                        <Link href={`/cart`} className='flex items-center text-black hover:text-teal-400 text-lg gap-2'>
                            <ShoppingCartOutlined className='mr-1 text-lg' /><span className='hidden md:inline'>Sepet</span>
                        </Link>
                    </Badge>
                </div>
                <div className='md:hidden'>
                    <MenuOutlined className='text-gray-500 cursor-pointer' onClick={toggleMenu} />
                </div>
            </div>
            <nav className='hidden md:flex justify-center space-x-10 pb-5'>
                <div className='relative group'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>
                                <a href="#">T-shirt 1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">T-shirt 2</a>
                            </Menu.Item>
                        </Menu>
                    } trigger={['hover']}>
                        <a href="#" className='text-black hover:text-teal-400 text-lg mb-2'>
                            T-shirt <DownOutlined className='w-3'/>
                        </a>
                    </Dropdown>
                </div>
                <div className='relative group'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>
                                <a href="#">Ayakkabı 1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Ayakkabı 2</a>
                            </Menu.Item>
                        </Menu>
                    } trigger={['hover']}>
                        <a href="#" className='text-black hover:text-teal-400 text-lg mb-2'>
                            Ayakkabı <DownOutlined className='w-3'/>
                        </a>
                    </Dropdown>
                </div>
                <div className='relative group'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>
                                <a href="#">Şort 1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Şort 2</a>
                            </Menu.Item>
                        </Menu>
                    } trigger={['hover']}>
                        <a href="#" className='text-black hover:text-teal-400 text-lg mb-2'>
                            Şort <DownOutlined className='w-3'/>
                        </a>
                    </Dropdown>
                </div>
                <div className='relative group'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>
                                <a href="#">Pantolon 1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Pantolon 2</a>
                            </Menu.Item>
                        </Menu>
                    } trigger={['hover']}>
                        <a href="#" className='text-black hover:text-teal-400 text-lg mb-2'>
                            Pantolon <DownOutlined className='w-3'/>
                        </a>
                    </Dropdown>
                </div>
                <div className='relative group'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>
                                <a href="#">Çorap 1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Çorap 2</a>
                            </Menu.Item>
                        </Menu>
                    } trigger={['hover']}>
                        <a href="#" className='text-black hover:text-teal-400 text-lg mb-2'>
                            Çorap <DownOutlined className='w-3'/>
                        </a>
                    </Dropdown>
                </div>
                <div className='relative group'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>
                                <a href="#">Hizmet 1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Hizmet 2</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Hizmet 3</a>
                            </Menu.Item>
                        </Menu>
                    } trigger={['hover']}>
                        <a href="#" className='text-black hover:text-teal-400 text-lg mb-2'>
                            Hizmetler <DownOutlined className='w-3'/>
                        </a>
                    </Dropdown>
                </div>
            </nav>

            {isMenuOpen && (
                <nav className='flex flex-col md:hidden bg-white py-2 absolute top-full left-0 w-full shadow-lg transform transition-all duration-300 ease-in-out'>
                    <ul className='flex flex-col'>
                        <li className='border-b border-gray-100 last:border-none'>
                            <a href="#" className='block px-6 py-3 text-black hover:bg-teal-50 hover:text-teal-400 transition-colors duration-200'>Anasayfa</a>
                        </li>
                        <li className='border-b border-gray-100 last:border-none'>
                            <a href="#" className='block px-6 py-3 text-black hover:bg-teal-50 hover:text-teal-400 transition-colors duration-200'>Ürün Kategorileri</a>
                        </li>
                        <li className='border-b border-gray-100 last:border-none'>
                            <a href="#" className='block px-6 py-3 text-black hover:bg-teal-50 hover:text-teal-400 transition-colors duration-200'>Alt Kategoriler</a>
                        </li>
                        <li className='border-b border-gray-100 last:border-none'>
                            <a href="#" className='block px-6 py-3 text-black hover:bg-teal-50 hover:text-teal-400 transition-colors duration-200'>Hakkında</a>
                        </li>
                        <li className='border-b border-gray-100 last:border-none'>
                            <a href="#" className='block px-6 py-3 text-black hover:bg-teal-50 hover:text-teal-400 transition-colors duration-200'>İletişim</a>
                        </li>
                    </ul>
                </nav>
            )}
            <div className='flex md:hidden justify-center my-2'>
                <div className='flex items-center border border-gray-300 rounded-md overflow-hidden w-[80%]'>
                    <input
                        type="text"
                        placeholder='Arama yapın...'
                        className='py-1 px-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-600'
                    />
                    <SearchOutlined className='p-2 text-gray-500 cursor-pointer hover:text-teal-400' />
                </div>
            </div>
            <LoginForm
                isModalOpen={isLoginModalOpen}
                handleOk={handleLoginModalOk}
                handleCancel={handleLoginModalCancel}
            />
            <RegisterForm
                isModalOpen={isRegisterModalOpen}
                handleOk={handleRegisterModalOk}
                handleCancel={handleRegisterModalCancel}
            />
        </header>
    );
}

export default Header;