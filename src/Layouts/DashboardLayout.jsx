import React from "react";
import { NavLink, Outlet } from "react-router";
import logo from '../assets/logoblack.png';
import { FaTachometerAlt, FaBox, FaMoneyCheckAlt, FaMapMarkedAlt, FaUserEdit, FaUserClock } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { RiUserAddFill } from "react-icons/ri";
import useUserRole from "../Hooks/useUserRole";
import Loading from '../Pages/Loading/Loading'

const DashboardLayout = () => {
  const {role, loading} = useUserRole();

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-white flex flex-col">

        {/* Navbar */}
        <div className="navbar bg-base-300 w-full  lg:hidden">
        <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </svg>
            </label>
        </div>
        <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

           {/* Page content here  */}
           <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu gap-4 bg-base-200 text-base-content min-h-full w-80 p-4">
            <a href="/">
              <img src={logo} className="w-24 mb-5" alt="" />
            </a>            
            {/* Sidebar content here */}
  <li className="mr-4">
    <NavLink
      to="/dashboard"
      end
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaTachometerAlt className="inline-block mr-2 text-lg" />
      Overview
    </NavLink>
  </li>
  {
    role === 'user' && (
    <>
      <li className="mr-4">
        <NavLink
          to="/dashboard/my-parcels"
          className={({ isActive }) =>
            isActive ? "font-bold bg-primary" : "text-secondary font-medium"
          }
        >
          <FaBox className="inline-block mr-2 text-lg" />
          My Parcels
        </NavLink>
      </li>

      <li className="mr-4">
        <NavLink
          to="/dashboard/payment-history"
          className={({ isActive }) =>
            isActive ? "font-bold bg-primary" : "text-secondary font-medium"
          }
        >
          <FaMoneyCheckAlt className="inline-block mr-2 text-lg" />
          Payment History
        </NavLink>
      </li>

      <li className="mr-4">
        <NavLink
          to="/dashboard/track-package"
          className={({ isActive }) =>
            isActive ? "font-bold bg-primary" : "text-secondary font-medium"
          }
        >
          <FaMapMarkedAlt className="inline-block mr-2 text-lg" />
          Track Package
        </NavLink>
      </li>
    </>
    )
  }


  <li className="mr-4">
    <NavLink
      to="/dashboard/update-profile"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaUserEdit className="inline-block mr-2 text-lg" />
      Update Profile
    </NavLink>
  </li>

  { role === 'admin' &&
    <>
    <li className="mr-4">
      <NavLink
        to="/dashboard/pending-riders"
        className={({ isActive }) =>
          isActive ? "font-bold bg-primary" : "text-secondary font-medium"
        }
      >
        <FaUserClock className="inline-block mr-2 text-lg" />
        Pending Riders
      </NavLink>
    </li>
    <li className="mr-4">
      <NavLink
        to="/dashboard/active-riders"
        className={({ isActive }) =>
          isActive ? "font-bold bg-primary" : "text-secondary font-medium"
        }
      >
        <HiBadgeCheck className="inline-block mr-2 text-xl" />
        Active Riders
      </NavLink>
    </li>
    </>
  }
    <li className="mr-4">
      <NavLink
        to="/dashboard/make-admin"
        className={({ isActive }) =>
          isActive ? "font-bold bg-primary" : "text-secondary font-medium"
        }
      >
        <RiUserAddFill className="inline-block mr-2 text-xl" />
        MakeAdmin
      </NavLink>
    </li>

          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
