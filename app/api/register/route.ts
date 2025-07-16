import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import axios from 'axios';

interface RegisterRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  occasions: string[];
}

export async function POST(req: Request) {
  const { fullName, email, phoneNumber, occasions } = await req.json() as RegisterRequest;

  if (!fullName || !email) {
    return NextResponse.json({ success: false, error: 'Full name and email are required' }, { status: 400 });
  }

  try {
    // Save user
    await prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber: phoneNumber || '',
        occasions: Array.isArray(occasions) ? occasions.join(', ') : '',
      },
    });

    // Prepare email payload according to EmailJS API requirements
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: email,
        to_name: fullName,
        from_name: 'Iventverse Team',
        reply_to: 'noreply@iventverse.com',
        subject: '🎉 Welcome to Iventverse!',
      }
    };

    // DEBUG LOG
    console.log("📨 Sending to EmailJS with:", JSON.stringify(emailData, null, 2));

    // Send the email
    const emailResponse = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      emailData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Email sent! EmailJS response:', emailResponse.data);

    return NextResponse.json({ success: true, message: 'Welcome email sent' });

  } catch (error: any) {
    console.error('❌ Email send failed:', error?.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: 'Email sending failed', details: error?.response?.data },
      { status: 403 }
    );
  }
}
