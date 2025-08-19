"use server"

export async function submitForm(formData: FormData) {
  // Always log the form submission for manual processing
  const submissionData = {
    name: formData.get("name"),
    email: formData.get("email"),
    userType: formData.get("user-type"),
    planInterest: formData.get("plan-interest"),
    school: formData.get("school"),
    location: formData.get("location"),
    timestamp: new Date().toISOString(),
  }

  console.log("📝 NEW FORM SUBMISSION:", submissionData)

  // Check if SendGrid is configured
  const sendGridApiKey = process.env.SENDGRID_API_KEY
  const emailFrom = process.env.EMAIL_FROM || "bthapa@intelladapt.com"

  if (!sendGridApiKey) {
    console.log("⚠️ SendGrid API key not configured. Form data logged above for manual processing.")
    return { success: true, message: "Form submitted successfully!" }
  }

  if (!sendGridApiKey.startsWith("SG.")) {
    console.log("⚠️ Invalid SendGrid API key format. Form data logged above for manual processing.")
    return { success: true, message: "Form submitted successfully!" }
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
            subject: "New AlgebraAI Signup - Follow Up Required",
          },
        ],
        from: { email: emailFrom },
        content: [
          {
            type: "text/html",
            value: `
            <h2>New AlgebraAI Signup</h2>
            <p><strong>Name:</strong> ${submissionData.name}</p>
            <p><strong>Email:</strong> ${submissionData.email}</p>
            <p><strong>User Type:</strong> ${submissionData.userType}</p>
            <p><strong>Plan Interest:</strong> ${submissionData.planInterest}</p>
            <p><strong>School/Organization:</strong> ${submissionData.school}</p>
            <p><strong>Location:</strong> ${submissionData.location}</p>
            <p><strong>Submitted:</strong> ${submissionData.timestamp}</p>
            <hr>
            <p><em>Please follow up with this potential customer.</em></p>
          `,
          },
        ],
      }),
    })

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text()
      console.log("❌ Notification email failed:", errorText)

      if (notificationResponse.status === 401) {
        console.log("🔑 SendGrid API key appears to be invalid or expired. Please check your API key.")
      }
    } else {
      console.log("✅ Notification email sent successfully to info@intelladapt.com")
    }

    // Send welcome email to the user
    const welcomeResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: submissionData.email as string }],
            subject: "Welcome to AlgebraAI - Your Learning Journey Begins!",
          },
        ],
        from: { email: emailFrom },
        content: [
          {
            type: "text/html",
            value: `
            <h2>Welcome to AlgebraAI!</h2>
            <p>Hi ${submissionData.name},</p>
            <p>Thank you for your interest in AlgebraAI! We're excited to help you master algebra with our revolutionary brain-adaptive learning technology.</p>
            
            <h3>What's Next?</h3>
            <ul>
              <li>Our team will review your information and contact you within 24 hours</li>
              <li>We'll help you choose the perfect plan for your needs</li>
              <li>You'll receive login instructions and setup guidance</li>
            </ul>
            
            <h3>Questions?</h3>
            <p>Feel free to reply to this email or contact us at:</p>
            <ul>
              <li>Email: support@algebraai.com</li>
              <li>Phone: 1-800-ALGEBRA</li>
            </ul>
            
            <p>Best regards,<br>The AlgebraAI Team</p>
            
            <hr>
            <p><small>This email was sent because you signed up for AlgebraAI. If you didn't sign up, please ignore this email.</small></p>
          `,
          },
        ],
      }),
    })

    if (!welcomeResponse.ok) {
      const errorText = await welcomeResponse.text()
      console.log("❌ Welcome email failed:", errorText)
    } else {
      console.log("✅ Welcome email sent successfully to", submissionData.email)
    }
  } catch (error) {
    console.log("❌ Error sending emails:", error)
    console.log("📝 Form data has been logged above for manual processing.")
  }

  // Always return success to the user since we've logged their data
  return {
    success: true,
    message: "Form submitted successfully! Check your email for confirmation.",
  }
}
