/**
 * Converts a relative image path to an absolute URL
 * @param path The relative path to the image
 * @returns The absolute URL to the image
 */
export function getAbsoluteImageUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Base URL from environment variable or default to the production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hopeandhire.net"

  // Combine the base URL with the clean path
  return `${baseUrl}/${cleanPath}`
}

/**
 * Checks if a URL is already absolute
 * @param url The URL to check
 * @returns True if the URL is absolute, false otherwise
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(url)
}

/**
 * Ensures a URL is absolute, converting it if necessary
 * @param url The URL to ensure is absolute
 * @returns An absolute URL
 */
export function ensureAbsoluteUrl(url: string): string {
  if (isAbsoluteUrl(url)) {
    return url
  }
  return getAbsoluteImageUrl(url)
}
