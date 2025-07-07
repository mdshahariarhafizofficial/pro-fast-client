import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaTrashAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { format } from "date-fns";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // Tanstack Query
    const {data: parcels=[], refetch} = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

// Delete
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data?.deletedCount > 0 || res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "The parcel has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#16a34a",
          });
           refetch() // Refresh the table data if available
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Parcel could not be deleted.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error!",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  });
};
    console.log(parcels);

    // Payment
    const handlePay = (id) => {
      navigate(`/dashboard/payment/${id}`)
    };

    return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-secondary">📦 My Parcels</h2>
      <table className="table w-full text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Created At</th>
            <th>Delivery Status</th>
            <th>Payment</th>
            <th>Tracking ID</th>
            <th>Created By</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel, index) => {
            const createdDate = format(new Date(parcel.createdAt), "dd MMM yyyy");
            const isPaid = parcel.paymentStatus === "paid";
            const isDelivered = parcel.deliveryStatus === "delivered";

            return (
              <tr key={parcel._id} className="hover border-b">
                <td>{index + 1}</td>
                <td className="font-medium text-gray-800 truncate">{parcel.parcelName}</td>
                <td className="capitalize">{parcel.type}</td>
                <td className="font-semibold text-green-600">৳{parcel.costDetails?.totalCost || 0}</td>
                <td className="text-gray-600">{createdDate}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded font-semibold ${
                      isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded font-semibold ${
                      isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {parcel.trackingId}
                  </code>
                </td>
                <td className="text-gray-600 text-sm">{parcel.created_by}</td>
                <td className="flex gap-2 justify-center items-center mt-1">
                  <button
                    className="btn btn-xs btn-outline btn-info tooltip"
                    data-tip="View"
                    onClick={() => console.log("View", parcel._id)}
                  >
                    <FaEye className="text-sm" />
                  </button>
                  {!isPaid && (
                    <button
                      className="btn btn-xs btn-outline btn-success tooltip"
                      data-tip="Pay"
                      onClick={() => handlePay(parcel._id)}
                    >Pay
                      <FaMoneyCheckAlt className="text-sm" />
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-outline btn-error tooltip"
                    data-tip="Delete"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    <FaTrashAlt className="text-sm" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
};

export default MyParcels;