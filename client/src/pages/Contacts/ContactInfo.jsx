import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import title from "./imgs/title.png";

const ContactInformation = () => {
  const contactDetails = [
    {
      icon: <FaPhone size={36} className="text-primary mx-auto mb-4" />,
      title: "Phone",
      info: "+8801879808105",
    },
    {
      icon: <FaEnvelope size={36} className="text-primary mx-auto mb-4" />,
      title: "Email",
      info: "support@sagor.com",
    },
    {
      icon: <FaMapMarkerAlt size={36} className="text-primary mx-auto mb-4" />,
      title: "Address",
      info: "Santibag #05, Halishahar, Chittagong, Bangladesh",
    },
  ];

  return (
    <section className="bg-white mt-4 py-12 space-y-6">
      {/* Title  */}
      <img
        className="sm:hidden md:flex w-fit"
        src={title}
        alt="Contact Information"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Contact Information
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactDetails.map((detail, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-primary transform hover:scale-105 transition-transform duration-300"
          >
            {detail.icon}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {detail.title}
            </h3>
            <p className="text-lg text-gray-600">{detail.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInformation;
