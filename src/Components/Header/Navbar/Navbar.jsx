import React from "react";
import logo from '../../../assets/logoblack.png';
import { Link, NavLink } from "react-router";
import { MdArrowOutward, MdDirectionsBike, MdOutlineLogout } from "react-icons/md";
import useAuth from '../../../Hooks/useAuth';
import toast from "react-hot-toast";

const Navbar = () => {
  const {user, logout} = useAuth();
  const navLinks = <>
            <li className="mr-4">
              <NavLink to=''
              className={({isActive}) => isActive ? ' font-bold bg-primary': 'text-secondary font-medium'}
              >Home</NavLink>
            </li>
            <li className="mr-4">
              <NavLink to='/coverage'
              className={({isActive}) => isActive ? ' font-bold bg-primary': 'text-secondary font-medium'}
              >Coverage</NavLink>
            </li>
            <li className="mr-4">
              <NavLink to='/send-parcel'
              className={({isActive}) => isActive ? ' font-bold bg-primary': 'text-secondary font-medium'}
              >Send Parcel</NavLink>
            </li>
            {
              !user && 
              <>
                <li className="mr-4 md:hidden">
                  <NavLink className='btn' to='/login'>Sing In</NavLink>
                </li>
                <li className="mr-4 md:hidden">
                  <NavLink className='btn btn-primary text-secondary font-extrabold' to='/login'>
                    <MdDirectionsBike size={25}></MdDirectionsBike>                
                    Be a rider</NavLink>
                </li>
              </>
            }
            {
              user && 
              <>
                <li className="mr-4">
                  <NavLink to='/dashboard'
                  className={({isActive}) => isActive ? ' font-bold bg-primary': 'text-secondary font-medium'}
                  >Dashboard</NavLink>
                </li>
              </>
            }
  </>;
  const handleSingOut = () => {
    logout()
    .then(() => {
        toast.success('Log Out Successful!')
    })
    .catch(error => {
      toast.error(error.message);
    })
  }

  return (
    <div className="md:max-w-11/12 mx-auto rounded-xl">
      <div className="navbar bg-white shadow-sm md:rounded-xl md:px-8 py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu space-y-3 menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {
                navLinks
              }
            </ul>
          </div>
          <a href="/">
            <img src={logo} className="w-24" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
              {navLinks}
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {
            user ?
            <button onClick={handleSingOut} className="btn btn-primary text-secondary font-bold py-6">
              <MdOutlineLogout size={25}></MdOutlineLogout>Sing Out</button>
          :
          <>
            <Link to='/login'>
              <button className="hidden md:flex btn px-6 py-6">Sing In</button>
            </Link>
            <button className="hidden md:flex btn btn-primary text-secondary font-bold py-6">
              <MdDirectionsBike size={25}></MdDirectionsBike>
              Be a rider</button>
            <button className="hidden md:block bg-black p-3 rounded-full">
              <MdArrowOutward color="#CAEB66" size={25}></MdArrowOutward>
            </button>
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
