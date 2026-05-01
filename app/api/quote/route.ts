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

// Generate branded HTML email template for admin notification
function generateAdminEmailHTML(data: {
  part: string
  make: string
  model: string
  year: string
  option: string
  name: string
  phone: string
  email: string
  state: string
  zip: string
  message: string
}) {
  const { part, make, model, year, option, name, phone, email, state, zip, message } = data
  const vehicleInfo = [year, make, model].filter(Boolean).join(" ")
  const submittedAt = new Date().toLocaleString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short' 
  })

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0d0f14;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0f14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111216;border-radius:12px;border:1px solid #22252f;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1d24 0%,#0d0f14 100%);padding:32px 40px;border-bottom:1px solid #22252f;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin:0;font-size:28px;font-weight:900;letter-spacing:0.05em;background:linear-gradient(to bottom,#ffffff 0%,#b0b0b0 50%,#606060 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                      AUAPW.ORG
                    </h1>
                    <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#7a7f90;">
                      New Quote Request
                    </p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:8px 16px;background:linear-gradient(135deg,#4a9a60 0%,#2d6b3d 100%);border-radius:6px;font-size:12px;font-weight:700;color:#ffffff;letter-spacing:0.1em;text-transform:uppercase;">
                      NEW LEAD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Customer Info -->
          <tr>
            <td style="padding:32px 40px;border-bottom:1px solid #22252f;">
              <h2 style="margin:0 0 20px;font-size:14px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d0d4e0;">
                Customer Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1d24;">
                    <span style="color:#7a7f90;font-size:13px;">Name:</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1d24;text-align:right;">
                    <strong style="color:#ffffff;font-size:15px;">${name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1d24;">
                    <span style="color:#7a7f90;font-size:13px;">Phone:</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1d24;text-align:right;">
                    <a href="tel:${phone.replace(/\D/g,'')}" style="color:#4a9a60;font-size:15px;font-weight:700;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1d24;">
                    <span style="color:#7a7f90;font-size:13px;">Email:</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1d24;text-align:right;">
                    <a href="mailto:${email || ''}" style="color:#5a9fd4;font-size:14px;text-decoration:none;">${email || 'Not provided'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="color:#7a7f90;font-size:13px;">Location:</span>
                  </td>
                  <td style="padding:12px 0;text-align:right;">
                    <span style="color:#d0d4e0;font-size:14px;">${[state, zip].filter(Boolean).join(" ") || 'Not provided'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Vehicle & Part Info -->
          <tr>
            <td style="padding:32px 40px;border-bottom:1px solid #22252f;">
              <h2 style="margin:0 0 20px;font-size:14px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d0d4e0;">
                Vehicle & Part Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0f14;border-radius:8px;border:1px solid #22252f;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#7a7f90;">Part Requested</p>
                    <p style="margin:0;font-size:20px;font-weight:700;color:#c8a84b;">${part || 'Auto Part'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 20px 20px;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#7a7f90;">Vehicle</p>
                    <p style="margin:0;font-size:18px;font-weight:600;color:#ffffff;">${vehicleInfo || 'Not specified'}</p>
                    ${option ? `<p style="margin:8px 0 0;font-size:13px;color:#7a7f90;">Option: <span style="color:#d0d4e0;">${option}</span></p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Message -->
          ${message ? `
          <tr>
            <td style="padding:32px 40px;border-bottom:1px solid #22252f;">
              <h2 style="margin:0 0 16px;font-size:14px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d0d4e0;">
                Additional Message
              </h2>
              <p style="margin:0;padding:16px;background:#0d0f14;border-radius:8px;border:1px solid #22252f;color:#b0b4c0;font-size:14px;line-height:1.6;">
                ${message}
              </p>
            </td>
          </tr>
          ` : ''}
          
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background:#0a0b0e;">
              <p style="margin:0;font-size:12px;color:#5a5f70;text-align:center;">
                Submitted on ${submittedAt}
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#4a4f60;text-align:center;letter-spacing:0.05em;">
                AUAPW.ORG &bull; Premium Used Auto Parts &bull; (888) 818-5001
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// Generate branded HTML email template for customer confirmation
function generateCustomerEmailHTML(data: {
  part: string
  make: string
  model: string
  year: string
  name: string
}) {
  const { part, make, model, year, name } = data
  const vehicleInfo = [year, make, model].filter(Boolean).join(" ")
  const firstName = name.split(' ')[0]

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d0f14 0%,#1a1d24 100%);padding:40px;text-align:center;">
              <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:0.08em;color:#ffffff;">
                AUAPW.ORG
              </h1>
              <p style="margin:12px 0 0;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#7a7f90;">
                Premium Used Auto Parts
              </p>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding:40px 40px 24px;">
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#1a1f2e;">
                Thank You, ${firstName}!
              </h2>
              <p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:#4a5568;">
                We've received your quote request and our team is already searching through our network of 2,000+ verified yards to find the best part for your vehicle.
              </p>
            </td>
          </tr>
          
          <!-- Order Summary -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fb;border-radius:12px;border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7a8599;">
                      Your Request
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#64748b;font-size:14px;">Part:</span>
                        </td>
                        <td style="padding:8px 0;text-align:right;">
                          <strong style="color:#1a1f2e;font-size:15px;">${part || 'Auto Part'}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#64748b;font-size:14px;">Vehicle:</span>
                        </td>
                        <td style="padding:8px 0;text-align:right;">
                          <strong style="color:#1a1f2e;font-size:15px;">${vehicleInfo || 'Not specified'}</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What's Next -->
          <tr>
            <td style="padding:0 40px 32px;">
              <h3 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#1a1f2e;">
                What Happens Next?
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:40px;vertical-align:top;">
                          <span style="display:inline-block;width:28px;height:28px;background:#4a9a60;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-weight:700;font-size:14px;">1</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-weight:600;color:#1a1f2e;font-size:15px;">We Search Our Network</p>
                          <p style="margin:4px 0 0;color:#64748b;font-size:13px;">Our team checks 2,000+ verified salvage yards</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:40px;vertical-align:top;">
                          <span style="display:inline-block;width:28px;height:28px;background:#4a9a60;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-weight:700;font-size:14px;">2</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-weight:600;color:#1a1f2e;font-size:15px;">You'll Hear From Us</p>
                          <p style="margin:4px 0 0;color:#64748b;font-size:13px;">Within 24 hours with pricing and availability</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:40px;vertical-align:top;">
                          <span style="display:inline-block;width:28px;height:28px;background:#4a9a60;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-weight:700;font-size:14px;">3</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-weight:600;color:#1a1f2e;font-size:15px;">Fast Shipping</p>
                          <p style="margin:4px 0 0;color:#64748b;font-size:13px;">Part arrives in 7-10 business days with warranty</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="margin:0 0 16px;color:#64748b;font-size:14px;">Need immediate assistance?</p>
              <a href="tel:8888185001" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#4a9a60 0%,#3d8550 100%);border-radius:8px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;letter-spacing:0.05em;">
                Call (888) 818-5001
              </a>
            </td>
          </tr>
          
          <!-- Warranty Badge -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fef9e7 0%,#fdf6e3 100%);border-radius:12px;border:1px solid #f5e6b8;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#92710a;">
                      Every Part Includes
                    </p>
                    <p style="margin:8px 0 0;font-size:20px;font-weight:700;color:#7a5f08;">
                      30-180 Day Warranty
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#0d0f14;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:18px;font-weight:700;letter-spacing:0.08em;color:#ffffff;">
                AUAPW.ORG
              </p>
              <p style="margin:12px 0 0;font-size:13px;color:#7a7f90;">
                Premium Used Auto Parts from 2,000+ Verified Yards
              </p>
              <p style="margin:20px 0 0;font-size:12px;color:#5a5f70;">
                (888) 818-5001 &bull; support@auapw.org
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#4a4f60;">
                107 Myrtle Ave, Woodbine, NJ 08270
              </p>
            </td>
          </tr>
        </table>
        
        <!-- Unsubscribe -->
        <p style="margin:24px 0 0;font-size:11px;color:#9ca3af;text-align:center;">
          You received this email because you requested a quote on auapw.org
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
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

    // Build formatted email subject
    const subject = `Quote Request: ${year || ""} ${make} ${model || ""} - ${part || "Auto Part"}`.trim()
    
    // Plain text fallback for admin
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
        // Generate HTML email for admin
        const adminHtml = generateAdminEmailHTML({ part, make, model, year, option, name, phone, email, state, zip, message })
        
        // Send notification to admin
        await transporter.sendMail({
          from: `"AUAPW.ORG" <${process.env.GMAIL_USER}>`,
          to: LEAD_EMAIL,
          subject: `[NEW LEAD] ${subject}`,
          text: textBody,
          html: adminHtml,
          replyTo: email || undefined,
        })
        console.log("[Quote] Email sent to:", LEAD_EMAIL)

        // Send confirmation to customer if email provided
        if (email) {
          const customerHtml = generateCustomerEmailHTML({ part, make, model, year, name })
          const customerText = `Dear ${name},

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
The AUAPW Team

---
AUAPW.ORG - Premium Used Auto Parts
107 Myrtle Ave, Woodbine, NJ 08270`

          await transporter.sendMail({
            from: `"AUAPW.ORG" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Your Quote Request - AUAPW.ORG`,
            text: customerText,
            html: customerHtml,
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
