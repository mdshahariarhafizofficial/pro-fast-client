import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BeRider = () => {
  const serviceCenters = useLoaderData(); // same data as send parcel
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, setValue } = useForm();

  const region = watch("region");

  const uniqueRegions = [...new Set(serviceCenters.map((item) => item.region))];
  const getWarehousesByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter((item) => item.region === region)
      .flatMap((item) => item.covered_area);
  };

  useEffect(() => {
    setValue("wirehouse", "");
  }, [region, setValue]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your rider registration request has been received.",
          confirmButtonColor: "#16a34a",
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-[20px] p-8 lg:p-16 shadow-md max-w-5xl mx-auto my-10">
      <h2 className="text-4xl font-bold text-secondary mb-4">Be a Rider</h2>
      <p className="text-gray-600 mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Age"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Region</label>
          <select
            {...register("region", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select your region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">NID No</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            className="input input-bordered w-full"
            placeholder="NID Number"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contact</label>
          <input
            type="text"
            {...register("contact", { required: true })}
            className="input input-bordered w-full"
            placeholder="Phone Number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Which wire-house you want to work?</label>
          <select
            {...register("wirehouse", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select wire-house</option>
            {getWarehousesByRegion(region).map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="bg-primary hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeRider;
