import React from "react";
import logo from '../../assets/logoWhite.png';
import { FaFacebook, FaFacebookF, FaLinkedin, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // X (Twitter);

const Footer = () => {
  return (
    <div className="footer footer-horizontal footer-center text-primary-content p-10">
      <aside className="space-y-4">
        <img src={logo} alt="" />    
        <p className="text-[#DADADA]">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.
        </p>
      </aside>
      <div className="border-dashed border-secondary border-y-2 w-full py-4 text-[#DADADA]">
          <nav className="grid grid-flow-col gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-4">
                  {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] text-white w-11 h-11 flex items-center justify-center rounded-full"
      >
        <FaFacebookF size={20} />
      </a>

      {/* X (Twitter) */}
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full"
      >
        <FaXTwitter size={20} />
      </a>

      {/* YouTube */}
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#FF0000] text-white w-11 h-11 flex items-center justify-center rounded-full"
      >
        <FaYoutube size={20} />
      </a>

      {/* LinkedIn */}
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0077B5] text-white w-11 h-11 flex items-center justify-center rounded-full"
      >
        <FaLinkedinIn size={22} />
      </a>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
