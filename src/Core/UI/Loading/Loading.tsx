import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-teal-600">
                <div className="loader" />
                <span className="ml-2">Yükleniyor...</span>
            </div>

            <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #4ade80; /* Teal rengi */
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loading;
