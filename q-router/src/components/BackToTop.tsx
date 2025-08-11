'use client';

import { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button 
      onClick={scrollToTop} 
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="Back to top"
    >
      <UpOutlined style={{ fontSize: '20px' }} />
      <style jsx global>{`
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #5EF1FF 0%, #A855F7 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
        }
        
        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .back-to-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .back-to-top:active {
          transform: translateY(1px);
        }
      `}</style>
    </button>
  );
};

export default BackToTop;
