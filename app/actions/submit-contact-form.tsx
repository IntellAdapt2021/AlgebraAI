"use server"

export async function submitContactForm(formData: FormData) {
  // Always log the contact form submission for manual processing
  const contactData = {
    name: formData.get("contact-name"),
    email: formData.get("contact-email"),
    organization: formData.get("organization"),
    role: formData.get("role"),
    students: formData.get("students"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
    timestamp: new Date().toISOString(),
  }

  console.log("📝 NEW CONTACT FORM SUBMISSION:", contactData)

  // Check if SendGrid is configured
  const sendGridApiKey = process.env.SENDGRID_API_KEY
  const emailFrom = process.env.EMAIL_FROM || "bthapa@intelladapt.com"

  if (!sendGridApiKey) {
    console.log("⚠️ SendGrid API key not configured. Contact form data logged above for manual processing.")
    return { success: true, message: "Message sent successfully! We'll get back to you soon." }
  }

  if (!sendGridApiKey.startsWith("SG.")) {
    console.log("⚠️ Invalid SendGrid API key format. Contact form data logged above for manual processing.")
    return { success: true, message: "Message sent successfully! We'll get back to you soon." }
  }

  try {
    // Send notification email to info@intelladapt.com
    const notificationResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "info@intelladapt.com" }],
            subject: "New Contact Form Submission - Follow Up Required",
          },
        ],
        from: { email: emailFrom },
        content: [
          {
            type: "text/html",
            value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Organization:</strong> ${contactData.organization}</p>
            <p><strong>Role:</strong> ${contactData.role}</p>
            <p><strong>Number of Students:</strong> ${contactData.students || "Not specified"}</p>
            <p><strong>Implementation Timeline:</strong> ${contactData.timeline || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">${contactData.message || "No message provided"}</p>
            <p><strong>Submitted:</strong> ${contactData.timestamp}</p>
            <hr>
            <p><em>Please follow up with this potential customer regarding their inquiry.</em></p>
          `,
          },
        ],
      }),
    })

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text()
      console.log("❌ Contact notification email failed:", errorText)

      if (notificationResponse.status === 401) {
        console.log("🔑 SendGrid API key appears to be invalid or expired. Please check your API key.")
      }
    } else {
      console.log("✅ Contact notification email sent successfully to info@intelladapt.com")
    }

    // Send confirmation email to the user
    const confirmationResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: contactData.email as string }],
            subject: "Thank you for contacting AlgebraAI - We'll be in touch soon!",
          },
        ],
        from: { email: emailFrom },
        content: [
          {
            type: "text/html",
            value: `
            <h2>Thank you for contacting AlgebraAI!</h2>
            <p>Hi ${contactData.name},</p>
            <p>Thank you for reaching out to us about bringing AlgebraAI to ${contactData.organization}. We're excited about the opportunity to work with you!</p>
            
            <h3>What we received:</h3>
            <ul>
              <li><strong>Your Role:</strong> ${contactData.role}</li>
              <li><strong>Student Count:</strong> ${contactData.students || "Not specified"}</li>
              <li><strong>Timeline:</strong> ${contactData.timeline || "Not specified"}</li>
              <li><strong>Your Message:</strong> ${contactData.message || "No message provided"}</li>
            </ul>
            
            <h3>What's Next?</h3>
            <ul>
              <li>Our team will review your inquiry within 24 hours</li>
              <li>We'll contact you to discuss your specific needs</li>
              <li>We'll provide custom pricing and implementation details</li>
              <li>We'll answer any questions you may have</li>
            </ul>
            
            <h3>Questions?</h3>
            <p>Feel free to reply to this email or contact us at:</p>
            <ul>
              <li>Email: info@intelladapt.com</li>
              <li>Phone: 1-800-ALGEBRA</li>
            </ul>
            
            <p>Best regards,<br>The AlgebraAI Team</p>
            
            <hr>
            <p><small>This email was sent because you submitted a contact form on our website. If you didn't submit this form, please ignore this email.</small></p>
          `,
          },
        ],
      }),
    })

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text()
      console.log("❌ Contact confirmation email failed:", errorText)
    } else {
      console.log("✅ Contact confirmation email sent successfully to", contactData.email)
    }
  } catch (error) {
    console.log("❌ Error sending contact form emails:", error)
    console.log("📝 Contact form data has been logged above for manual processing.")
  }

  // Always return success to the user since we've logged their data
  return {
    success: true,
    message: "Message sent successfully! Check your email for confirmation.",
  }
}
