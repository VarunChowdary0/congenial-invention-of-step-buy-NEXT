'use client'

import { server_url } from '@/components/Constant'
import ContainerLoader from '@/components/mini/ContainerLoader'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { set } from 'lodash'

const CredentialsPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<string>("");
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

useEffect(()=>{
  setTimeout(()=>{
    setErrors("");
  },1500)
},[errors])
  const validateStep = () => {
    let isValid = true

    switch (step) {
      case 1:
        if (!formData.currentPassword) {
          setErrors('Current password is required');
          isValid = false
        }
        break
      case 2:
        if (formData.newPassword.length < 6) {
          setErrors('Password must be at least 6 characters');
          isValid = false
        }
        break
      case 3:
        if (formData.newPassword !== formData.confirmPassword) {
          setErrors('Passwords do not match');
          isValid = false
        }
        break
    }

    return isValid
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      console.log("User not there")
      return
    }
    setLoading(true)
    axios.put(`${server_url}/api/update/password`,{
      username: session.user.email,
      password: formData.currentPassword,
      newPassword: formData.confirmPassword
    })
    .then((res)=>{ 
      setErrors("Password Updated Successfully");
      setTimeout(()=>{
        router.push("/profile");
      },1500)
    })
    .catch((err)=>{ 
      console.log(err);
      setErrors(err.response.data.message);
    })
    .finally(()=>{ setLoading(false); })
  }

  if (!session) return null

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Enter Current Password</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? 
                  <EyeOff className="w-5 h-5 text-gray-400" /> : 
                  <Eye className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Enter New Password</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? 
                  <EyeOff className="w-5 h-5 text-gray-400" /> : 
                  <Eye className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Confirm New Password</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? 
                  <EyeOff className="w-5 h-5 text-gray-400" /> : 
                  <Eye className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-md mx-auto px-4">
        <div className=" relative bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>
          
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
            </div>

          {renderStep()}
          {
            errors === "Password Updated Successfully" ?
            <p className="text-green-500 text-sm mt-1 absolute bottom-13">{errors}</p>
            :
            <p className="text-red-500 text-sm mt-1 absolute bottom-13">{errors}</p>
          }
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? <ContainerLoader /> : step === 3 ? 'Update Password' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CredentialsPage