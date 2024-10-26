import React, { useState } from 'react';
import { Button, Form, Input, Modal, message, Spin } from "antd";
import useAuth from "@/Hooks/useAuth";

const INITIAL_FORMDATA = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
};

interface RegisterFormProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isModalOpen, handleOk, handleCancel }) => {
    const { register } = useAuth();
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<typeof INITIAL_FORMDATA>(INITIAL_FORMDATA);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            await register(formData);
            handleOk();
            form.resetFields();
        } catch (error) {
            message.error('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form
                name="basic"
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                fields={Object.entries(formData).map(([name, value]) => ({
                    name,
                    value,
                }))}
                autoComplete="off"
                scrollToFirstError
                onValuesChange={(changedValues, allValues) => {
                    setFormData(allValues);
                }}
                onFinishFailed={() => console.log("failed")}
            >
                <Form.Item
                    name="email"
                    label="E-Posta"
                    rules={[{ required: true, message: "E-Posta Adresinizi Girin" }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Şifre"
                    rules={[{ required: true, message: "Şifrenizi Giriniz" }]}
                >
                    <Input.Password size="large" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Şifreyi Onaylayın"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: "Şifrenizi Onaylayın" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Ad"
                    rules={[{ required: true, message: "Adınızı Girin" }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Soyad"
                    rules={[{ required: true, message: "Soyadınızı Girin" }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Telefon Numarası"
                    rules={[{ required: true, message: "Telefon Numaranızı Girin" }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="flex w-full text-center items-center justify-center mt-8"
                    loading={loading}
                >
                    Kayıt Ol
                </Button>
            </Form>
        </Modal>
    );
}

export default RegisterForm;