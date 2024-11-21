'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { waitlistUser } from '@/lib/queries'

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(2, 'Invalid phone number'),
})

type FormData = z.infer<typeof formSchema>

export default function Component() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    await waitlistUser(data)
    console.log(data)
    setIsSubmitted(true)
    reset()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <Image
              src="/placeholder.svg?height=600&width=600"
              alt="IventVerse"
              width={600}
              height={600}
              className="rounded-lg"
            /> */}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center md:text-left">
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
                <br />
                {" "}
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
                    {...register('fullName')}
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
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="relative">
                  <Input
                    className="h-12 rounded-lg border-gray-800 bg-[#111] pl-10 text-gray-300"
                    placeholder="Email address..."
                    {...register('email')}
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
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="relative">
                  <Input
                    className="h-12 rounded-lg border-gray-800 bg-[#111] pl-10 text-gray-300"
                    placeholder="Phone number..."
                    {...register('phoneNumber')}
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
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" className="h-12 w-full rounded-lg bg-[#111] hover:bg-[#222]" variant="outline">
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
                  href="https://twitter.com/gyreapp"
                  target="_blank"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter</span>
                </Link>
                <Link
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300"
                  href="https://medium.com/@gyreapp"
                  target="_blank"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                  <span>Medium</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <Link href="/about" className="text-sm text-gray-400 hover:text-gray-300">
                  Learn More About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className='mt-36 text-center'>
        <p className='text-sm'>A product of mecuritech</p>
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
  )
}