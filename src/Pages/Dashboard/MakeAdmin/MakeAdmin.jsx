import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await axiosSecure.get(`/users/search?query=${query}`);
      setUsers(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Make Admin handler
  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be granted admin access!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${userId}/make-admin`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success", "User has been made admin.", "success");
            // update user role in state
            setUsers((prev) =>
              prev.map((u) => (u._id === userId ? { ...u, role: "admin" } : u))
            );
          }
        } catch (err) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  // Remove Admin handler
  const handleRemoveAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will lose admin access!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${userId}/remove-admin`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success", "Admin role removed from user.", "success");
            // update user role in state
            setUsers((prev) =>
              prev.map((u) => (u._id === userId ? { ...u, role: "user" } : u))
            );
          }
        } catch (err) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Make Admin</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user._id)}
                        className="btn btn-error btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-success btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {users.length === 0 && query && (
        <p className="text-gray-500 mt-4">No users found for "{query}".</p>
      )}
    </div>
  );
};

export default MakeAdmin;
