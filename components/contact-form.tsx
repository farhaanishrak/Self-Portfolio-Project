"use client"

import type React from "react"

import { useState } from "react"
import { saveVisitorInfo } from "@/app/actions/visitor"
import { Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
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
      // First, validate the form
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Please enter a valid email address")
      }

      const response = await saveVisitorInfo({
        email,
        phone,
        message,
      })

      if (response.success) {
        // Create a success result, but include any warnings
        const resultObj = {
          success: true,
          message: response.message || "Thank you! Your information has been submitted successfully.",
        }

        // If there was an error message despite success, add it as a warning
        if (response.error) {
          resultObj.warning = response.error
        }

        setResult(resultObj)

        // Reset form
        setEmail("")
        setPhone("")
        setMessage("")
      } else {
        setResult({
          success: false,
          message: `Error: ${response.error || "Something went wrong"}`,
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
    <div className="glass-card p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Mail className="mr-2 text-accent" />
        Contact Form
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
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
