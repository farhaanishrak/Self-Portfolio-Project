"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X, ChevronDown, ChevronUp, Wifi, WifiOff, Mail, Database } from "lucide-react"

export default function DebugInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline">("online")
  const [latency, setLatency] = useState<number | null>(null)
  const [supabaseStatus, setSupabaseStatus] = useState<"ok" | "error" | "checking">("checking")
  const [emailStatus, setEmailStatus] = useState<"ok" | "error" | "checking" | "unknown">("checking")
  const [envVars, setEnvVars] = useState<{
    supabaseUrl: string | null
    supabaseKey: boolean
    emailUser: boolean
    emailPass: boolean
  }>({
    supabaseUrl: null,
    supabaseKey: false,
    emailUser: false,
    emailPass: false,
  })

  // Check network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus("online")
    const handleOffline = () => setNetworkStatus("offline")

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setNetworkStatus(navigator.onLine ? "online" : "offline")

    // Check latency
    const checkLatency = async () => {
      try {
        const start = Date.now()
        await fetch("https://www.google.com/favicon.ico", { mode: "no-cors", cache: "no-store" })
        const end = Date.now()
        setLatency(end - start)
      } catch (error) {
        console.error("Latency check failed:", error)
        setLatency(null)
      }
    }

    checkLatency()
    const intervalId = setInterval(checkLatency, 30000) // Check every 30 seconds

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(intervalId)
    }
  }, [])

  // Check environment variables
  useEffect(() => {
    // Check Supabase URL and key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check email credentials
    const hasEmailUser = !!process.env.EMAIL_USER
    const hasEmailPass = !!process.env.EMAIL_PASSWORD

    setEnvVars({
      supabaseUrl: supabaseUrl || null,
      supabaseKey: supabaseKey,
      emailUser: hasEmailUser,
      emailPass: hasEmailPass,
    })

    // Determine email status
    if (hasEmailUser && hasEmailPass) {
      setEmailStatus("ok")
    } else if (hasEmailUser || hasEmailPass) {
      setEmailStatus("error") // Missing one of the credentials
    } else {
      setEmailStatus("unknown") // Both missing
    }

    // Determine Supabase status
    if (supabaseUrl && supabaseKey) {
      // Check if URL is valid
      try {
        new URL(supabaseUrl)
        if (supabaseUrl.includes("supabase.co")) {
          setSupabaseStatus("ok")
        } else {
          setSupabaseStatus("error")
        }
      } catch (e) {
        setSupabaseStatus("error")
      }
    } else {
      setSupabaseStatus("error")
    }
  }, [])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-black/70 text-white rounded-full shadow-lg hover:bg-black/90 transition-colors"
        aria-label="Show debug info"
      >
        <AlertCircle size={20} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <div className="bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium flex items-center">
            <AlertCircle size={16} className="mr-2 text-yellow-400" />
            Debug Information
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-700 rounded"
              aria-label={isExpanded ? "Collapse debug info" : "Expand debug info"}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-700 rounded"
              aria-label="Close debug info"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          {/* Network Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {networkStatus === "online" ? (
                <Wifi size={16} className="mr-2 text-green-400" />
              ) : (
                <WifiOff size={16} className="mr-2 text-red-400" />
              )}
              <span>Network Status:</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded ${
                networkStatus === "online" ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
              }`}
            >
              {networkStatus.toUpperCase()}
              {latency !== null && networkStatus === "online" && ` (${latency}ms)`}
            </span>
          </div>

          {/* Supabase Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database size={16} className="mr-2 text-blue-400" />
              <span>Supabase:</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded ${
                supabaseStatus === "ok"
                  ? "bg-green-900/50 text-green-300"
                  : supabaseStatus === "checking"
                    ? "bg-yellow-900/50 text-yellow-300"
                    : "bg-red-900/50 text-red-300"
              }`}
            >
              {supabaseStatus === "ok" ? "CONNECTED" : supabaseStatus === "checking" ? "CHECKING..." : "ERROR"}
            </span>
          </div>

          {/* Email Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-purple-400" />
              <span>Email Service:</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded ${
                emailStatus === "ok"
                  ? "bg-green-900/50 text-green-300"
                  : emailStatus === "checking"
                    ? "bg-yellow-900/50 text-yellow-300"
                    : emailStatus === "unknown"
                      ? "bg-gray-900/50 text-gray-300"
                      : "bg-red-900/50 text-red-300"
              }`}
            >
              {emailStatus === "ok"
                ? "CONFIGURED"
                : emailStatus === "checking"
                  ? "CHECKING..."
                  : emailStatus === "unknown"
                    ? "NOT CONFIGURED"
                    : "MISCONFIGURED"}
            </span>
          </div>

          {/* Expanded details */}
          {isExpanded && (
            <div className="mt-4 space-y-4 border-t border-gray-700 pt-3">
              {/* Supabase details */}
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Database size={14} className="mr-1" /> Supabase Configuration
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                    <span
                      className={`${
                        envVars.supabaseUrl ? "text-green-400" : "text-red-400"
                      } font-mono max-w-[200px] truncate`}
                    >
                      {envVars.supabaseUrl || "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                    <span className={`${envVars.supabaseKey ? "text-green-400" : "text-red-400"} font-mono`}>
                      {envVars.supabaseKey ? "Set" : "Not set"}
                    </span>
                  </div>
                </div>
                {supabaseStatus === "error" && (
                  <div className="mt-2 text-xs bg-red-900/30 p-2 rounded border border-red-900">
                    <p className="font-medium text-red-400">Troubleshooting:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Check that your Supabase URL is correct and includes "supabase.co"</li>
                      <li>Verify your anon key is correctly copied from the Supabase dashboard</li>
                      <li>Make sure your .env.local file is properly formatted</li>
                      <li>Restart your development server after making changes</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Email details */}
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Mail size={14} className="mr-1" /> Email Configuration
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>EMAIL_USER:</span>
                    <span className={`${envVars.emailUser ? "text-green-400" : "text-red-400"} font-mono`}>
                      {envVars.emailUser ? "Set" : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>EMAIL_PASSWORD:</span>
                    <span className={`${envVars.emailPass ? "text-green-400" : "text-red-400"} font-mono`}>
                      {envVars.emailPass ? "Set" : "Not set"}
                    </span>
                  </div>
                </div>
                {emailStatus !== "ok" && (
                  <div className="mt-2 text-xs bg-yellow-900/30 p-2 rounded border border-yellow-900">
                    <p className="font-medium text-yellow-400">Gmail Setup Instructions:</p>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                      <li>Enable 2-Step Verification on your Google Account</li>
                      <li>
                        Generate an App Password at{" "}
                        <a
                          href="https://myaccount.google.com/apppasswords"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          myaccount.google.com/apppasswords
                        </a>
                      </li>
                      <li>Select "Mail" as the app and "Other" as the device</li>
                      <li>Name it "Portfolio Contact Form" and click "Generate"</li>
                      <li>Copy the 16-character password</li>
                      <li>Add to .env.local as EMAIL_PASSWORD=your16charpassword</li>
                      <li>Add EMAIL_USER=youremail@gmail.com</li>
                      <li>Restart your development server</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
