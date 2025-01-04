"use server";

import { client } from "./db";

type User = {
    fullName: string;
    email: string;
    phoneNumber: string;
    ocassions: string

};

type Response ={
    occasions: string;
}

export const waitlistUser = async (user: User) => {
    // Validate input
    if (!user || !user.fullName || !user.email || !user.phoneNumber) {
        throw new Error("Invalid user payload: All fields are required");
    }

    try {
        // Save user data
        const userResponse = await client.user.create({
            data: {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                ocassions: user.ocassions
               
            },
        });

        // Ensure response is valid
        if (!userResponse) {
            throw new Error("No response received from database");
        }

        console.log('User created successfully:', userResponse); // Log success
        return userResponse; // Return the created user data

       
    } catch (error) {
        // Comprehensive error handling
        if (error instanceof Error) {
            console.error("Error creating user:", error.message);
            throw error; // Re-throw to allow the caller to handle
        } else {
            console.error("Unknown error occurred:", error);
            throw new Error("Failed to create user");
        }
    }
};
