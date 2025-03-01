import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import FooterBg from "../assets/FooterBG.jpg";

const Footer = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);

  return (
    <div id="footer" ref={container} className="relative bg-gray-50w-full">
      <div
        id="footer"
        ref={container}
        className="relative text-white border-none"
        style={{ backgroundImage: `url(${FooterBg})` }}
      >
        <div className="h-[150px] md:h-[250px] overflow-hidden">
          <motion.div
            className="h-full flex justify-center items-center"
            style={{ y }}
          >
            <p className="text-[60px] md:text-[60px] lg:text-[230px] font-bold font-Kudryashev mt-4 text-transparent bg-gradient-to-b from-white to-gray-600 bg-clip-text">
              GreenBand
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row justify-around items-start p-4 md:p-8 font-serif gap-6 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl md:text-2xl">Contact</p>
            <div className="flex flex-row gap-1">
              <p className="font-semibold text-lg md:text-xl">Email:</p>
              <a href="mailto:sidh412@gmail.com" className="text-sm md:text-lg">
                sidh412@gmail.com
              </a>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold text-lg md:text-xl">Phone:</p>
              <a href="tel:+918668344235" className="text-sm md:text-lg">
                +918668344235
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl md:text-2xl">Addresses 📍</p>
            <a
              href="https://google.com/maps"
              className="text-sm md:text-lg max-w-[30vh] md:max-w-[40vh]"
            >
              GreenBand Music Studio, ITI Corner, Nanded - 431603
            </a>
            <a
              href="https://google.com/maps"
              className="text-sm md:text-lg max-w-[30vh] md:max-w-[40vh]"
            >
              GreenBand Music Classes, Khandelwal Complex, Vazirabad, Nanded -
              431602
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl md:text-2xl">Services</p>
            <ul className="flex flex-col">
              <a href="#hero" className="text-sm md:text-lg hover:underline">
                Home
              </a>
              <a
                href="instagram.com"
                className="text-sm md:text-lg  hover:underline"
              >
                Store
              </a>
              <a href="" className="text-sm md:text-lg  hover:underline">
                Book Us
              </a>
            </ul>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl">Socials</p>
            <ul className="flex flex-row gap-4">
              <a
                href="https://www.instagram.com/green_band_music_academy?igsh=eXJwZDA4bHhzeTRz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110"
              >
                <FaInstagram className="w-8 h-8" />
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100063585496408"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-transform transform hover:scale-110"
              >
                <FaFacebook className="w-8 h-8" />
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Sidhant-"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-transform transform hover:scale-110"
              >
                <FaYoutube className="w-8 h-8" />
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
