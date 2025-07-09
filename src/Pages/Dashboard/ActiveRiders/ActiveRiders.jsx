import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEye, FaUserTimes } from "react-icons/fa";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ fetch only active riders
  const { data: activeRiders = [], refetch } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=approve");
      return res.data;
    },
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this rider!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/${id}`, { status: "rejected" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Rejected!", "The rider has been rejected.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-3xl font-bold text-secondary mb-6">Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra text-sm">
          <thead className="bg-base-200 text-base font-semibold text-gray-600">
            <tr>
              <th>#</th>
              <th>Rider Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Region</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeRiders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.contactNumber}</td>
                <td>{rider.region}</td>
                <td>{rider.warehouse}</td>
                <td>
                  <span className="px-2 py-1 text-green-600 bg-green-100 text-xs font-medium rounded-full">
                    {rider.status}
                  </span>
                </td>
                <td className="flex gap-3 justify-center">
                  <button className="btn btn-xs btn-outline btn-info tooltip" data-tip="View">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleReject(rider._id)}
                    className="btn btn-xs btn-outline btn-error tooltip"
                    data-tip="Reject"
                  >
                    <FaUserTimes />
                  </button>
                </td>
              </tr>
            ))}
            {activeRiders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
