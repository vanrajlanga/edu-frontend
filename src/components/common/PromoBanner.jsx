'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

function PromoBanner({
  image,
  alt,
  href,
  className
}) {
  const content = (
    <div className={cn(
      'relative overflow-hidden rounded-lg',
      'h-[100px]',
      'aspect-[4/1]',
      'transition-all duration-200',
      href && 'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
      className
    )}>
      {image && (
        <Image
          src={image}
          alt={alt || 'Banner'}
          fill
          className="object-cover"
          unoptimized
        />
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export { PromoBanner };
export default PromoBanner;
