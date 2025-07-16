"use server";

import { client } from "./db";
import * as EmailJS from '@emailjs/nodejs';

interface EmailJSError extends Error {
    status?: number;
    text?: string;
}

// Initialize EmailJS with your public key
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || '';

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.error('Missing required EmailJS environment variables');
    throw new Error('Email service is not properly configured');
}

type User = {
    fullName: string;
    email: string;
    phoneNumber: string;
    occasions: string;
};

export const waitlistUser = async (user: User) => {
    console.log('Starting waitlistUser with user:', JSON.stringify(user, null, 2));
    
    // Input validation
    if (!user) {
        const error = 'User data is required';
        console.error(error);
        return {
            success: false,
            error,
            message: 'Please provide all required information',
            emailSent: false
        };
    }
    
    const { fullName, email, phoneNumber, occasions } = user;
    
    if (!fullName || !email || !phoneNumber) {
        const error = 'All fields are required';
        console.error(error, { hasFullName: !!fullName, hasEmail: !!email, hasPhone: !!phoneNumber });
        return {
            success: false,
            error,
            message: 'Please fill in all required fields',
            emailSent: false
        };
    }

    try {
        console.log('Checking if user already exists...');
        let userResponse;
        
        try {
            // Try to create a new user first (more efficient if most users are new)
            console.log('Attempting to create new user...');
            userResponse = await client.user.create({
                data: {
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    occasions: user.occasions
                },
            });
            console.log('New user created successfully');
        } catch (error: unknown) {
            // Handle Prisma errors
            const prismaError = error as { code?: string; meta?: { target?: string[] } };
            // If user already exists, update their information
            if (prismaError.code === 'P2002' && prismaError.meta?.target?.includes('email')) {
                console.log('User already exists, updating information...');
                userResponse = await client.user.update({
                    where: { email: user.email },
                    data: {
                        fullName: user.fullName,
                        phoneNumber: user.phoneNumber,
                        occasions: user.occasions,
                        updatedAt: new Date()
                    },
                });
                console.log('User information updated successfully');
            } else {
                // Re-throw the error if it's not a duplicate email error
                console.error('Error object:', error);
                console.error('Error stack:', (error as Error)?.stack);
                console.error('Error name:', (error as Error)?.name);
                console.error('Prisma error code:', prismaError?.code);
                throw error;
            }
        }

        if (!userResponse) {
            const error = "No response received from database";
            console.error(error);
            throw new Error(error);
        }

        console.log('User created successfully:', JSON.stringify(userResponse, null, 2));

        // Then, send welcome email using the Resend API directly
        try {
            // Resend client is already initialized at the top of the file
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(user.email)) {
                console.error('Invalid email format:', user.email);
                throw new Error('Invalid email address format');
            }
            
            console.log('Sending email to:', user.email);
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                to_email: user.email,
                to_name: user.fullName,
                from_name: 'Iventverse Team',
                subject: '🎉 Welcome to Iventverse!',
                message: `
                <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; padding: 40px 0;">
                        <div style="margin-bottom: 20px;">
                            <img src="https://yourdomain.com/iv1.png" alt="Iventverse Logo" style="max-width: 180px; height: auto;" />
                        </div>
                        <h1 style="color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 16px; text-align: center;">🎉 You're on the List!</h1>
                    </div>
                    
                    <div style="background: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
                        <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px;">Hello ${user.fullName.split(' ')[0] || 'there'},</h2>
                        
                        <p style="color: #4b5563; margin: 0 0 24px; line-height: 1.6;">Thank you for joining the Iventverse waitlist! We're excited to have you on board as we prepare to launch something truly special.</p>
                        
                        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                            <p style="margin: 0; color: #111827;"><strong>What's next?</strong> We'll keep you updated on our progress and notify you as soon as we're ready to welcome you in.</p>
                        </div>
                        
                        <p style="color: #4b5563; margin: 0 0 24px; line-height: 1.6;">In the meantime, here's what you can expect:</p>
                        <ul style="color: #4b5563; padding-left: 20px; margin: 0 0 24px;">
                            <li style="margin-bottom: 8px;">Early access to new features</li>
                            <li style="margin-bottom: 8px;">Exclusive updates before anyone else</li>
                            <li>Special surprises along the way</li>
                        </ul>
                        
                        <p style="color: #4b5563; margin: 0 0 24px; line-height: 1.6;">We're working hard to make Iventverse amazing, and we can't wait to share it with you soon!</p>
                        
                        <p style="color: #4b5563; margin: 0 0 24px; line-height: 1.6;">Best regards,<br>The Iventverse Team</p>
                        
                        <div style="margin: 24px 0;">
                            <a href="https://twitter.com/iventverse" style="display: inline-block; margin: 0 8px; color: #6b7280; text-decoration: none;" target="_blank">Twitter</a> • 
                            <a href="https://instagram.com/iventverse" style="display: inline-block; margin: 0 8px; color: #6b7280; text-decoration: none;" target="_blank">Instagram</a> • 
                            <a href="https://facebook.com/iventverse" style="display: inline-block; margin: 0 8px; color: #6b7280; text-decoration: none;" target="_blank">Facebook</a>
                        </div>
                    </div>
                    
                    <div style="text-align: center; padding: 24px 0; color: #9ca3af; font-size: 14px;">
                        <p>© ${new Date().getFullYear()} Iventverse. All rights reserved.</p>
                        <p style="font-size: 13px; color: #9ca3af; margin-top: 8px;">
                            You're receiving this email because you joined the Iventverse waitlist.<br>
                            <a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> | 
                            <a href="#" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a>
                        </p>
                    </div>
                </div>
                `
            };
            
            console.log('Sending email with EmailJS...');
            
            // Send email directly using EmailJS
            const result = await EmailJS.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                {
                    publicKey: EMAILJS_PUBLIC_KEY,
                    // Optionally, configure the EmailJS API host
                    // host: 'api.emailjs.com',
                }   
            );

            console.log('EmailJS API response:', result);

            if (result.status !== 200) {
                throw new Error('Failed to send email');
            }
            
            // If we get here, email was sent successfully
            console.log('Welcome email sent successfully');
            return { 
                success: true, 
                data: result,
                emailSent: true,
                message: 'Welcome email sent successfully'
            };
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Return success for the user creation but indicate email failed
            return {
                success: true, // Still success because user was created
                emailSent: false,
                message: 'User created but failed to send welcome email',
                error: emailError instanceof Error ? emailError.message : 'Unknown email error'
            };
        }

    } catch (error) {
        console.error('Error in waitlistUser function:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            message: 'Failed to process user registration',
            emailSent: false
        };
    }
};