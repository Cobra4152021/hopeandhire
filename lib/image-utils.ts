/**
 * Generates responsive image sizes based on the image type and layout
 * @param type The type of image (hero, thumbnail, avatar, etc.)
 * @returns A sizes string for the Next.js Image component
 */
export function getResponsiveSizes(
  type: 'hero' | 'thumbnail' | 'avatar' | 'logo' | 'default'
): string {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'avatar':
      return '96px';
    case 'logo':
      return '(max-width: 640px) 150px, 200px';
    default:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }
}

/**
 * Determines if an image should be loaded eagerly based on its position
 * @param priority Whether the image is high priority
 * @param aboveTheFold Whether the image is above the fold
 * @returns 'eager' or 'lazy'
 */
export function getLoadingStrategy(
  priority: boolean,
  aboveTheFold: boolean
): 'eager' | 'lazy' {
  if (priority || aboveTheFold) {
    return 'eager';
  }
  return 'lazy';
}

/**
 * Calculates the optimal quality for an image based on its importance
 * @param importance The importance of the image (high, medium, low)
 * @returns A quality value between 60 and 90
 */
export function getImageQuality(importance: 'high' | 'medium' | 'low'): number {
  switch (importance) {
    case 'high':
      return 90;
    case 'medium':
      return 80;
    case 'low':
      return 70;
    default:
      return 80;
  }
}
