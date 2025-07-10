import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const handleAction = async (id, actionType, email) => {
    const result = await Swal.fire({
      title: `${actionType === "approve" ? "Approve" : "Reject"} Rider?`,
      text: `Are you sure you want to ${actionType} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: actionType === "approve" ? "#16a34a" : "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionType}`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: actionType,
        email,
         });
        Swal.fire("Success", `Rider ${actionType}d successfully!`, "success");
        queryClient.invalidateQueries(["pending-riders"]);
      } catch (err) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="overflow-x-auto bg-white rounded-xl p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <th>{index + 1}</th>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.phone}</td>
              <td>{rider.region}</td>
              <td>{rider.warehouse}</td>
              <td>
                <span className="badge badge-warning capitalize">{rider.status}</span>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-success"
                  onClick={() => handleAction(rider._id, "approve", rider.email)}
                >
                  ✅ Approve
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleAction(rider._id, "reject", rider.email)}
                >
                  ❌ Reject
                </button>
                <button className="btn btn-sm btn-outline btn-info">👁 View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRiders;
