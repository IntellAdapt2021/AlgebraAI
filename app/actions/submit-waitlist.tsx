"use server"

import { MongoClient } from 'mongodb'

export async function submitWaitlistEmail(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const source = formData.get('source') as string || 'Homework Solution'

    if (!email) {
      return { success: false, message: 'Email is required' }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' }
    }

    const client = new MongoClient(process.env.MONGODB_URI!)
    
    try {
      await client.connect()
      const db = client.db('Intelladapt_waitlist')
      const collection = db.collection('emails')

      // Check if email already exists
      const existingEmail = await collection.findOne({ email })
      
      if (existingEmail) {
        // Check if this source already exists for this email
        if (existingEmail.sources && existingEmail.sources.includes(source)) {
          return { success: false, message: 'This email is already registered for notifications from this source' }
        }
        
        // Add new source to existing email
        const result = await collection.updateOne(
          { email },
          { 
            $push: { sources: source },
            $set: { updatedAt: new Date() }
          }
        )
        
        if (result.modifiedCount > 0) {
          return { success: true, message: `Successfully added ${source} to your notifications! We'll notify you when it launches.` }
        } else {
          return { success: false, message: 'Failed to update email preferences. Please try again.' }
        }
      } else {
        // Insert new email with source array
        const result = await collection.insertOne({
          email,
          sources: [source],
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active'
        })
        
        if (result.insertedId) {
          return { success: true, message: 'Successfully registered! We\'ll notify you when Homework Solution launches.' }
        } else {
          return { success: false, message: 'Failed to register email. Please try again.' }
        }
      }
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Error submitting waitlist email:', error)
    return { success: false, message: 'An error occurred. Please try again later.' }
  }
}
