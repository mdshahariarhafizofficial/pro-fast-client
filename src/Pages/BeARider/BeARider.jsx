import React from "react";

const BeARider = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8] px-4 py-10 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-10 w-full max-w-6xl shadow-md">
        {/* Title Section */}
        <h2 className="text-4xl font-bold text-[#043927] mb-2">Be a Rider</h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <hr className="mb-10" />

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form Section */}
          <form className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#043927] mb-4">Tell us about yourself</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
              <input type="number" placeholder="Your age" className="input input-bordered w-full" />

              <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
              <select className="select select-bordered w-full">
                <option>Select your region</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
              </select>

              <input type="text" placeholder="NID" className="input input-bordered w-full" />
              <input type="text" placeholder="Contact" className="input input-bordered w-full" />

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Which wire-house you want to work?
                </label>
                <select className="select select-bordered w-full">
                  <option>Select wire-house</option>
                  <option>Warehouse 1</option>
                  <option>Warehouse 2</option>
                </select>
              </div>
            </div>

            <button type="submit" className="bg-lime-400 hover:bg-lime-500 text-white font-semibold px-6 py-3 rounded-md w-full transition-all">
              Submit
            </button>
          </form>

          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src="https://i.ibb.co/HnfbhFn/rider.png" // Use your hosted image or local path
              alt="Rider"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
