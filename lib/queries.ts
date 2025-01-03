"use server";

import { client } from "./db";

type User = {
    fullName: string;
    email: string;
    phoneNumber: string;
};

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
            },
        });

        // Ensure response is valid
        if (!userResponse) {
            throw new Error("No response received from database");
        }

        // Optional: Save additional data if needed
        const occasions = "example occasions data"; // Define `occasions` properly
        try {
            const occasionsResponse = await client.response.create({
                data: {
                    occasions, // Save `occasions` in the database
                },
            });

            return { success: true, data: { userResponse, occasionsResponse } };
        } catch (error) {
            console.error("Failed to save occasions:", error);
            return { success: false, error: "Failed to save occasions" };
        }
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
