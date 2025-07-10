import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role; // assuming API returns { role: "admin" }
    },
  });

  return {
    role: roleData,
    loading: isLoading || loading,
    isError,
    refetch,
  };
};

export default useUserRole;
