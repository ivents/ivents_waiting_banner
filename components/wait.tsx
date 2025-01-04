"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { waitlistUser } from "@/lib/queries";
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo";

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Graduation",
  "Baby Shower",
  "House Warming",
  "Christmas",
  "Valentine's Day",
  "Mother's Day",
  "Father's Day",
  "New Year",
  "Retirement"
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(2, "Invalid phone number"),
  occasions: z.array(z.string()).min(1, "Please select at least one occasion").max(3, "You can only select up to 3 occasions"),
});

type FormData = z.infer<typeof formSchema>;

export default function Component() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasions: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form submission data:', {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        occasions: data.occasions // Log occasions array before submission
      });
  
      await waitlistUser({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        ocassions: data.occasions.join(', ') // Join array into string for DB
      });
  
      console.log('Submission successful');
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-center md:justify-start ">
        <Image
          src="/ivent.png"
          alt="IventVerse Logo"
          width={150}
          height={150}
          className="w-auto h-96 w-96 md:h-52 md:-m-5 -mt-16 md:px-5"
        />
      </div>
      <main className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">       
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="">
              <AnimatedTestimonialsDemo/>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center md:text-left md:-mt-32">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-2 text-base text-gray-400"
              >
                IventVerse
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-12 text-4xl font-medium"
              >
                Bringing Events closer to you
                <br />{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Join The Waitlist!
                </span>
              </motion.h1>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative">
                  <Input
                    className="h-12 rounded-lg border-gray-800 bg-[#111] pl-10 text-gray-300"
                    placeholder="Full name..."
                    {...register("fullName")}
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    className="h-12 rounded-lg border-gray-800 bg-[#111] pl-10 text-gray-300"
                    placeholder="Email address..."
                    {...register("email")}
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="16" rx="2" width="20" x="2" y="4" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    className="h-12 rounded-lg border-gray-800 bg-[#111] pl-10 text-gray-300"
                    placeholder="Phone number..."
                    {...register("phoneNumber")}
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Controller
                    name="occasions"
                    control={control}
                    render={({ field }) => (
                      <div>
                
                        <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full h-12 rounded-lg border-gray-800 bg-[#111] pl-10 text-left text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          {field.value.length === 0 ? (
                            <span className="text-gray-400">What type of events are you interested in? (max 3)...</span>
                          ) : (
                            field.value.join(", ")
                          )}
                        </button>
                        <svg
                          className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        {isOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-[#111] border border-gray-700 rounded-md shadow-lg">
                            <ul className="py-1 max-h-60 overflow-auto">
                            {occasions.map((occasion) => ( // Changed variable name from occasions to occasion
  <li
    key={occasion}
    className={`px-4 py-2 cursor-pointer ${
      field.value.includes(occasion)
        ? "bg-gray-700 text-white"
        : "text-gray-200 hover:bg-gray-700"
    }`}
    onClick={() => {
      const updatedValue = field.value.includes(occasion)
        ? field.value.filter((item) => item !== occasion)
        : field.value.length < 3
        ? [...field.value, occasion]
        : field.value;
      
      console.log('Selected occasions:', updatedValue); // Log updated occasions
      field.onChange(updatedValue);
    }}
  >
    {occasion}
  </li>
))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  />
                  {errors.occasions && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.occasions.message}
                    </p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-[#111] hover:bg-[#222] hover:text-purple-400"
                    variant="outline"
                  >
                    <span className="flex-1">Join the waitlist</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex justify-center md:justify-start gap-8"
              >
                <Link
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300"
                  href="https://x.com/iventverse"
                  target="_blank"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter</span>
                </Link>

                <Link
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300"
                  href="https://www.instagram.com/iventverse?igsh=eTluMmszOTgybDJo"
                  target="_blank"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2 a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                    />
                  </svg>
                  <span>Instagram</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
              <div className="flex justify-center">
  <Link
    href="/about"
    className="text-sm text-gray-400 hover:text-gray-300"
  >
    Learn More About Us
  </Link>
</div>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className=" text-center">
        <p className="text-sm bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">A product of <span className="hover:underline hover:text-white"><a href="https://mecurixtech.com/">Mecurixtech</a></span></p>
      </footer>

      <AnimatePresence>
        {isSubmitted && (
          <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
            <DialogContent className="sm:max-w-[425px] bg-[#111] text-white">
              <DialogHeader>
                <DialogTitle>Waitlist Submitted</DialogTitle>
              </DialogHeader>
              <p>Thank you for joining our waitlist! We'll be in touch soon.</p>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

