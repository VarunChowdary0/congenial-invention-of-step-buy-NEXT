'use client'

import ContainerLoader from '@/components/mini/ContainerLoader';
import React from 'react';

const AuthPage:React.FC = () => {
  window.location.href = "/api/auth";
  return (
    <div className=' h-full w-full'>
      <ContainerLoader/>
    </div>
  );
};

export default AuthPage;