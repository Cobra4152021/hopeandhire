"use client"

import type React from "react"

import { useEffect } from "react"
import i18n from "@/app/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This ensures i18n is initialized on the client side
    if (!i18n.isInitialized) {
      i18n.init({
        resources: {
          "en-US": {
            translation: {
              welcome: "Welcome to HopeAndHire",
            },
          },
        },
        lng: "en-US",
        fallbackLng: "en",
        interpolation: {
          escapeValue: false,
        },
      })
    }
  }, [])

  return <>{children}</>
}
