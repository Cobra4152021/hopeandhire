// This is a client-side only file
"use client"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    "en-US": {
      translation: {
        // Add your translation keys here
        welcome: "Welcome to HopeAndHire",
        // You can add more translations as needed
      },
    },
  },
  lng: "en-US",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
