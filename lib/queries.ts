"use server";

import { client } from "./db";
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

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
        console.log('Creating user in database...');
        // First, create the user in the database
        const userResponse = await client.user.create({
            data: {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                occasions: user.occasions
            },
        });

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
            const emailData = {
                from: 'Iventverse <onboarding@resend.dev>',
                to: user.email,
                subject: '🎉 Welcome to Iventverse!',
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>🎉 Welcome to Iventverse Waitlist!</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { padding: 40px 0; text-align: center; }
                        .content { background: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02); }
                        h1 { color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 16px; text-align: center; }
                        h2 { color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px; }
                        p { color: #4b5563; margin: 0 0 24px; line-height: 1.6; }
                        .position { 
                            display: inline-block; 
                            background: #f3f4f6; 
                            color: #4b5563; 
                            padding: 4px 12px; 
                            border-radius: 20px; 
                            font-size: 14px; 
                            font-weight: 500; 
                            margin-bottom: 24px;
                        }
                        .highlight {
                            background: #fef2f2;
                            border-left: 4px solid #ef4444;
                            padding: 16px;
                            margin: 24px 0;
                            border-radius: 0 8px 8px 0;
                        }
                        .highlight p { margin: 0; color: #111827; }
                        .footer { text-align: center; padding: 24px 0; color: #9ca3af; font-size: 14px; }
                        .social-links { margin: 24px 0; }
                        .social-link { display: inline-block; margin: 0 8px; color: #6b7280; text-decoration: none; }
                        .social-link:hover { color: #ef4444; }
                        @media only screen and (max-width: 600px) {
                            .container { padding: 16px; }
                            .content { padding: 24px; }
                            h1 { font-size: 24px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div style="margin-bottom: 20px;">
                                <img src="https://yourdomain.com/iv1.png" alt="Iventverse Logo" style="max-width: 180px; height: auto;" />
                            </div>
                            <h1>🎉 You're on the List!</h1>
                        </div>
                        
                        <div class="content">
                            <h2>Hello ${user.fullName.split(' ')[0] || 'there'},</h2>
                            
                            <p>Thank you for joining the Iventverse waitlist! We're excited to have you on board as we prepare to launch something truly special.</p>
                            
                            <div class="highlight">
                                <p><strong>What's next?</strong> We'll keep you updated on our progress and notify you as soon as we're ready to welcome you in.</p>
                            </div>
                            
                            <p>In the meantime, here's what you can expect:</p>
                            <ul style="color: #4b5563; padding-left: 20px; margin: 0 0 24px;">
                                <li style="margin-bottom: 8px;">Early access to new features</li>
                                <li style="margin-bottom: 8px;">Exclusive updates before anyone else</li>
                                <li>Special surprises along the way</li>
                            </ul>
                            
                            <p>We're working hard to make Iventverse amazing, and we can't wait to share it with you soon!</p>
                            
                            <p>Best regards,<br>The Iventverse Team</p>
                            
                            <div class="social-links">
                                <a href="https://twitter.com/iventverse" class="social-link" target="_blank">Twitter</a> • 
                                <a href="https://instagram.com/iventverse" class="social-link" target="_blank">Instagram</a> • 
                                <a href="https://facebook.com/iventverse" class="social-link" target="_blank">Facebook</a>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} Iventverse. All rights reserved.</p>
                            <p style="font-size: 13px; color: #9ca3af; margin-top: 8px;">
                                You're receiving this email because you joined the Iventverse waitlist.<br>
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </body>
                </html>
                `,
            };
            
            console.log('Email payload:', JSON.stringify({
                ...emailData,
                html: '[HTML_CONTENT]' // Don't log the full HTML
            }, null, 2));
            
            console.log('Attempting to send email...');
            const result = await resend.emails.send(emailData);
            console.log('Resend API response:', JSON.stringify(result, null, 2));

            if (!result) {
                throw new Error('No response from email service');
            }

            if ('error' in result && result.error) {
                console.error('Failed to send welcome email:', result.error);
                return { 
                    success: false, 
                    error: result.error,
                    message: 'Failed to send welcome email',
                    emailSent: false
                };
            }
            
            // If we get here, email was sent successfully
            console.log('Welcome email sent successfully');
            return { 
                success: true, 
                data: result.data,
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error in waitlistUser:', error);
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to process your request',
            emailSent: false
        };
    }
};