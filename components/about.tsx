import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-red-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
            About IventVerse
          </h1>

          <section className="space-y-8 text-gray-300">
            <p className="text-lg leading-relaxed">
              Welcome to Iventverse, where the future of events meets the vibrant
              energy of culture and technology. We are more than just a platform—we
              are a movement redefining how events are planned, executed, and
              experienced. At Iventverse, we're reshaping the event landscape by
              connecting organizers, vendors, attendees, artists, and communities,
              all in one seamless and engaging ecosystem.
            </p>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">Who We Are</h2>
              <p>
                We are dreamers, innovators, and creators who believe in the
                transformative power of events. Iventverse is built by a team of
                forward-thinkers passionate about merging technology with the rich,
                dynamic culture of Africa. Whether it's a music festival, a
                corporate conference, or a local celebration, we're here to empower
                every stakeholder with the tools they need to thrive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">Our Mission</h2>
              <p>
                Our mission is bold but simple: to revolutionize the event industry
                by delivering a unified platform that celebrates collaboration,
                innovation, and the richness of African heritage. We're here to
                empower event organizers, uplift local vendors, amplify the voices
                of artists, and create extraordinary experiences for attendees—all
                while ensuring a smooth, efficient, and secure process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">Our Vision</h2>
              <p>
                We envision a world where every event is not just a gathering but a
                transformative story. A world where technology and culture meet to
                inspire creativity, forge connections, and celebrate diversity.
                Iventverse is here to set a new global standard for event
                management, putting Africa's vibrancy at the forefront of the
                experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">What We Do</h2>
              <p className="mb-4">At Iventverse, we bring the entire event ecosystem together:</p>
              
              <ul className="space-y-4 list-none pl-0">
                <li className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-red-400 mb-1">For Organizers</h3>
                  <p>Powerful tools that simplify planning, ticketing, vendor management, and marketing so you can focus on delivering unforgettable experiences.</p>
                </li>
                <li className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-red-400 mb-1">For Vendors</h3>
                  <p>A marketplace to showcase your products and services and seamlessly connect with event planners.</p>
                </li>
                <li className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-red-400 mb-1">For Artists</h3>
                  <p>A platform to shine, connect, and showcase your creativity to a global audience.</p>
                </li>
                <li className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-red-400 mb-1">For Attendees</h3>
                  <p>An intuitive hub to discover, book, and engage with events tailored just for you.</p>
                </li>
                <li className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-red-400 mb-1">For Communities</h3>
                  <p>A platform to unite, celebrate, and tell stories through culturally rich events.</p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">Why We Exist</h2>
              <p>
                The event industry, especially in Africa, is brimming with potential
                but hindered by inefficiencies, disconnections, and outdated
                processes. Organizers face logistical nightmares, vendors struggle
                to secure opportunities, and attendees often miss out on events due
                to poor communication. Iventverse exists to flip this script. We're
                here to simplify, streamline, and celebrate events—ensuring everyone
                has a seat at the table.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">How We Do It</h2>
              <ul className="space-y-4 list-disc pl-5">
                <li>
                  <span className="font-medium">Technology Meets Simplicity:</span> From AI-driven event
                  recommendations to in-app wallets and fraud prevention systems,
                  our tools redefine convenience.
                </li>
                <li>
                  <span className="font-medium">Cultural Pride:</span> Iventverse shines a spotlight on Africa's
                  rich traditions and festivals, seamlessly blending them with
                  global trends.
                </li>
                <li>
                  <span className="font-medium">Collaboration Redefined:</span> We connect everyone involved in
                  events—from the organizer to the attendee—through transparency
                  and trust.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">Our Commitment</h2>
              <p className="mb-4">
                We don't just build tools; we build connections, memories, and
                transformative experiences. At Iventverse, we're passionate about:
              </p>
              <ul className="space-y-2 list-disc pl-5 mb-6">
                <li>Honoring African heritage through diverse events.</li>
                <li>Creating a fraud-free, safe ecosystem for all users.</li>
                <li>Delivering personalized and innovative experiences that leave lasting impressions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-ivent">Our Core Values</h2>
              <ul className="space-y-3 list-disc pl-5">
                <li><span className="font-medium">Innovation:</span> Redefining how events are planned and experienced.</li>
                <li><span className="font-medium">Culture:</span> Celebrating the heartbeat of African traditions while embracing global trends.</li>
                <li><span className="font-medium">Inclusion:</span> Ensuring every voice is heard, and every role is valued.</li>
                <li><span className="font-medium">Collaboration:</span> Building partnerships that foster growth and creativity.</li>
                <li><span className="font-medium">Excellence:</span> Delivering top-tier services at every step.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-ivent">The Future of Events</h2>
              <p>
                Iventverse is not just a platform; it's a movement. Imagine a world
                where attending an event feels as seamless as scrolling through your
                phone. A world where vendors are celebrated, artists are elevated,
                and attendees are immersed in unforgettable moments. From bustling
                city concerts to intimate cultural festivals, Iventverse is here to
                ensure every event becomes a story worth sharing.
              </p>
              <p className="text-xl font-medium text-red-400">
                Step into the Iventverse. Let's create, celebrate, and elevate together.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-ivent">Our Team</h2>
              <p className="text-gray-300 mb-6">
                IventVerse is brought to you by MECURIXTECH team. Professionals with
                diverse backgrounds in technology and customer experience. We're
                united by our passion for creating meaningful connections
                through technology.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-ivent">Contact Us</h2>
              <p className="text-gray-300">
                Have questions or suggestions? We'd love to hear from you! Reach out
                to us at{" "}
                <a
                  href="mailto:Iventverse@gmail.com"
                  className="text-red-400 hover:underline hover:text-red-300 transition-colors"
                >
                  Iventverse@gmail.com
                </a>
              </p>
            </section>
          </section> 
        </article>
      </main>
    </div>
  );
};

export default AboutPage;
