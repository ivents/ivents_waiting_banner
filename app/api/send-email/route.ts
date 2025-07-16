// app/api/register/route.ts or wherever you're saving the form data
import { prisma } from '@/lib/prisma'; // adjust as needed
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Debug: Log environment variables (don't log the actual API key)
console.log('Environment variables check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('- NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

// Initialize Resend with the API key from environment variables
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('ERROR: RESEND_API_KEY is not set in environment variables');
  throw new Error('Email service is not properly configured');
}

const resend = new Resend(apiKey);
console.log('Resend client initialized with API key:', apiKey ? '***' + apiKey.slice(-4) : 'Not set');

// Define the expected request body type
interface EmailRequest {
  fullName: string;
  email: string;
}

export async function POST(req: Request) {
  console.log('\n--- New Email Request ---');
  
  try {
    // Parse the JSON body directly
    const body = await req.json() as EmailRequest;
    const { fullName, email } = body;
    
    console.log('Received request with:', { fullName, email });
    
    console.log('Parsed request:', { fullName, email });

    // Input validation
    if (!email || !fullName) {
      const error = 'Missing required fields';
      console.error('Validation error:', { email, fullName });
      return NextResponse.json(
        { success: false, error },
        { status: 400 }
      );
    }

    // Log the email sending attempt
    console.log(`Attempting to send email to: ${email}`);

    try {
      // Save to Neon (via Prisma)
      const user = await prisma.user.create({
        data: { 
          fullName, 
          email,
          phoneNumber: '',  // Add empty string or proper phone number
          occasions: ''     // Add empty string or proper occasions
        }
      });

      // Send welcome email
      const emailPayload = {
        from: 'Iventverse <onboarding@resend.dev>',
        to: email,
        subject: '🎉 Welcome to Iventverse!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hello ${fullName},</h2>
            <p>Thanks for joining <strong>Iventverse</strong>!</p>
            <p>We'll keep you updated with exciting stuff.</p>
            <p>Stay awesome ✨</p>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              If you didn't sign up for Iventverse, please ignore this email.
            </p>
          </div>
        `,
      };

      console.log('Sending email with payload:', JSON.stringify({
        ...emailPayload,
        // Don't log the full HTML in production
        html: emailPayload.html ? '[HTML_CONTENT]' : undefined
      }, null, 2));

      const result = await resend.emails.send(emailPayload);
      console.log('Resend API response:', JSON.stringify(result, null, 2));

      if ('error' in result && result.error) {
        console.error('Resend API error:', result.error);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to send email',
            details: result.error
          },
          { status: 500 }
        );
      }

      console.log('Email sent successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully',
        data: result.data
      });

    } catch (apiError) {
      console.error('Error in Resend API call:', apiError);
      throw apiError; // This will be caught by the outer catch block
    }

  } catch (error) {
    console.error('Email sending failed with error:', error);
    
    // Prepare error response
    const errorResponse = {
      success: false,
      error: 'Failed to process email request',
      message: error instanceof Error ? error.message : 'Unknown error',
      // Only include stack trace in development
      ...(process.env.NODE_ENV === 'development' && { 
        stack: error instanceof Error ? error.stack : undefined,
        rawError: error 
      })
    };

    console.error('Error response:', JSON.stringify(errorResponse, null, 2));
    
    return NextResponse.json(
      errorResponse,
      { status: 500 }
    );
  }
}
