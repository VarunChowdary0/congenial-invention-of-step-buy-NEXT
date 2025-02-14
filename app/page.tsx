'use client'

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white space-y-6 max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight">
              Empowering Young Minds Through Technology Education
            </h1>
            <p className="text-xl opacity-90">
              Innovative, low-cost learning solutions that make technology education accessible to all children, 
              including those with visual challenges.
            </p>
            <div className="flex gap-4 pt-6">
              {!session ? (
                <Link 
                  href="/auth" 
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg
                   font-medium hover:bg-indigo-50 transition-colors"
                >
                  Join Our Mission
                </Link>
              ) : (
                <Link 
                  href="/dashboard" 
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg
                   font-medium hover:bg-indigo-50 transition-colors"
                >
                  View Resources
                </Link>
              )}
              <Link 
                href="/explore" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 
                rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                <p className="text-sm text-gray-600 ">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl text-black font-bold text-center mb-4">Our Innovative Solutions</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Bridging the gap in technology education through accessible, hands-on learning tools
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black text-center mb-4">Featured Products</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Innovative educational tools designed for inclusive learning
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Link 
                href={`/products/${product.slug}`}
                key={index}
                className="group bg-white text-black rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 text-black ">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <span className="text-indigo-600 font-medium group-hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const impactStats = [
  { value: '1M+', label: 'Students Target by 2026' },
  { value: '50K+', label: 'Visually Challenged Students' },
  { value: '100+', label: 'Partner Schools' },
  { value: '20+', label: 'Educational Products' },
];

const features = [
  {
    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    title: "Inclusive Learning",
    description: "Specially designed products for all learners, including visually challenged students."
  },
  {
    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>,
    title: "Hands-on Learning",
    description: "Interactive DIY kits that make programming accessible without a computer."
  },
  {
    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>,
    title: "Life Skills Development",
    description: "Comprehensive programs that teach both technical and essential life skills."
  }
];

const products = [
  {
    name: "ProGame Kit",
    slug: "progame-kit",
    description: "Learn programming concepts through hands-on exploration without a computer.",
    image: "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg"
  },
  {
    name: "Tactile Coding Kit",
    slug: "tactile-coding-kit",
    description: "Specially designed for visually challenged students to experience coding.",
    image: "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg"
  },
  {
    name: "Problem Solving Kit",
    slug: "problem-solving-kit",
    description: "Enhance logical thinking and problem-solving skills through interactive challenges.",
    image: "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg"
  }
];