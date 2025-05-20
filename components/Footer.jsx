"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaGithub,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full rounded-full bg-gradient-to-tr from-[#0d0d0d] to-[#1a1a1a] border-t border-gray-800 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo or Brand */}
        <div className="text-white font-bold text-xl gradient_text">SnowDev</div>

        {/* Social Icons */}
        <div className="flex items-center space-x-6">
          <Link
            href="https://www.facebook.com/profile.php?id=61573974672548"
            target="_blank"
            className="text-gray-400 hover:text-indigo-500 transition"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="https://x.com/DimitriTedom"
            target="_blank"
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/tedom-tafotsi-dimitri-wilfried-b70502298/"
            target="_blank"
            className="text-gray-400 hover:text-blue-600 transition"
          >
            <FaLinkedinIn size={20} />
          </Link>
          <Link
            href="https://wa.me/695760594"
            target="_blank"
            className="text-gray-400 hover:text-green-400 transition"
          >
            <FaWhatsapp size={20} />
          </Link>
          <Link
            href="https://t.me/SnowDev5"
            target="_blank"
            className="text-gray-400 hover:text-indigo-500 transition"
          >
            <FaTelegram size={20} />
          </Link>
          <Link
            href="https://github.com/DimitriTedom"
            target="_blank"
            className="text-gray-400 hover:text-[#F8F9FA] transition"
          >
            <FaGithub size={20} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} designed,coded & Deployed by <Link href={"https://snow-dev-portfolio-mu.vercel.app/"} target="_blank">@SnowDev</Link> with ❤️. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
