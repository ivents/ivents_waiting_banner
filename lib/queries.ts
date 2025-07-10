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
