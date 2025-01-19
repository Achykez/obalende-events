'use client';
import { useEffect, useState } from 'react';

export const useMedia = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 500);
    setIsDesktop(window.innerWidth > 1000);
    setIsTablet(window.innerWidth > 500 && window.innerWidth < 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { isMobile, isDesktop, isTablet };
};
