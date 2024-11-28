import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-4xl px-4 py-20">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">About IventVerse</h1>
        
        <div className="space-y-6 text-gray-300">
          <p>
            IventVerse is revolutionizing the way people experience events. Our platform brings events closer to you, 
            making it easier than ever to discover, attend, and enjoy a wide range of experiences.
          </p>
          
          <p>
            Founded by a team of passionate event enthusiasts and tech innovators, IventVerse aims to bridge the gap 
            between event organizers and attendees. We believe that everyone should have access to exciting events 
            that match their interests, regardless of where they are.
          </p>
          
          <p>
            Our mission is to create a vibrant community where event discovery is effortless, ticket purchasing is 
            seamless, and event experiences are unforgettable. Whether you're into music concerts, art exhibitions, 
            tech conferences, or local community gatherings, IventVerse has something for everyone.
          </p>
          
          <p>
            We're constantly innovating and improving our platform to provide the best possible experience for both 
            event organizers and attendees. Join us on this exciting journey as we reshape the event industry and 
            bring people together through shared experiences.
          </p>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-300 mb-6">
            IventVerse is brought to you by a dedicated team of professionals with diverse backgrounds in event 
            management, technology, and customer experience. We're united by our passion for creating meaningful 
            connections through events.
          </p>
          {/* You can add team member details here if desired */}
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            Have questions or suggestions? We'd love to hear from you! Reach out to us at{' '}
            <a href="mailto:Iventverse@gmail.com" className="text-blue-400 hover:underline">Iventverse@gmail.com</a>

          </p>
        </div>
      </main>
    </div>
  )
}