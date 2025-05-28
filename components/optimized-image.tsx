'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  sizes,
  className,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Default sizes if not provided
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
      <Image
        src={imgSrc || '/placeholder.svg'}
        alt={alt}
        sizes={defaultSizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}

// Export both as default and named export
export default OptimizedImage;
export { OptimizedImage };
