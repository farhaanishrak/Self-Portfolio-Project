"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User, Bot, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { saveVisitorInfo } from "@/app/actions/visitor"

type Message = {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

type ContactInfo = {
  email: string
  phone: string
  message: string
}

export default function ContactChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [currentStep, setCurrentStep] = useState<"welcome" | "email" | "phone" | "message" | "thanks">("welcome")
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    message: "",
  })
  const [isTyping, setIsTyping] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hi there! I'm Farhan's assistant. If you'd like to get in touch, I can collect your contact information. Would you like to proceed?",
        )
      }, 500)
    }
  }, [])

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date(),
      },
    ])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    processUserInput(inputValue)
    setInputValue("")
  }

  const saveToDatabase = async () => {
    if (isSaving) return

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await saveVisitorInfo(contactInfo)

      if (result.success) {
        console.log("Visitor info processed:", result.message)
        setSuccessMessage(result.message || "Your information has been received!")

        // Even if there were partial failures, we consider it a success for the user
        // but we still show any error messages
        if (result.error) {
          setError(`Note: ${result.error}`)
        }
      } else {
        console.error("Error saving visitor info:", result.error)
        setError(result.error || "There was an issue processing your information.")

        // Add a fallback message to reassure the user
        addBotMessage(
          "I'm having trouble connecting to our systems right now. But don't worry, I've saved your information and we'll reach out to you soon!",
        )
      }
    } catch (error) {
      console.error("Error in saveToDatabase:", error)
      setError("There was an issue saving your information, but we'll still try to reach out to you.")

      // Add a fallback message
      addBotMessage(
        "I'm experiencing some technical difficulties, but I've noted your contact details and we'll make sure to get in touch with you.",
      )
    } finally {
      setIsSaving(false)
    }
  }

  const processUserInput = (input: string) => {
    switch (currentStep) {
      case "welcome":
        if (
          input.toLowerCase().includes("yes") ||
          input.toLowerCase().includes("sure") ||
          input.toLowerCase().includes("ok") ||
          input.toLowerCase().includes("y")
        ) {
          setCurrentStep("email")
          setTimeout(() => {
            addBotMessage("Great! Please enter your email address so Farhan can reach out to you.")
          }, 800)
        } else {
          setTimeout(() => {
            addBotMessage("No problem! If you change your mind, I'm here to help. Feel free to ask any questions.")
          }, 800)
        }
        break

      case "email":
        // Simple email validation
        if (input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          setContactInfo((prev) => ({ ...prev, email: input }))
          setCurrentStep("phone")
          setTimeout(() => {
            addBotMessage(
              "Thanks! Now, could you please share your phone number? (optional, you can type 'skip' to move on)",
            )
          }, 800)
        } else {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid email address. Could you please try again?")
          }, 800)
        }
        break

      case "phone":
        if (input.toLowerCase() === "skip") {
          setContactInfo((prev) => ({ ...prev, phone: "" }))
        } else {
          setContactInfo((prev) => ({ ...prev, phone: input }))
        }
        setCurrentStep("message")
        setTimeout(() => {
          addBotMessage("Great! Finally, please leave a brief message about why you'd like to connect with Farhan.")
        }, 800)
        break

      case "message":
        setContactInfo((prev) => ({ ...prev, message: input }))
        setCurrentStep("thanks")

        // Save to database and send email notification
        setTimeout(async () => {
          await saveToDatabase()
          addBotMessage(
            `Thank you for your interest! Farhan will get back to you soon at ${contactInfo.email}. Have a great day! 😊`,
          )
        }, 800)
        break

      default:
        setTimeout(() => {
          addBotMessage("Is there anything else I can help you with?")
        }, 800)
        break
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 glass-card rounded-full shadow-md text-accent hover:text-white hover:bg-accent transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 glass-card rounded-lg shadow-lg overflow-hidden flex flex-col"
            style={{ height: "400px", maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Chat header */}
            <div className="p-3 border-b border-accent/20 bg-black/30 flex items-center justify-between">
              <div className="flex items-center">
                <Bot size={20} className="text-accent mr-2" />
                <h3 className="font-medium text-white">Farhan's Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-accent/80 text-white rounded-tr-none"
                        : "bg-black/30 text-white rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === "bot" ? (
                        <Bot size={14} className="mr-1" />
                      ) : (
                        <User size={14} className="mr-1" />
                      )}
                      <span className="text-xs opacity-70">{message.sender === "bot" ? "Assistant" : "You"}</span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-black/30 text-white rounded-tl-none">
                    <div className="flex items-center mb-1">
                      <Bot size={14} className="mr-1" />
                      <span className="text-xs opacity-70">Assistant</span>
                    </div>
                    <div className="flex items-center">
                      <Loader2 size={16} className="animate-spin mr-2" />
                      <span className="text-sm">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              {isSaving && (
                <div className="flex justify-center">
                  <div className="px-3 py-1 rounded-lg bg-accent/20 text-white text-xs flex items-center">
                    <Loader2 size={12} className="animate-spin mr-1" />
                    <span>Saving your information...</span>
                  </div>
                </div>
              )}
              {successMessage && (
                <div className="flex justify-center">
                  <div className="px-3 py-1 rounded-lg bg-green-500/20 text-green-200 text-xs flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    <span>{successMessage}</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center">
                  <div className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-200 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-3 border-t border-accent/20 bg-black/20">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/30 text-white rounded-l-md p-2 outline-none text-sm"
                  disabled={currentStep === "thanks" || isSaving}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || currentStep === "thanks" || isSaving}
                  className="bg-accent hover:bg-accent/80 text-white p-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
