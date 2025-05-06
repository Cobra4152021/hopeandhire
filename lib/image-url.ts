import type React from "react"
/**
 * Ensures that a URL is absolute by checking if it starts with http:// or https://
 * If not, it assumes it's a relative URL and returns it as is
 * @param url The URL to check
 * @returns The absolute URL
 */
export function ensureAbsoluteUrl(url: string): string {
  if (!url) return ""

  // If the URL already starts with http:// or https://, return it as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  // Otherwise, assume it's a relative URL and return it as is
  return url
}

/**
 * Generates a placeholder image URL
 * @param width The width of the image
 * @param height The height of the image
 * @param query The query to use for the placeholder image
 * @returns The placeholder image URL
 */
export function getPlaceholderImage(width: number, height: number, query: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(query)}`
}

/**
 * Handles image loading errors by providing a fallback image
 * @param event The error event
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
  const target = event.target as HTMLImageElement
  target.src = "/broken-image-icon.png"
  target.onerror = null // Prevent infinite error loop
}
