import { AnimatedTestimonials } from "./animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "",
      name: "",
      designation: "",
      src: "/Community.png",
    },
    {
      quote:
        "",
      name: "",
      designation: "",
      src: "/details.png",
    },
    {
      quote:
        "",
      name: "",
      designation: "",
      src: "/Homepage.png",
    },
    
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
