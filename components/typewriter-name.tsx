"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Translations of "Farhan Ishrak" in different languages
const translations = [
  { language: "English", text: "Farhan Ishrak" },
  { language: "Bengali", text: "ফারহান ইশরাক" },
  { language: "Arabic", text: "فرحان إشراق" },
  { language: "Japanese", text: "ファルハン・イシュラク" },
  { language: "Hindi", text: "फरहान इशराक" },
  { language: "Russian", text: "Фархан Ишрак" },
]

export default function TypewriterName() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const current = translations[currentIndex]

    if (isDeleting) {
      // Deleting text
      if (displayText.length === 0) {
        setIsDeleting(false)
        // Move to next language, cycling back to the first when we reach the end
        setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length)
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50) // Faster deletion
      }
    } else {
      // Typing text
      if (displayText.length < current.text.length) {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayText(current.text.slice(0, displayText.length + 1))
        }, 100) // Slower typing
      } else {
        // Finished typing this language
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 3000) // Pause for 3 seconds before deleting
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting])

  return (
    <motion.span className="text-accent inline-block" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
        className="inline-block ml-1 w-1 h-[0.9em] bg-accent"
      ></motion.span>
    </motion.span>
  )
}
