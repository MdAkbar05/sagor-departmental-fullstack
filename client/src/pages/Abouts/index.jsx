import React from "react";
import mission from "./imgs/mission.svg";
import vision from "./imgs/vision.jpg";
import akbar from "./imgs/profile-akbar-hossan-web-developer-portfolio-avatar.jpg";
import rabbi from "./imgs/rabbi.jpeg";

const About = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">
        About Us
      </h1>

      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={mission}
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to provide the best products and services to our
              customers. We strive to offer high-quality products at competitive
              prices and ensure customer satisfaction through excellent service.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:order-2">
            <img
              src={vision}
              alt="Our Vision"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pr-12 md:order-1">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision is to be the leading e-commerce platform, known for our
              commitment to quality, innovation, and customer satisfaction. We
              aim to create a seamless shopping experience for our customers.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Our Team
        </h2>
        <div className="flex  lg:gap-48 md:gap-24 sm:gap-16 justify-center mx-auto items-center">
          <div className="text-center">
            <img
              src={akbar}
              alt="Akbar hossan"
              className="w-32 h-auto rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              MD. Akbar Hossan
            </h3>
            <p className="text-gray-600">MERN Stack Developer</p>
          </div>
          <div className="text-center">
            <img
              src={rabbi}
              alt="Fazle Rabbi"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Fazle Rabbi Bijoy
            </h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Contact Us
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            If you have any questions or need assistance, feel free to contact
            us:
          </p>
          <div className="text-lg text-gray-600 leading-relaxed">
            <p className="mb-2 font-semibold">
              Email:
              <a
                className="font-normal"
                href="mailto:akbar.hossan.official@gmail.com"
              >
                akbar.hossan.official@gmail.com
              </a>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span>
              <a href="tel:+8801879808105"> +8801879808105</a>
            </p>
            <p>
              <span className="font-semibold">Address:</span> Santibag #05,
              Double-Mooring, Chattagram
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
