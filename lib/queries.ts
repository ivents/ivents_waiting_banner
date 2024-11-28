"use server"

import { client } from "./db"

type User = {
    fullName: string;
    email: string;
    phoneNumber: string
}

export const waitlistUser = async (user: User) => {
    // Validate input first
    if (!user || !user.fullName || !user.email || !user.phoneNumber) {
        throw new Error('Invalid user payload: All fields are required');
    }

    try {
        const response = await client.user.create({
            data: {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }
        });

        if (!response) {
            throw new Error('No response received from database');
        }

        return response;
    } catch (error) {
        // More comprehensive error handling
        if (error instanceof Error) {
            console.error('Error creating user:', error.message);
            throw error; // Re-throw to allow caller to handle
        } else {
            console.error('Unknown error occurred:', error);
            throw new Error('Failed to create user');
        }
    }
}