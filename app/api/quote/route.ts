import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAILS || "auapworld@gmail.com"

// Create Gmail transporter if credentials are available
function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  
  if (!user || !pass) {
    console.log("[v0] Gmail credentials not configured - emails will be logged only")
    return null
  }
  
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
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

    // Build formatted email content
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

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1d24; color: #fff; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Quote Request</h1>
          <p style="margin: 8px 0 0; opacity: 0.8;">AUAPW.ORG</p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px;">
          <div style="background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 16px; font-size: 16px; color: #333;">Vehicle Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Part:</td><td style="padding: 8px 0; font-weight: bold;">${part || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Make:</td><td style="padding: 8px 0; font-weight: bold;">${make}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Model:</td><td style="padding: 8px 0; font-weight: bold;">${model || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Year:</td><td style="padding: 8px 0; font-weight: bold;">${year || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Option:</td><td style="padding: 8px 0; font-weight: bold;">${option || "Not specified"}</td></tr>
            </table>
          </div>
          
          <div style="background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 16px; font-size: 16px; color: #333;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:${phone}" style="color: #0066cc;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0; font-weight: bold;"><a href="mailto:${email}" style="color: #0066cc;">${email || "Not provided"}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">ZIP:</td><td style="padding: 8px 0; font-weight: bold;">${zip || "Not provided"}</td></tr>
            </table>
          </div>
          
          ${message ? `
          <div style="background: #fff; border-radius: 8px; padding: 20px;">
            <h2 style="margin: 0 0 16px; font-size: 16px; color: #333;">Message</h2>
            <p style="margin: 0; color: #333;">${message}</p>
          </div>
          ` : ""}
        </div>
        
        <div style="background: #1a1d24; color: #fff; padding: 16px 20px; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">Submitted at ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `

    // Log the submission
    console.log("[Quote Submission]", textBody)

    // Try to send email notification
    const transporter = createTransporter()
    if (transporter) {
      try {
        // Send notification to admin
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: NOTIFICATION_EMAIL,
          subject: `[AUAPW] ${subject}`,
          text: textBody,
          html: htmlBody,
        })
        console.log("[v0] Quote notification sent to", NOTIFICATION_EMAIL)

        // Send confirmation to customer if email provided
        if (email) {
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: `Your Quote Request - ${part || "Auto Part"} for ${make} | AUAPW.ORG`,
            text: `Dear ${name},\n\nThank you for requesting a quote from AUAPW.ORG!\n\nWe have received your request for:\n- Part: ${part || "Auto Part"}\n- Vehicle: ${year || ""} ${make} ${model || ""}\n\nOur team will get back to you within 24-48 hours with pricing and availability.\n\nIf you have any questions, please call us at (888) 818-5001.\n\nBest regards,\nThe AUAPW Team`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1a1d24 0%, #2d3748 100%); color: #fff; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
                  <p style="margin: 10px 0 0; opacity: 0.9;">We've received your quote request</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px;">
                  <p style="font-size: 16px; color: #333;">Dear ${name},</p>
                  <p style="color: #555; line-height: 1.6;">Thank you for requesting a quote from <strong>AUAPW.ORG</strong> - America's Trusted Auto Parts Warehouse!</p>
                  
                  <div style="background: #fff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                    <h3 style="margin: 0 0 12px; color: #333;">Your Request:</h3>
                    <p style="margin: 0; color: #555;"><strong>Part:</strong> ${part || "Auto Part"}</p>
                    <p style="margin: 8px 0 0; color: #555;"><strong>Vehicle:</strong> ${year || ""} ${make} ${model || ""}</p>
                  </div>
                  
                  <p style="color: #555; line-height: 1.6;">Our team is searching our network of <strong>2,000+ verified salvage yards</strong> to find the best match for your needs. You can expect to hear back from us within <strong>24-48 hours</strong>.</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="tel:8888185001" style="display: inline-block; background: #10b981; color: #fff; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">Call Us: (888) 818-5001</a>
                  </div>
                </div>
                
                <div style="background: #1a1d24; color: #fff; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0; font-size: 14px;">AUAPW.ORG - All Used Auto Parts Warehouse</p>
                  <p style="margin: 8px 0 0; font-size: 12px; opacity: 0.7;">Quality Parts • 30-180 Day Warranty • Free Shipping</p>
                </div>
              </div>
            `,
          })
          console.log("[v0] Confirmation email sent to", email)
        }
      } catch (emailError) {
        console.error("[v0] Failed to send email:", emailError)
        // Don't fail the request if email fails - the quote was still logged
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your quote request has been received. We will contact you within 24 hours.",
    })
  } catch (error) {
    console.error("[v0] Quote submission error:", error)
    return NextResponse.json(
      { error: "Failed to process your request. Please try again or call us directly." },
      { status: 500 }
    )
  }
}
