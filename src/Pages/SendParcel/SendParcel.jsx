import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [type, setType] = useState("document");

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const senderCenter = watch("senderCenter");
  const receiverCenter = watch("receiverCenter");
  const weight = parseFloat(watch("weight")) || 0;

  const uniqueRegions = [...new Set(serviceCenters.map((item) => item.region))];

  const getCentersByRegion = (region) => {
    if (!region) return [];
    const filtered = serviceCenters.filter((item) => item.region === region);
    return filtered.flatMap((item) => item.covered_area);
  };

  const isSameDistrict = senderCenter && receiverCenter && senderCenter === receiverCenter;

  // নতুন কোড: হিসাব এবং স্পষ্ট ব্রেকডাউন টেক্সট
  const calculateCostBreakdown = () => {
    let baseCost = 0;
    let extraCost = 0;
    let extraChargeOutside = 0;
    let totalCost = 0;
    let breakdown = "";

    if (type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      totalCost = baseCost;
      breakdown = "Fixed cost for document delivery.";
    } else {
      // non-document
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        if (!isSameDistrict) {
          extraChargeOutside = 40; // outside city/district extra charge for up to 3kg
        }
        totalCost = baseCost + extraChargeOutside;
        breakdown = `Base cost${!isSameDistrict ? " plus ৳40 extra charge for outside city/district." : "."}`;
      } else {
        baseCost = isSameDistrict ? 110 : 150;
        extraCost = (weight - 3) * 40;
        if (!isSameDistrict) {
          extraChargeOutside = 40;
        }
        totalCost = baseCost + extraCost + extraChargeOutside;

        breakdown = `Base cost plus ৳40 per kg for extra ${(weight - 3).toFixed(2)} kg${!isSameDistrict ? " plus ৳40 extra charge for outside city/district." : "."}`;
      }
    }

    return { baseCost, extraCost, extraChargeOutside, totalCost, breakdown };
  };

  const onSubmit = (data) => {
    const { baseCost, extraCost, extraChargeOutside, totalCost, breakdown } = calculateCostBreakdown();

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
        <div class="text-left text-base space-y-2">
          <p><strong>Parcel Type:</strong> ${type}</p>
          ${
            type === "non-document"
              ? `<p><strong>Weight:</strong> ${weight} kg</p>`
              : ""
          }
          <p><strong>Delivery Zone:</strong> ${
            isSameDistrict ? "Within Same District" : "Outside District"
          }</p>
          <hr class="my-2"/>
          <p><strong>Base Cost:</strong> ৳${baseCost.toFixed(2)}</p>
          ${
            extraCost > 0
              ? `<p><strong>Extra Charges (Weight):</strong> ৳${extraCost.toFixed(2)}</p>`
              : ""
          }
          ${
            extraChargeOutside > 0
              ? `<p><strong>Extra Charges (Outside Zone):</strong> ৳${extraChargeOutside.toFixed(2)}</p>`
              : ""
          }
          <div class="text-gray-500 text-sm">${breakdown}</div>
          <hr class="my-2"/>
          <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost.toFixed(2)}</p>
        </div>
      `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      denyButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Parcel submitted successfully!", {
          style: {
            background: "#000",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "10px",
            padding: "16px 24px",
          },
          duration: 3000,
          position: "top-center",
        });
      }
    });
  };

  React.useEffect(() => {
    setValue("senderCenter", "");
  }, [senderRegion, setValue]);

  React.useEffect(() => {
    setValue("receiverCenter", "");
  }, [receiverRegion, setValue]);

  return (
    <div className="relative">
      <div className="bg-white rounded-[20px] p-10 lg:p-20 mb-20 shadow">
        <h2 className="text-5xl text-secondary font-bold mb-8">Send Parcel</h2>
        <div className="divider"></div>
        <p className="text-gray-600 mb-8 font-bold text-2xl">Enter your parcel details</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                checked={type === "document"}
                onChange={() => setType("document")}
                className="radio checked:bg-green-500"
              />
              <span className="font-medium">Document</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                checked={type === "non-document"}
                onChange={() => setType("non-document")}
                className="radio checked:bg-green-500"
              />
              <span className="font-medium">Not-Document</span>
            </label>
          </div>

          {/* Parcel Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName", { required: true })}
                placeholder="Parcel Name"
                className="w-full input input-bordered rounded-md"
              />
            </div>
            {type === "non-document" && (
              <div>
                <label className="block font-medium mb-2">Parcel Weight (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  {...register("weight", { required: type === "non-document" })}
                  placeholder="Parcel Weight (KG)"
                  className="w-full input input-bordered rounded-md"
                />
              </div>
            )}
          </div>
          <div className="divider mb-6"></div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sender */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Sender Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Sender Name</label>
                  <input
                    type="text"
                    {...register("senderName", { required: true })}
                    placeholder="Sender Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Sender Contact No</label>
                  <input
                    type="text"
                    {...register("senderContact", { required: true })}
                    placeholder="Sender Contact No"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Your Region</label>
                  <select
                    {...register("senderRegion", { required: true })}
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
                  <label className="block font-medium mb-1">Sender Service Center</label>
                  <select
                    {...register("senderCenter", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Service Center</option>
                    {(getCentersByRegion(senderRegion) || []).map((center) => (
                      <option key={center} value={center}>
                        {center}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Address</label>
                  <input
                    type="text"
                    {...register("senderAddress", { required: true })}
                    placeholder="Address"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Pickup Instruction</label>
                  <textarea
                    {...register("pickupInstruction", { required: true })}
                    placeholder="Pickup Instruction"
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Receiver Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Receiver Name</label>
                  <input
                    type="text"
                    {...register("receiverName", { required: true })}
                    placeholder="Receiver Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Receiver Contact No</label>
                  <input
                    type="text"
                    {...register("receiverContact", { required: true })}
                    placeholder="Receiver Contact No"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Receiver Region</label>
                  <select
                    {...register("receiverRegion", { required: true })}
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
                  <label className="block font-medium mb-1">Receiver Service Center</label>
                  <select
                    {...register("receiverCenter", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Service Center</option>
                    {(getCentersByRegion(receiverRegion) || []).map((center) => (
                      <option key={center} value={center}>
                        {center}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Receiver Address</label>
                  <input
                    type="text"
                    {...register("receiverAddress", { required: true })}
                    placeholder="Address"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Delivery Instruction</label>
                  <textarea
                    {...register("deliveryInstruction", { required: true })}
                    placeholder="Delivery Instruction"
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-500">* PickUp Time 4pm–7pm Approx.</p>
          <button
            type="submit"
            className="bg-primary hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md w-full"
          >
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
