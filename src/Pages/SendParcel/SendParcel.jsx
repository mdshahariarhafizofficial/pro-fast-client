import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const { register, handleSubmit } = useForm();
  const [type, setType] = useState("document");

  const onSubmit = (data) => {
    const cost = type === "document" ? 100 : 120 + (parseFloat(data.weight || 0) * 10);
    alert(`Estimated Cost: ৳${cost}`);
  };

  return (
    <div className="bg-white rounded-[20px] p-10 lg:p-20 mb-20 shadow">
      <h2 className="text-5xl text-secondary font-bold mb-8">Send Parcel</h2>
        <p className="text-gray-600 mb-8 font-bold text-2xl">Enter your parcel details</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" value="document" checked={type === "document"} onChange={() => setType("document")} className="radio checked:bg-green-500" />
            <span className="font-medium">Document</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="non-document" checked={type === "non-document"} onChange={() => setType("non-document")} className="radio checked:bg-green-500" />
            <span className="font-medium">Not-Document</span>
          </label>
        </div>    

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Parcel Name</label>
            <input type="text" {...register("parcelName", { required: true })} placeholder="Parcel Name" className="w-full input input-bordered rounded-md" />
          </div>
          {type === "non-document" && (
            <div>
              <label className="block font-medium mb-2">Parcel Weight (KG)</label>
              <input type="number" step="0.1" {...register("weight")} placeholder="Parcel Weight (KG)" className="w-full input input-bordered rounded-md" />
            </div>
          )}
        </div>
        <div className="divider mb-6"></div>
        {/* Sender & Receiver */}
        {/* Sender & Receiver */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Sender Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Sender Name</label>
                <input type="text" defaultValue="Sender Name" readOnly className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Sender Pickup Wire house</label>
                <select {...register("senderCenter", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Wire house</option>
                  <option>Uttara</option>
                  <option>Dhanmondi</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Address</label>
                <input type="text" {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Sender Contact No</label>
                <input type="text" {...register("senderContact", { required: true })} placeholder="Sender Contact No" className="input input-bordered w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Your Region</label>
                <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                  <option value="">Select your region</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Pickup Instruction</label>
                <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full"></textarea>
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Receiver Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Receiver Name</label>
                <input type="text" {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Receiver Delivery Wire house</label>
                <select {...register("receiverCenter", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Wire house</option>
                  <option>Mirpur</option>
                  <option>Mohammadpur</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Receiver Address</label>
                <input type="text" {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Receiver Contact No</label>
                <input type="text" {...register("receiverContact", { required: true })} placeholder="Receiver Contact No" className="input input-bordered w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Receiver Region</label>
                <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                  <option value="">Select your region</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Delivery Instruction</label>
                <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500">* PickUp Time 4pm–7pm Approx.</p>
        <button type="submit" className="bg-primary hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md w-full">Proceed to Confirm Booking</button>
      </form>
    </div>
  );
};

export default SendParcel;
