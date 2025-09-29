import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import title from "./imgs/title.png";

const Maps = () => {
  return (
    <section className="bg-gray-50 py-16 space-y-6">
      {/* Title  */}
      <img
        className="sm:hidden md:flex w-fit"
        src={title}
        alt="Locate Our Store"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Locate Our Store
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />

      {/* Google Map Embed */}
      <div className="flex justify-center items-center">
        <iframe
          title="Google Map Location"
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3339.7666712425826!2d91.79612597475025!3d22.33238314173271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9eefe5d9e85%3A0x18272115f4ce1e10!2sSagor%20Store!5e1!3m2!1sen!2sus!4v1727888606770!5m2!1sen!2sus"
          className="rounded-md shadow-lg"
        ></iframe>
      </div>
    </section>
  );
};

export default Maps;
