"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, X } from "lucide-react"

const colors = [
  { name: "Orange", value: "#FF7A00" }, // Changed to orange and moved to first position
  { name: "Blue", value: "#4c4cff" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
]

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [accentColor, setAccentColor] = useState(colors[0].value)

  const handleColorChange = (color: string) => {
    setAccentColor(color)
    document.documentElement.style.setProperty("--color-accent", color)
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --color-accent: ${accentColor};
        }
        .text-accent {
          color: var(--color-accent);
        }
        .bg-accent {
          background-color: var(--color-accent);
        }
        .border-accent {
          border-color: var(--color-accent);
        }
        .hover\\:bg-accent:hover {
          background-color: var(--color-accent);
        }
        .hover\\:text-accent:hover {
          color: var(--color-accent);
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="p-3 glass-card rounded-full shadow-md text-accent hover:text-white hover:bg-accent transition-colors"
        >
          <Palette size={24} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-16 right-0 glass-card p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-white">Customize Theme</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-200">
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.value)}
                    className="w-8 h-8 rounded-full relative"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {accentColor === color.value && (
                      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

// Update the AboutCard component to make it smaller with less padding
function AboutCard({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      className="glass-card p-4 rounded-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(var(--color-accent-rgb), 0.3)",
      }}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-xl font-semibold ml-2 text-white">{title}</h3>
      </div>

      {children}
    </motion.div>
  )
}
