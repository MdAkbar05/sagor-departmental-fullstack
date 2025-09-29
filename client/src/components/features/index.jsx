import React from "react";
import star from "./imgs/star.svg";
import shipping from "./imgs/shipping.svg";
import verified from "./imgs/verified.svg";
import done from "./imgs/done.svg";

import lineText from "./imgs/lineText.png";

const Features = () => {
  const features = [
    {
      icon: star,
      feature: "Top Rank Farms",
      desc: " farm-fresh produce to bring quality and health to your family's table, every day.",
    },
    {
      icon: verified,
      feature: "Organic Certified",
      desc: "Guaranteed pure, naturally grown products for a healthier, chemical-free lifestyle.",
    },
    {
      icon: shipping,
      feature: "Fast Delivery",
      desc: "Fresh groceries at your doorstep in no time, ensuring convenience without the wait!",
    },
    {
      icon: done,
      feature: "Trusted Products",
      desc: "Handpicked, high-quality items you can rely on for your family's well-being.",
    },
  ];

  return (
    <section className="bg-white py-16 mt-8 ">
      <img
        className="sm:hidden md:flex w-fit"
        src={lineText}
        alt="When Health is Organic"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        When Health is Organic
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />
      {/* Features Flexbox */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:flex-row flex-wrap gap-8 sm:gap-2 mt-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-2 lg:p-4  transform transition duration-300 hover:scale-105 cursor-pointer flex-wrap "
          >
            <div className="mb-4">
              <img src={feature.icon} alt="icon" />
            </div>
            <h3 className="text-lg font-medium text-black">
              {feature.feature}
            </h3>
            <p className="text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
