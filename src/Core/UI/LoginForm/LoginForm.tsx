import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import useAuth from '@/Hooks/useAuth';

interface LoginFormProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isModalOpen, handleOk, handleCancel }) => {
  const { login } = useAuth();
  const [form] = Form.useForm();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values);
      handleOk();
      form.resetFields();
    } catch (error) {
      message.error('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          label="E-Posta"
          rules={[{ required: true, message: 'E-Posta Adresinizi Girin' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Şifre"
          rules={[{ required: true, message: 'Şifrenizi Giriniz' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="flex w-full text-center items-center justify-center mt-8"
        >
          Giriş Yap
        </Button>
      </Form>
    </Modal>
  );
};

export default LoginForm;