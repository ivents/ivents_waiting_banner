import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-4xl px-4 py-20">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">About IventVerse</h1>

        <div className="space-y-6 text-gray-300">
          <p>
            Welcome to Iventverse, where the future of events meets the vibrant
            energy of culture and technology. We are more than just a
            platform—we are a movement. On how events are planned, executed, and
            experienced. At Iventverse, we’re reshaping the event landscape by
            connecting organizers, vendors, attendees, artists, and communities,
            all in one seamless and engaging ecosystem.
          </p>
          <p className="font-bold">Who We Are</p>
          <p>
            We are dreamers, innovators, and creators who believe in the
            transformative power of events. Iventverse is built by a team of
            forward-thinkers passionate about merging technology with the rich,
            dynamic culture of Africa. Whether it's a music festival, a
            corporate conference, or a local celebration, we’re here to empower
            every stakeholder with the tools they need to thrive.
          </p>

          <p className="font-bold">Our Mission</p>

          <p>
            Our mission is bold but simple: to revolutionize the event industry
            by delivering a unified platform that celebrates collaboration,
            innovation, and the richness of African heritage. We’re here to
            empower event organizers, uplift local vendors, amplify the voices
            of artists, and create extraordinary experiences for attendees—all
            while ensuring a smooth, efficient, and secure process.
          </p>
          <p className="font-bold">Our Vision</p>
          <p>
            We envision a world where every event is not just a gathering but a
            transformative story. A world where technology and culture meet to
            inspire creativity, forge connections, and celebrate diversity.
            Iventverse is here to set a new global standard for event
            management, putting Africa's vibrancy at the forefront of the
            experience.
          </p>
          <p className="font-bold">What We Do</p>
          <p>
            At Iventverse, we bring the entire event ecosystem together:</p>
            <p > <span className="font-bold">For Organizers:</span> Tools that simplify planning, ticketing, vendor
            management, and marketing so you can focus on delivering
            unforgettable experiences.
            <p>
             <span className="font-bold"> For Vendors:</span> A marketplace to showcase your products and services
              and seamlessly connect with event planners.
            </p>
            <p>
              <span className="font-bold">For Artists:</span> A platform to shine, connect, and showcase your
              creativity to a global audience.
            </p>
            <p>
             <span className="font-bold"> For Attendees:</span> An intuitive hub to discover, book, and engage with

              events tailored just for you.
            </p>
            <p>
            <span className="font-bold"> For Communities:</span> A platform to unite, celebrate, and tell stories
              through culturally rich events.
            </p>
          </p>

          <p className="font-bold">Why We Exist </p>
          <p>
            The event industry, especially in Africa, is brimming with potential
            but hindered by inefficiencies, disconnections, and outdated
            processes. Organizers face logistical nightmares, vendors struggle
            to secure opportunities, and attendees often miss out on events due
            to poor communication. Iventverse exists to flip this script. We’re
            here to simplify, streamline, and celebrate events—ensuring everyone
            has a seat at the table.
          </p>
          <p><span className="font-bold">
            How We Do It

          </span>
            <ul>
              <li>
                1. Technology Meets Simplicity: From AI-driven event
                recommendations to in-app wallets and fraud prevention systems,
                our tools redefine convenience.
              </li>
              <li>
                2. Cultural Pride: Iventverse shines a spotlight on Africa’s
                rich traditions and festivals, seamlessly blending them with
                global trends.
              </li>
              <li>
                3. Collaboration Redefined: We connect everyone involved in
                events—from the organizer to the attendee—through transparency
                and trust.
              </li>
            </ul>
          </p>
          <p className="font-bold">Our Commitment</p>
          <p>
            We don’t just build tools; we build connections, memories, and
            transformative experiences. At Iventverse, we’re passionate about:
          </p>
          <p>
            Honoring African heritage through diverse events.
            <p>
Creating a fraud-free, safe ecosystem for all users.
</p>
            <p>
Delivering personalized and innovative experiences that leave lasting impressions.
</p>
          </p>
          <p className="font-bold">Our Core Values
          </p>
          <p>Innovation: Redefining how events are planned and experienced.
          </p>
          <p>Culture: Celebrating the heartbeat of African traditions while embracing global trends.
          </p>
          <p>Inclusion: Ensuring every voice is heard, and every role is valued.
          </p>
          <p>
          Collaboration: Building partnerships that foster growth and creativity.

          </p>
          <p>Excellence: Delivering top-tier services at every step.</p>

<p className="font-bold">The Future of Events
</p>
<p>Iventverse is not just a platform; it’s a movement. Imagine a world where attending an event feels as seamless as scrolling through your phone. A world where vendors are celebrated, artists are elevated, and attendees are immersed in unforgettable moments. From bustling city concerts to intimate cultural festivals, Iventverse is here to ensure every event becomes a story worth sharing.
</p>
<p>Step into the Iventverse. Let’s create, celebrate, and elevate together.</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-300 mb-6">
            IventVerse is brought to you by a dedicated team of professionals
            with diverse backgrounds in event management, technology, and
            customer experience. We're united by our passion for creating
            meaningful connections through events.
          </p>
          {/* You can add team member details here if desired */}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            Have questions or suggestions? We'd love to hear from you! Reach out
            to us at{" "}
            <a
              href="mailto:Iventverse@gmail.com"
              className="text-blue-400 hover:underline"
            >
              Iventverse@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
