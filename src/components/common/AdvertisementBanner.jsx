'use client';

import { cn } from '@/lib/cn';

function AdvertisementBanner({
  image,
  alt = 'Advertisement Banner',
  href,
  className
}) {
  const BannerContent = () => (
    <div className={cn(
      'relative w-full h-[100px] rounded-lg overflow-hidden',
      'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
      'border-2 border-gray-300',
      'hover:shadow-lg transition-shadow duration-300',
      className
    )}>
      {image ? (
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        // Placeholder design
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-gray-400 text-sm font-semibold mb-1">
              Advertisement Banner Placeholder
            </div>
            <div className="text-gray-500 text-xs">
              Image dimensions: 1200 x 100 px
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <BannerContent />
      </a>
    );
  }

  return <BannerContent />;
}

export { AdvertisementBanner };
export default AdvertisementBanner;
