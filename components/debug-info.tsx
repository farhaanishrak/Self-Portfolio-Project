"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Bug, X, RefreshCw, AlertTriangle, CheckCircle2, Copy, ExternalLink } from "lucide-react"

export default function DebugInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [envVars, setEnvVars] = useState<{ [key: string]: string | undefined }>({})
  const [copied, setCopied] = useState(false)

  // Check environment variables on mount
  useEffect(() => {
    if (isOpen) {
      setEnvVars({
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "[HIDDEN]" : undefined,
        EMAIL_USER: process.env.EMAIL_USER ? "[HIDDEN]" : undefined,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "[HIDDEN]" : undefined,
      })
    }
  }, [isOpen])

  const testSupabaseConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const supabase = getSupabaseClient()

      // First, check if we can connect to Supabase at all
      try {
        const { data, error } = await supabase.from("visitors").select("count").limit(1)

        if (error) {
          if (error.message.includes("does not exist")) {
            setTestResult(`⚠️ Connected to Supabase, but 'visitors' table doesn't exist. Create it with:
            
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`)
          } else {
            setTestResult(`❌ Supabase Error: ${error.message}`)
          }
        } else {
          setTestResult(`✅ Supabase Connection Successful! Found visitors table.`)
        }
      } catch (error) {
        setTestResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const checkEnvironmentVariables = () => {
    let result = "Environment Variables Check:\n\n"

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      result += "❌ NEXT_PUBLIC_SUPABASE_URL is missing\n"
    } else {
      try {
        new URL(process.env.NEXT_PUBLIC_SUPABASE_URL)
        result += `✅ NEXT_PUBLIC_SUPABASE_URL is set and valid: ${process.env.NEXT_PUBLIC_SUPABASE_URL}\n`
      } catch (e) {
        result += `❌ NEXT_PUBLIC_SUPABASE_URL is invalid: ${process.env.NEXT_PUBLIC_SUPABASE_URL}\n`
      }
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      result += "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing\n"
    } else {
      result += "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set (value hidden)\n"
    }

    result += "\nNote: EMAIL_USER and EMAIL_PASSWORD are server-side variables and cannot be checked from the browser."

    setTestResult(result)
  }

  const copyEnvTemplate = () => {
    const template = `# Supabase credentials - Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-supabase

# Email credentials (for Gmail)
# For Gmail, you need to use an App Password: https://support.google.com/accounts/answer/185833
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
`
    navigator.clipboard.writeText(template)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderEnvVarStatus = () => {
    return (
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-white">Environment Variables Status:</h4>
        <div className="space-y-1 text-xs">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex items-center">
              {value ? (
                <CheckCircle2 size={12} className="text-green-400 mr-1 flex-shrink-0" />
              ) : (
                <AlertTriangle size={12} className="text-yellow-400 mr-1 flex-shrink-0" />
              )}
              <span className="font-mono">{key}:</span>
              <span className="ml-1">{value ? "Set" : "Not set"}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-3 glass-card rounded-full shadow-md text-accent hover:text-white hover:bg-accent transition-colors"
      >
        <Bug size={24} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 glass-card p-4 rounded-lg shadow-lg max-w-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-white flex items-center">
          <Bug size={18} className="mr-2 text-accent" />
          Debug Information
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {renderEnvVarStatus()}

        <div className="flex space-x-2">
          <button
            onClick={testSupabaseConnection}
            disabled={isLoading}
            className="text-xs px-3 py-1 bg-accent/20 hover:bg-accent/30 text-white rounded-md transition-colors flex items-center"
          >
            {isLoading ? <RefreshCw size={12} className="animate-spin mr-1" /> : null}
            {isLoading ? "Testing..." : "Test Supabase Connection"}
          </button>

          <button
            onClick={checkEnvironmentVariables}
            className="text-xs px-3 py-1 bg-accent/20 hover:bg-accent/30 text-white rounded-md transition-colors"
          >
            Check Environment Variables
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">Need to set up your .env.local file?</span>
          <button
            onClick={copyEnvTemplate}
            className="text-xs px-3 py-1 bg-accent/20 hover:bg-accent/30 text-white rounded-md transition-colors flex items-center"
          >
            <Copy size={12} className="mr-1" />
            {copied ? "Copied!" : "Copy Template"}
          </button>
        </div>

        {testResult && <div className="mt-2 text-xs p-2 bg-black/30 rounded-md whitespace-pre-wrap">{testResult}</div>}

        <div className="mt-2 text-xs p-2 bg-black/30 rounded-md">
          <p className="font-medium text-white mb-1">Quick Fix:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li>
              Create a <code className="bg-black/50 px-1 rounded">.env.local</code> file in your project root
            </li>
            <li>Add your Supabase URL and anon key from your Supabase dashboard</li>
            <li>Restart your development server</li>
            <li>If using Vercel, add these environment variables in your project settings</li>
          </ol>
        </div>

        <div className="mt-2 text-xs p-2 bg-black/30 rounded-md">
          <p className="font-medium text-white mb-1">Get Supabase Credentials:</p>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-accent hover:underline"
          >
            <ExternalLink size={12} className="mr-1" />
            Go to Supabase Dashboard
          </a>
          <p className="mt-1 text-gray-300">
            1. Select your project
            <br />
            2. Go to Project Settings → API
            <br />
            3. Copy the URL and anon key
          </p>
        </div>
      </div>
    </div>
  )
}
