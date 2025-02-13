'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';

const AuthPage = () => {

  const parms = useSearchParams();
  const Router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [Emessage,setEMsg] = useState<string>(parms.get('error') || '');

  const [OKmessage,setOKMsg] = useState<string>('');
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });

  const [Ok,setOk] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  useEffect(() => {
      if(registerStep === 5 &&
        formData.password === formData.confirmPassword &&
      formData.password.length >= 8 &&
      formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) &&
      formData.name.match(/^[a-zA-Z]/) &&
      formData.phone.length === 10
    ) {
      setOk(true);}
  },[registerStep,formData.password,formData.confirmPassword]);



  const renderRegisterStep = () => {
    switch(registerStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 000-0000"
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-gray-700">Email OTP Verification</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerStep < 5) {
      setRegisterStep(registerStep + 1);
    } else {
      console.log('Form submitted:', formData);
      if(Ok){
          axios.post('http://localhost:5283/api/register',{
              Name: formData.name,
              Email:formData.email,
              Phone:formData.phone,
              Password:formData.password
          })
          .then((response) => {
            console.log(response.data);
            setOKMsg("User created successfully");
            setEMsg('');
            setTimeout(()=>{
              setIsLogin(true);
            },1000)
          })
          .catch((error) => {
            console.log(error.response);
            setOKMsg('');  
            setEMsg(error.response.data.message);
          }
        );
      }
    }
  };

  const SignIn = () => {
    signIn('credentials', { 
      identifier : formData.email ,
      password: formData.password 
    })
    .then((response) => {
      console.log(response);
      Router.push('/cart');
      setOKMsg('Login Successful');
    })
    .catch((error) => {
      console.log(error);
      setEMsg(error.message);
  })
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <AnimatePresence mode="wait">
          {!isLogin ? (
            <motion.div
              key="register"
              className="space-y-6 text-[#4f4f4f]"
            >
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
                <p className="text-sm text-gray-500">Step {registerStep} of 5</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-1">
                <motion.div
                  className="bg-blue-600 h-1 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(registerStep / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <form onSubmit={handleNextStep} className="space-y-6">
                <AnimatePresence mode="wait">
                  {renderRegisterStep()}
                </AnimatePresence>

                <div className="flex justify-between">
                  {registerStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => setRegisterStep(registerStep - 1)}
                      className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    type="submit"
                    className={`ml-auto px-6 py-2 
                      ${Ok ? ' bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                      text-white rounded-lg `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {registerStep === 5 ? 'Create Account' : 'Next'}
                  </motion.button>
                </div>
              </form>
              <div className=' text-rose-500 text-center flex items-center justify-center'>
                {Emessage}
              </div>
              <div className=' text-teal-500 text-center flex items-center justify-center'>
                {OKmessage}
              </div>
            </motion.div>
          ) : 
          (
                  // Replace the existing login form block (after the ': (' line) with: 
      <motion.div
          key="login"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="space-y-6"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className=" text-[#4f4f4f] space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={SignIn}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Sign in
            </motion.button>
          </form>
          <div className=' text-rose-500 text-center flex items-center justify-center'>
            {Emessage}
          </div>
          <div className=' text-teal-500 text-center flex items-center justify-center'>
            {OKmessage}
          </div>
        </motion.div>
          )
          }
        </AnimatePresence>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setRegisterStep(1);
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;