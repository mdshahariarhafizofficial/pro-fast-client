import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [type, setType] = useState("document");

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const senderCenter = watch("senderCenter");
  const receiverCenter = watch("receiverCenter");
  const weight = parseFloat(watch("weight")) || 0;

  const uniqueRegions = [...new Set(serviceCenters.map(item => item.region))];
  const getCentersByRegion = region => region ? serviceCenters.filter(i => i.region === region).flatMap(i => i.covered_area) : [];

  const isSameDistrict = senderCenter && receiverCenter && senderCenter === receiverCenter;

  const calculateCostBreakdown = () => {
    let baseCost = 0, extraCost = 0, extraChargeOutside = 0, totalCost = 0;
    let breakdown = "";

    if (type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = "Fixed cost for document delivery.";
    } else {
      baseCost = isSameDistrict ? 110 : 150;
      if (weight > 3) extraCost = (weight - 3) * 40;
      breakdown = `Base cost${ weight > 3 ? ` plus ৳40/kg for extra ${(weight - 3).toFixed(2)} kg` : "" }`;
    }

    if (!isSameDistrict) extraChargeOutside = 40;
    totalCost = baseCost + extraCost + extraChargeOutside;
    if (extraChargeOutside) breakdown += " plus ৳40 extra charge for outside city/district.";

    return { baseCost, extraCost, extraChargeOutside, totalCost, breakdown };
  };

  const onSubmit = data => {
    const costInfo = calculateCostBreakdown();
    const trackingId = uuidv4().slice(0, 8).toUpperCase();
    const createdAt = new Date().toISOString();

    const parcelData = {
      ...data,
      type,
      weight: type === "document" ? 0 : weight,
      email: user?.email || "anonymous",
      trackingId,
      createdAt,
      deliveryStatus: "pending",
      paymentStatus: "unpaid",
      costDetails: costInfo,
    };

    console.log("Parcel Data to Save:", parcelData);

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
        <div class="text-left text-base space-y-2">
          <p><strong>Tracking ID:</strong> ${trackingId}</p>
          <p><strong>Email:</strong> ${user?.email || "anonymous"}</p>
          <p><strong>Parcel Type:</strong> ${type}</p>
          ${type === "non-document" ? `<p><strong>Weight:</strong> ${weight.toFixed(2)} kg</p>` : ""}
          <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
          <hr class="my-2"/>
          <p><strong>Base Cost:</strong> ৳${costInfo.baseCost}</p>
          ${ costInfo.extraCost ? `<p><strong>Extra Weight Charge:</strong> ৳${costInfo.extraCost.toFixed(2)}</p>` : "" }
          ${ costInfo.extraChargeOutside ? `<p><strong>Outside Zone Charge:</strong> ৳${costInfo.extraChargeOutside}</p>` : "" }
          <div class="text-gray-500 text-sm">${costInfo.breakdown}</div>
          <hr class="my-2"/>
          <p class="text-xl font-bold text-green-600">Total Cost: ৳${costInfo.totalCost.toFixed(2)}</p>
        </div>
      `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      denyButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      customClass: { popup: "rounded-xl shadow-md px-6 py-6" },
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.post('/parcels', parcelData)
        .then(res => {
          if (res.data.insertedId) {
              toast.success("Redirect to the payment gateway....", {
              style: { background: "#000", color: "#fff", fontWeight: "bold", fontSize: "16px", borderRadius: "10px", padding: "16px 24px" },
              duration: 3000,
              position: "top-center",
            });            
          }
        })
        // toast.success("Parcel submitted successfully!", {
        //   style: { background: "#000", color: "#fff", fontWeight: "bold", fontSize: "16px", borderRadius: "10px", padding: "16px 24px" },
        //   duration: 3000,
        //   position: "top-center",
        // });

        // এখানে backend API call যোগ করতে পারো
        // fetch("/api/parcels", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(parcelData) })
      }
    });
  };

  useEffect(() => setValue("senderCenter", ""), [senderRegion, setValue]);
  useEffect(() => setValue("receiverCenter", ""), [receiverRegion, setValue]);

  return (
    <div className="relative">
      <div className="bg-white rounded-[20px] p-10 lg:p-20 mb-20 shadow">
        <h2 className="text-5xl text-secondary font-bold mb-8">Send Parcel</h2>
        <div className="divider"></div>
        <p className="text-gray-600 mb-8 font-bold text-2xl">Enter your parcel details</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Parcel Type */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" value="document" checked={type==="document"} onChange={()=>setType("document")} className="radio checked:bg-green-500" />
              <span className="font-medium">Document</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="non-document" checked={type==="non-document"} onChange={()=>setType("non-document")} className="radio checked:bg-green-500" />
              <span className="font-medium">Not-Document</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Parcel Name</label>
              <input type="text" {...register("parcelName", {required:true})} placeholder="Parcel Name" className="w-full input input-bordered rounded-md" />
            </div>
            {type==="non-document" && (
              <div>
                <label className="block font-medium mb-2">Parcel Weight (KG)</label>
                <input type="number" step="0.1" min="0.1" {...register("weight", { required:true })} placeholder="Parcel Weight (KG)" className="w-full input input-bordered rounded-md" />
              </div>
            )}
          </div>

          <div className="divider mb-6"></div>

          {/* Sender Details */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Sender Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block font-medium mb-1">Sender Name</label><input type="text" {...register("senderName", { required:true })} placeholder="Sender Name" className="input input-bordered w-full" /></div>
                <div><label className="block font-medium mb-1">Sender Contact No</label><input type="text" {...register("senderContact", { required:true })} placeholder="Sender Contact No" className="input input-bordered w-full" /></div>
                <div><label className="block font-medium mb-1">Your Region</label><select {...register("senderRegion", { required:true })} className="select select-bordered w-full"><option value="">Select your region</option>{uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                <div><label className="block font-medium mb-1">Sender Service Center</label><select {...register("senderCenter", { required:true })} className="select select-bordered w-full"><option value="">Select Service Center</option>{getCentersByRegion(senderRegion).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div className="md:col-span-2"><label className="block font-medium mb-1">Address</label><input type="text" {...register("senderAddress", { required:true })} placeholder="Address" className="input input-bordered w-full" /></div>
                <div className="md:col-span-2"><label className="block font-medium mb-1">Pickup Instruction</label><textarea {...register("pickupInstruction", { required:true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full"></textarea></div>
              </div>
            </div>

            {/* Receiver Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Receiver Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block font-medium mb-1">Receiver Name</label><input type="text" {...register("receiverName", { required:true })} placeholder="Receiver Name" className="input input-bordered w-full" /></div>
                <div><label className="block font-medium mb-1">Receiver Contact No</label><input type="text" {...register("receiverContact", { required:true })} placeholder="Receiver Contact No" className="input input-bordered w-full" /></div>
                <div><label className="block font-medium mb-1">Receiver Region</label><select {...register("receiverRegion", { required:true })} className="select select-bordered w-full"><option value="">Select your region</option>{uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                <div><label className="block font-medium mb-1">Receiver Service Center</label><select {...register("receiverCenter", { required:true })} className="select select-bordered w-full"><option value="">Select Service Center</option>{getCentersByRegion(receiverRegion).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div className="md:col-span-2"><label className="block font-medium mb-1">Receiver Address</label><input type="text" {...register("receiverAddress", { required:true })} placeholder="Address" className="input input-bordered w-full" /></div>
                <div className="md:col-span-2"><label className="block font-medium mb-1">Delivery Instruction</label><textarea {...register("deliveryInstruction", { required:true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full"></textarea></div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">* PickUp Time 4pm–7pm Approx.</p>
          <button type="submit" className="bg-primary hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md w-full">Proceed to Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
