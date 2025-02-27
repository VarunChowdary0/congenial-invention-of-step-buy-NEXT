'use client'

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';
import RegisterPage from '@/components/RegisterPage';
import { Suspense } from 'react';
import Loader from '@/components/mini/Loader';

const AuthContent = () => {
  const {data :session} = useSession();
  const parms = useSearchParams();
  const Router = useRouter();
  
  useEffect(() => {
    if(session){
      Router.push('/');
    }
  }, [session]);

      return <RegisterPage error={parms.get('error') || ""}/>
}

const AuthPage = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <AuthContent/>
    </Suspense>
  );
};

export default AuthPage;