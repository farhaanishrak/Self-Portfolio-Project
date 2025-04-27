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
        const { data, error } = await supabase
          .from("visitors")
          .insert([
            {
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
      emailSuccess = emailResult
      if (emailResult) {
        console.log("Email sent successfully")
      } else {
        console.error("Email sending failed")
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError)
      if (!errorMessage) {
        errorMessage = emailError instanceof Error ? emailError.message : "Email error"
      }
    }

    // Return appropriate response based on what succeeded
    if (databaseSuccess && emailSuccess) {
      return { success: true, message: "Data saved and email sent successfully" }
    } else if (databaseSuccess) {
      return { success: true, message: "Data saved to database, but email notification failed" }
    } else if (emailSuccess) {
      return { success: true, message: "Email sent but database save failed", error: errorMessage }
    } else {
      return { success: false, error: "Both database and email failed: " + errorMessage }
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
    return false
  }

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "farhanishrak12528@gmail.com", // Your email
      subject: "New Portfolio Visitor Contact",
      html: `
        <h2>New visitor has shared their contact information</h2>
        <p><strong>Email:</strong> ${visitorInfo.email}</p>
        <p><strong>Phone:</strong> ${visitorInfo.phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${visitorInfo.message || "Not provided"}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent:", info.response)
    return true
  } catch (error) {
    console.error("Error sending email notification:", error)
    return false
  }
}
