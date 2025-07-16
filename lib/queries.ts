"use server";

import { client } from "./db";

type User = {
    fullName: string;
    email: string;
    phoneNumber: string;
    occasions: string
};

export const waitlistUser = async (user: User) => {
    if (!user || !user.fullName || !user.email || !user.phoneNumber) {
        throw new Error("Invalid user payload: All fields are required");
    }

    try {
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
            throw new Error("No response received from database");
        }

        console.log('User created successfully:', userResponse);

        // Then, send welcome email
        try {
            const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: user.fullName,
                    email: user.email
                })
            });

            if (!emailResponse.ok) {
                const errorData = await emailResponse.json();
                console.error('Email sending failed:', errorData);
                // Don't fail the entire operation if email fails
            } else {
                console.log('Welcome email sent successfully');
            }
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Continue even if email sending fails
        }

        return userResponse;

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating user:", error.message);
            throw error;
        } else {
            console.error("Unknown error occurred:", error);
            throw new Error("Failed to create user");
        }
    }
};
