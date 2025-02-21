'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BannerProps {
  images: string[]
  autoPlayInterval?: number
}

const Banner = ({ images, autoPlayInterval = 5000 }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right')
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [images.length, autoPlayInterval])

  const goToNext = () => {
    setDirection('right')
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setDirection('left')
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left')
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-full group overflow-hidden">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute w-full h-full transition-transform duration-500 ease-out",
            {
              'translate-x-0': index === currentIndex,
              'translate-x-full': direction === 'left' 
                ? index < currentIndex 
                : index > currentIndex,
              '-translate-x-full': direction === 'right' 
                ? index < currentIndex 
                : index > currentIndex,
            }
          )}
        >
          <Image
            src={image}
            alt={`Banner ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/30 p-2 
                   rounded-full text-white opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 z-10 hover:bg-black/50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/30 p-2 
                   rounded-full text-white opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 z-10 hover:bg-black/50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner