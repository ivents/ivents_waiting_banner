// app/api/register/route.ts or wherever you're saving the form data
import { prisma } from '@/lib/prisma'; // adjust as needed
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { fullName, email } = await req.json();

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
    await resend.emails.send({
      from: 'Iventverse <no-reply@ Iventverse@gmail.com>',
      to: email,
      subject: '🎉 Welcome to Iventverse!',
      html: `
        <div>
          <h2>Hello ${fullName},</h2>
          <p>Thanks for joining <strong>Iventverse</strong>!</p>
          <p>We’ll keep you updated with exciting stuff.</p>
          <p>Stay awesome ✨</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
