import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useSession } from 'next-auth/react'

const footerLinks = {

  aboutUs: [
    { title: 'About Us', href: '/about' },
    { title: 'Careers', href: '/careers' },
    { title: 'Press Releases', href: '/press' },
    { title: 'Corporate Information', href: '/corporate' }
  ],
  help: [
    { title: 'Payments', href: '/help/payments' },
    { title: 'Shipping', href: '/help/shipping' },
    { title: 'Returns', href: '/help/returns' },
    { title: 'FAQ', href: '/help/faq' }
  ],
  policy: [
    { title: 'Return Policy', href: '/policy/return' },
    { title: 'Terms of Use', href: '/policy/terms' },
    { title: 'Security', href: '/policy/security' },
    { title: 'Privacy', href: '/policy/privacy' }
  ],
  social: [
    { title: 'Facebook', href: '#', icon: <Facebook className="w-5 h-5" /> },
    { title: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> },
    { title: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
    { title: 'YouTube', href: '#', icon: <Youtube className="w-5 h-5" /> }
  ]
}

const Footer = () => {
    const {data} = useSession();
  return (
    <footer className="bg-[#232F3E] h-fit w-full text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-between gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.title}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.title}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policy</h3>
            <ul className="space-y-2">
              {footerLinks.policy.map((link) => (
                <li key={link.title}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <div className="flex space-x-4 mb-6">
              {footerLinks.social.map((social) => (
                <Link 
                  key={social.title}
                  href={social.href}
                  className="text-gray-300 hover:text-white"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                {/* <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-black rounded-l-md w-full"
                /> */}
                {
                    data?.user ?
                   <>
                   <p>User : </p>
                    <p className=' ml-2 hover:underline hover:cursor-pointer text-muted'>{data.user.email}</p>
                   </>
                     :
                <Link href={"/auth"} className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400">
                  Sign Up
                </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} Step Buy. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link 
                href="#"
                className="text-sm text-gray-300 hover:text-white"
              >
                Conditions of Use
              </Link>
              <Link 
                href="#"
                className="text-sm text-gray-300 hover:text-white"
              >
                Privacy Notice
              </Link>
              <Link 
                href="#"
                className="text-sm text-gray-300 hover:text-white"
              >
                Interest-Based Ads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer