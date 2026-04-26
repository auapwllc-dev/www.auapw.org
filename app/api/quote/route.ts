import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const LEAD_EMAIL = process.env.LEAD_NOTIFICATION_EMAILS || "auapworld@gmail.com"

// Create Gmail transporter
function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  
  if (!user || !pass) {
    return null
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { part, make, model, year, option, name, phone, email, state, zip, message } = body

    if (!make || !name || !phone) {
      return NextResponse.json(
        { error: "Make, name, and phone are required." },
        { status: 400 }
      )
    }

    // Build formatted email subject and body
    const subject = `Quote Request: ${year || ""} ${make} ${model || ""} - ${part || "Auto Part"}`.trim()
    const textBody = [
      `New Quote Request from AUAPW Website`,
      ``,
      `--- Vehicle Details ---`,
      `Part: ${part || "Not specified"}`,
      `Make: ${make}`,
      `Model: ${model || "Not specified"}`,
      `Year: ${year || "Not specified"}`,
      `Option: ${option || "Not specified"}`,
      ``,
      `--- Customer Details ---`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `State: ${state || "Not provided"}`,
      `ZIP: ${zip || "Not provided"}`,
      ``,
      `--- Message ---`,
      message || "(no message)",
      ``,
      `---`,
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n")

    // Log the submission 
    console.log("[Quote Submission]", textBody)

    // Try to send email via Gmail SMTP
    const transporter = createTransporter()
    if (transporter) {
      try {
        // Send notification to admin
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: LEAD_EMAIL,
          subject: `[NEW LEAD] ${subject}`,
          text: textBody,
          replyTo: email || undefined,
        })
        console.log("[Quote] Email sent to:", LEAD_EMAIL)

        // Send confirmation to customer if email provided
        if (email) {
          const customerSubject = `Your Quote Request - AUAPW.ORG`
          const customerBody = `Dear ${name},

Thank you for requesting a quote from AUAPW.ORG!

We have received your request for:
- Part: ${part || "Auto Part"}
- Vehicle: ${year || ""} ${make} ${model || ""}

Our team will contact you within 24 hours with pricing and availability.

If you have any questions, please contact us:
- Phone: (888) 818-5001
- Email: support@auapw.org

Thank you for choosing AUAPW.ORG!

Best regards,
The AUAPW Team`

          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: customerSubject,
            text: customerBody,
          })
          console.log("[Quote] Confirmation email sent to customer:", email)
        }
      } catch (emailError) {
        console.error("[Quote] Failed to send email:", emailError)
        // Continue even if email fails - don't block the response
      }
    } else {
      console.log("[Quote] Gmail credentials not configured - emails will be logged only")
    }

    return NextResponse.json({
      success: true,
      message: "Your quote request has been received. We will contact you within 24 hours.",
    })
  } catch (err) {
    console.error("[Quote] Error:", err)
    return NextResponse.json(
      { error: "Failed to process your request. Please try again or call us directly." },
      { status: 500 }
    )
  }
}
