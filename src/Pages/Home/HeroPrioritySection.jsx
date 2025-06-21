import React from "react";
import BgImage from "../../assets/banner/banner4.png"; // Full background image with illustration

export default function HeroPrioritySection() {
  return (
    <div
      className="no-repeat bg-cover rounded-[2rem] my-10 mx-4 lg:mx-24 py-10"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="p-8 md:p-12 text-white rounded-[2rem]">
        <div className="max-w-xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Merchant and Customer Satisfaction <br /> is Our First Priority
          </h2>
          <p className="text-sm md:text-base text-gray-200">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="btn btn-primary text-black font-semibold rounded-full px-6 hover:scale-105 transition">
              Become a Merchant
            </button>
            <button className="btn btn-outline border border-primary text-primary font-semibold rounded-full px-6 hover:bg-[#caff00]/10 transition">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
