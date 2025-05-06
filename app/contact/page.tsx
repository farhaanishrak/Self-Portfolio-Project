"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { saveVisitorInfo } from "@/app/actions/visitor"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 bg-background-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">Get In Touch</h2>

        <div className="glass-card p-6 rounded-xl shadow-sm">
          <p className="text-lg text-gray-300 mb-8 text-center">
            I'm always open to new opportunities — feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="glass-card p-4 rounded-xl relative h-full">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Mail className="mr-2 text-accent" />
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex flex-wrap justify-center gap-4">
                    <ContactButton
                      icon={<Mail />}
                      text="farhanishrak12528@gmail.com"
                      href="mailto:farhanishrak12528@gmail.com"
                    />
                    <ContactButton icon={<Github />} text="GitHub" href="https://github.com/farhaanishrak" />
                    <ContactButton icon={<Linkedin />} text="LinkedIn" href="https://linkedin.com/in/farhaanishrak" />
                  </div>

                  <div className="mt-8 text-center text-gray-400 text-sm">
                    <p>Thank you for visiting my portfolio!</p>
                    <p className="mt-2">I'll get back to you as soon as possible.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ContactButton({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode
  text: string
  href: string
}) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-accent hover:text-white rounded-full transition-colors"
    >
      {icon}
      <span>{text}</span>
    </motion.a>
  )
}

function ContactForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; warning?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      // Validate the form
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Please enter a valid email address")
      }

      try {
        const response = await saveVisitorInfo({
          full_name: fullName,
          email,
          phone,
          message,
        })

        if (response.success) {
          // Create a success result, but include any warnings
          const resultObj = {
            success: true,
            message: response.message || "Thank you! Your message has been sent successfully.",
          }

          // If there was an error message despite success, add it as a warning
          if (response.error) {
            resultObj.warning = response.error
          }

          setResult(resultObj)

          // Reset form
          setFullName("")
          setEmail("")
          setPhone("")
          setMessage("")
        } else {
          setResult({
            success: false,
            message: `Error: ${response.error || "Something went wrong"}`,
          })
        }
      } catch (serverError) {
        console.error("Server action error:", serverError)
        setResult({
          success: false,
          message: `Server error: ${serverError instanceof Error ? serverError.message : "Failed to process your request"}`,
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Something went wrong"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-card p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Mail className="mr-2 text-accent" />
        Contact Form
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-3 py-2 bg-black/30 border border-accent/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-black/30 border border-accent/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 bg-black/30 border border-accent/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-black/30 border border-accent/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="How can I help you?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/80 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 p-3 rounded-md ${
            result.success ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
          } flex items-start`}
        >
          {result.success ? (
            <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      {/* Show warning if there is one */}
      {result?.warning && (
        <div className="mt-2 p-3 rounded-md bg-yellow-500/20 text-yellow-200 flex items-start">
          <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
          <span>Note: {result.warning}</span>
        </div>
      )}
    </div>
  )
}
