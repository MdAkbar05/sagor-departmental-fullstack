import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FaEnvelope, FaUser } from "react-icons/fa";
import title from "./imgs/title2.png";

const ContactForm = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bsofnsk", // Replace with your EmailJS service ID
        "template_cqd2cjx", // Replace with your EmailJS template ID
        form.current,
        "YYUEj3Vu4X1dPQkJs" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSubmitted(true);
          setError("");
          form.current.reset(); // Reset form after submission
        },
        (error) => {
          console.log(error.text);
          setError("Failed to send the message, please try again.");
        }
      );
  };

  return (
    <section className="bg-gray-50 py-12 px-4 space-y-6">
      {/* Title  */}
      <img className="sm:hidden md:flex w-fit" src={title} alt="Contact Us" />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Contact Us
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        {isSubmitted && (
          <p className="text-green-500 text-center mb-4">
            Your message has been sent successfully!
          </p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Name Field */}
        <div className="relative mb-6">
          <FaUser className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            name="user_name"
            required
            placeholder="Your Name"
            className="pl-12 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email Field */}
        <div className="relative mb-6">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
          <input
            type="email"
            name="user_email"
            required
            placeholder="Your Email"
            className="pl-12 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Message Field */}
        <div className="relative mb-6">
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Your Message"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
