import { createClient } from "@supabase/supabase-js"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Singleton pattern to avoid multiple instances
let supabaseInstance: ReturnType<typeof createClient> | null = null

// Function to validate URL format
function isValidUrl(urlString: string | undefined | null): boolean {
  if (!urlString) return false

  try {
    // Try to create a URL object - this will throw if invalid
    new URL(urlString)
    // Check if it's a proper Supabase URL (should contain supabase.co or similar)
    return urlString.includes("supabase.co") || urlString.includes("supabase.in")
  } catch (e) {
    return false
  }
}

// Update the getSupabaseClient function to be more robust in server environments
export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate URL before creating client
  if (!isValidUrl(supabaseUrl)) {
    console.error("Invalid Supabase URL:", supabaseUrl)

    if (isBrowser) {
      console.error(
        "%c Supabase Connection Error ",
        "background: #ff0000; color: white; padding: 2px 4px; border-radius: 3px;",
        "Please check your environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
      )
    }

    // Return a mock client that won't throw errors but won't work either
    return createMockClient()
  }

  // If we have a valid URL and key, create the real client
  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        // Add global error handler
        global: {
          fetch: (...args) => {
            return fetch(...args).catch((err) => {
              console.error("Supabase fetch error:", err)
              throw err
            })
          },
        },
      })
      return supabaseInstance
    } catch (error) {
      console.error("Error creating Supabase client:", error)
      return createMockClient()
    }
  }

  // If we're missing the key but have a valid URL, create a mock client
  return createMockClient()
}

// Mock client for when Supabase URL is invalid
function createMockClient() {
  const mockResponse = { data: null, error: { message: "Supabase connection error: Invalid URL or credentials" } }

  return {
    from: () => ({
      select: () => Promise.resolve(mockResponse),
      insert: () => Promise.resolve(mockResponse),
      update: () => Promise.resolve(mockResponse),
      delete: () => Promise.resolve(mockResponse),
    }),
    auth: {
      signIn: () => Promise.resolve(mockResponse),
      signOut: () => Promise.resolve(mockResponse),
      onAuthStateChange: () => ({ data: null, unsubscribe: () => {} }),
    },
  } as any
}

// Export the singleton getter
export const supabase = getSupabaseClient()

// Updated Visitor type to include full_name
export type Visitor = {
  id?: number
  full_name: string
  email: string
  phone: string
  message: string
  created_at?: string
}
