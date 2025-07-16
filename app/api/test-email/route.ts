import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with the API key from environment variables
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('ERROR: RESEND_API_KEY is not set in environment variables');
  throw new Error('Email service is not properly configured');
}

const resend = new Resend(apiKey);

export async function GET() {
  const testEmail = 'bamideleaug2002@gmail.com'; // Replace with your test email
  
  try {
    console.log('Sending test email to:', testEmail);
    
    const { data, error } = await resend.emails.send({
      from: 'Iventverse Test <onboarding@resend.dev>',
      to: testEmail,
      subject: 'Test Email from Iventverse',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello!</h2>
          <p>This is a test email from Iventverse.</p>
          <p>If you're receiving this, the email service is working correctly!</p>
          <p>Current time: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Test email failed:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log('Test email sent successfully:', data);
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      data
    });

  } catch (error) {
    console.error('Test email failed with error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
