'use client';

import Image from 'next/image';
import { cn } from '@/lib/cn';

export default function CourseLevelCard({ level }) {
  const {
    id,
    title,
    subtitle,
    image,
    placeholderGradient,
    categories,
  } = level;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Card Image with Overlay */}
      <div className="relative h-56 overflow-hidden">
        {/* Background Image or Gradient */}
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className={cn('absolute inset-0', placeholderGradient)} />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Text Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Category Badges */}
      <div className="p-4 bg-white">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <span
              key={index}
              className="inline-flex items-baseline gap-1.5 px-2.5 py-1 bg-white hover:bg-blue-50 border border-gray-300 hover:border-blue-500 rounded-full text-xs transition-all duration-200 cursor-pointer group"
            >
              <span className="font-bold text-blue-600 group-hover:text-blue-700">
                {category.count}
              </span>
              <span className="text-gray-600 group-hover:text-gray-900 font-medium">
                {category.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
