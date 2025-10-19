import React, { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface NGO {
  id: number;
  name: string;
  logo: string;
  description: string;
}

const ngos: NGO[] = [
  { id: 1, name: "Hope Foundation", logo: "/assets/ngo1.png", description: "Providing education to children in rural areas."},
  { id: 2, name: "Bright Future", logo: "/assets/ngo2.png", description: "Empowering girls through tech literacy." },
  { id: 3, name: "Hope Foundation", logo: "/assets/ngo3.png", description: "Providing education to children in rural areas." },
  { id: 4, name: "Bright Future", logo: "/assets/ngo4.png", description: "Empowering girls through tech literacy." },
  { id: 5, name: "Hope Foundation", logo: "/assets/ngo5.png", description: "Providing education to children in rural areas." },
  // add more
];

const volunteers = [
  { id: 1, name: "Aditi Sharma", image: "/assets/mentor1.png" },
  { id: 2, name: "Rahul Verma", image: "/assets/mentor2.png" },
  { id: 3, name: "Aditi Sharma", image: "/assets/mentor3.png" },
  { id: 4, name: "Rahul Verma", image: "/assets/mentor4.png" },
  { id: 5, name: "Aditi Sharma", image: "/assets/mentor5.png" },
  // add more
];

const testimonials = [
  { id: 1, name: "Ravi", text: "Before this program, I felt lost and unsure of my career path. Thanks to the amazing mentor I was paired with, I gained clarity and confidence, completely changing my professional trajectory for the better. This program truly opened new doors for me." },
  { id: 2, name: "Ananya", text: "I can honestly say that participating in this program was a turning point. My mentor didn't just offer advice; they provided unwavering support and a fresh perspective that helped me overcome significant personal and professional challenges. I'm incredibly grateful for the experience and the lasting impact it had on my life." },
  { id: 2, name: "Ananya", text: "The guidance I received through this program was invaluable. My mentor helped me identify my strengths and weaknesses, setting me on a clear path towards achieving my goals. It wasn't just about professional development; it was about holistic growth that truly transformed my outlook on my future." },
  { id: 2, name: "Ananya", text: "I was struggling to gain traction in my new venture until I joined this program. My mentor, with their wealth of experience, provided practical strategies and much-needed encouragement, which propelled me forward. This program didn't just change my life, it empowered me to achieve dreams I thought were out of reach." },
  { id: 2, name: "Ananya", text: "Finding a mentor through this program was one of the best decisions I've ever made. Their wisdom and insights were instrumental in navigating complex situations and making informed choices. I now feel equipped and inspired to tackle any challenge, all thanks to the incredible support system provided by this initiative." },
  { id: 1, name: "Ravi", text: "Before this program, I felt lost and unsure of my career path. Thanks to the amazing mentor I was paired with, I gained clarity and confidence, completely changing my professional trajectory for the better. This program truly opened new doors for me." },
];

const LandingPage: React.FC = () => {
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    className: "sliders",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-white text-primary min-h-screen flex flex-col">
      {/* Hero Slider */}
      <section className="relative">
        <Slider {...sliderSettings}>
                <div className="relative w-full h-[80vh]">
                  <img src="/assets/slide1.jpg" alt={`Slide 1`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      Mentorship Matters
                    </h1>
                    <h3 className="w-[60vw] mt-12 text-white text-xl md:text-2xl text-center">
                      Through dedicated mentors, we guide underprivileged students with personalized lessons, online workshops, and one-on-one sessions. Our mentors inspire curiosity, build confidence, and provide the support students need to succeed academically and personally.
                    </h3>
                  </div>
                </div>
                <div className="relative h-[80vh]">
                  <img src="/assets/slide2.jpg" alt={`Slide 2`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      Students Growing
                    </h1>
                    <h3 className="w-[60vw] mt-12 text-white text-xl md:text-2xl text-center">
                      Our students are showing remarkable progress, gaining knowledge, developing critical thinking, and achieving higher grades. With encouragement and guidance, they become more confident, engaged, and ready to embrace new learning opportunities every day.
                    </h3>
                  </div>
                </div>
                <div className="relative h-[80vh]">
                  <img src="/assets/slide3.jpg" alt={`Slide 3`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      Donating Knowledge
                    </h1>
                    <h3 className="w-[60vw] mt-12 text-white text-xl md:text-2xl text-center">
                      We provide essential books and learning materials to students, ensuring access to quality resources. By donating books regularly, we help foster literacy, curiosity, and a lifelong love for learning in every child.
                    </h3>
                  </div>
                </div>
        </Slider>
      </section>

      {/* About */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4 text-primary">Our Aim</h2>
        <p className="text-lg text-gray-600">
          We are a dedicated platform that bridges the gap between NGOs, mentors, and donors to uplift underprivileged students. By connecting passionate mentors with eager learners, we ensure every child receives the guidance and support needed to unlock their true potential. Through our collaboration with NGOs and generous donors, we create meaningful opportunities that not only enhance education but also foster long-term empowerment and growth for students in need.
        </p>
      </section>

      {/* Impact */}
      <section className="bg-blue-50 py-16">
        <h2 className="text-4xl font-extrabold mb-4 text-primary pb-6 text-center">Our Impact</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Students Reached", value: "8,500+" },
            { label: "NGOs Connected", value: "120+" },
            { label: "Mentors Engaged", value: "300+" },
            { label: "Projects Supported", value: "95+" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 bg-blue-200 rounded-lg shadow-md">
              <h3 className="text-3xl font-extrabold text-secondary">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NGOs */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-extrabold text-center mb-8">Our Partner NGOs</h2>
        <Slider {...carouselSettings}>
          {ngos.map((ngo) => (
            <div key={ngo.id} className="p-4">
              <div
                onClick={() => setSelectedNGO(ngo)}
                className="cursor-pointer bg-blue-100 shadow-md rounded-lg h-60 p-4 text-center hover:shadow-xl transition"
              >
                <img src={ngo.logo} alt={ngo.name} className="h-24 mx-auto mb-4 rounded-full shadow-lg object-contain" />
                <h3 className="text-lg font-semibold">{ngo.name}</h3>
                <p className="text-gray-600 mb-4">{ngo.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* NGO Popup */}
      <AnimatePresence>
        {selectedNGO && (
          <motion.div
            className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 pb-4 rounded-xl max-w-lg w-full text-center shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <img src={selectedNGO.logo} alt={selectedNGO.name} className="h-24 mx-auto mb-4 rounded-full object-contain" />
              <h3 className="text-2xl font-extrabold mb-2">{selectedNGO.name}</h3>
              <p className="text-gray-600 mb-4">{selectedNGO.description}</p>
              <button
                onClick={() => setSelectedNGO(null)}
                className="bg-blue-300 shadow-md text-black font-medium px-6 py-2 rounded-md hover:bg-blue-500 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volunteers */}
      <section className="py-16 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Verified Volunteers</h2>
        <Slider {...carouselSettings}>
          {volunteers.map((v) => (
            <div key={v.id} className="p-4">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img src={v.image} alt={v.name} className="h-24 w-24 mx-auto rounded-full object-cover mb-4" />
                <h3 className="font-semibold text-lg">{v.name}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-blue-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">“{t.text}”</p>
              <p className="mt-4 text-secondary font-semibold">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-primary text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
        <p className="mb-6">Join hands with us to make education accessible for everyone.</p>
        <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-secondary hover:text-white transition">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
