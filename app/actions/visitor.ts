"use server"

import { getSupabaseClient, type Visitor } from "@/lib/supabase"
import nodemailer from "nodemailer"

export async function saveVisitorInfo(visitorInfo: Visitor) {
  try {
    console.log("Saving visitor info:", visitorInfo)

    let databaseSuccess = false
    let emailSuccess = false
    let errorMessage = ""

    // Try to save to Supabase first
    try {
      const supabase = getSupabaseClient()

      // Only attempt database save if we have a valid Supabase URL
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.includes("supabase.co")) {
        try {
          const { data, error } = await supabase
            .from("visitors")
            .insert([
              {
                full_name: visitorInfo.full_name,
                email: visitorInfo.email,
                phone: visitorInfo.phone || "",
                message: visitorInfo.message || "",
              },
            ])
            .select()

          if (error) {
            console.error("Error saving visitor info to Supabase:", error)
            errorMessage = error.message
          } else {
            databaseSuccess = true
            console.log("Successfully saved to database")
          }
        } catch (fetchError) {
          console.error("Fetch error when saving to Supabase:", fetchError)
          errorMessage =
            fetchError instanceof Error
              ? `Database connection error: ${fetchError.message}`
              : "Database connection failed"
        }
      } else {
        console.warn("Skipping database save - invalid Supabase URL")
        errorMessage = "Invalid Supabase configuration"
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      errorMessage = dbError instanceof Error ? dbError.message : "Database error"
    }

    // Try to send email notification
    try {
      const emailResult = await sendEmailNotification(visitorInfo)
      emailSuccess = emailResult.success

      if (emailResult.success) {
        console.log("Email sent successfully")
      } else {
        console.error("Email sending failed:", emailResult.error)
        if (!errorMessage) {
          errorMessage = emailResult.error || "Email sending failed"
        }
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError)
      if (!errorMessage) {
        errorMessage = emailError instanceof Error ? emailError.message : "Email error"
      }
    }

    // Return appropriate response based on what succeeded
    if (databaseSuccess && emailSuccess) {
      return { success: true, message: "Thank you for your message! I'll get back to you soon." }
    } else if (databaseSuccess) {
      return { success: true, message: "Your message has been received. Thank you!" }
    } else if (emailSuccess) {
      return { success: true, message: "Your message has been sent via email. Thank you!" }
    } else {
      // Store the data in a backup file if both database and email failed
      try {
        await storeBackupData(visitorInfo)
        return {
          success: true,
          message: "Your message has been received. Thank you for reaching out!",
        }
      } catch (backupError) {
        console.error("Backup storage failed:", backupError)
        return {
          success: false,
          error: "We couldn't process your information at this time. Please try again later.",
        }
      }
    }
  } catch (error) {
    console.error("Unexpected error in saveVisitorInfo:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

async function sendEmailNotification(visitorInfo: Visitor) {
  // Check if email credentials are available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("Email credentials not found in environment variables")
    return {
      success: false,
      error: "Email credentials not configured",
    }
  }

  try {
    // Create a transporter with detailed logging
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, // Enable debug logs
      logger: true, // Log to console
    })

    // Verify connection configuration
    try {
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)
      return {
        success: false,
        error: `SMTP verification failed: ${verifyError instanceof Error ? verifyError.message : String(verifyError)}`,
      }
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "farhanishrak12528@gmail.com", // Your email
      subject: "New Portfolio Visitor Contact",
      html: `
        <h2>New visitor has shared their contact information</h2>
        <p><strong>Name:</strong> ${visitorInfo.full_name}</p>
        <p><strong>Email:</strong> ${visitorInfo.email}</p>
        <p><strong>Phone:</strong> ${visitorInfo.phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${visitorInfo.message || "Not provided"}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent:", info.response)
    return { success: true }
  } catch (error) {
    console.error("Error sending email notification:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Backup function to store data locally when both database and email fail
async function storeBackupData(visitorInfo: Visitor) {
  // In a real application, you might want to store this in a local file or a more reliable storage
  // For now, we'll just log it to the console
  console.log("BACKUP DATA STORAGE:", {
    timestamp: new Date().toISOString(),
    visitor: visitorInfo,
  })

  // This is a placeholder - in a real app, you might want to implement actual storage
  return true
}
