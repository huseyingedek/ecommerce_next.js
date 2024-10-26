import React from 'react';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 text-center text-surface/75 dark:bg-teal-700 text-white lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        <div className="me-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a href="#!" className="me-6">
            <FacebookOutlined className="h-4 w-4" />
          </a>
          <a href="#!" className="me-6">
            <TwitterOutlined className="h-4 w-4" />
          </a>
          <a href="#!" className="me-6">
            <InstagramOutlined className="h-4 w-4" />
          </a>
          <a href="#!" className="me-6">
            <LinkedinOutlined className="h-4 w-4" />
          </a>
          <a href="#!">
            <GithubOutlined className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Diğer içerikler */}
        </div>
      </div>

      <div className="bg-black/5 p-6 text-center">
        <span>© 2023 Copyright:</span>
        <a className="font-semibold" href="https://tw-elements.com/">TW Elements</a>
      </div>
    </footer>
  );
};

export default Footer;
