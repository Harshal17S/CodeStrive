import React from "react";
import { motion } from "framer-motion";
import F1 from "../assets/F1.png";
import F2 from "../assets/F2.png";
import F3 from "../assets/F3.png"
import F4 from "../assets/F4.jpg"

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeIn", duration: 0.9 },
  },
};

const blockVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

const textBlockVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
  },
};

// Headline Component
const FeatureHeadline = () => {
  const text = "Elevate Your Coding Game with Smart Automation!";

  return (
    <div className="text-center max-w-[75rem]">
      <h1 className="text-6xl font-bold justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">
        FEATURES
      </h1>
      <motion.div
        className="text-6xl font-medium py-14 text-white flex flex-wrap justify-center tracking-wide gap-2 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {text.split(" ").map((word, index) => (
          <motion.span key={index} className="inline-block mx-2" variants={wordVariants}>
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

// Feature Block Component
const FeatureBlock = ({ title, description, image, reverse }) => {
  return (
    <motion.div
      className={`w-[75rem] h-[32rem] rounded-xl flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } shadow-lg bg-neutral-900 text-white`}
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="w-[50%] px-16 py-10 flex flex-col justify-center items-start"
        variants={textBlockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-3xl font-bold pb-6 ">{title}</p>
        <p className="text-lg leading-relaxed text-gray-300">{description}</p>
      </motion.div>
      <motion.div
        className="flex justify-center items-center w-[50%] px-8"
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={image} alt={title} className="w-[85%] h-auto rounded-lg" />
      </motion.div>
    </motion.div>
  );
};

// Main Features Component
const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-black py-20">
      <FeatureHeadline />
      <div className="flex flex-col justify-center items-center gap-16">
        <FeatureBlock
          title=" Hackathon & Contest Scheduler"
          description="Stay updated with upcoming competitions using the event scheduler. Organizers can seamlessly post new events, while participants can easily track and register for hackathons, DSA contests, CP contests, and ML competitions."
          image={F4}
          reverse={true}
        />
        <FeatureBlock
          title="Reward System & Swag Redemption"
          description="Earn coins by participating in hackathons and contests. Redeem them for exciting swags and exclusive perks, making every competition more rewarding."
          image={F3}
          reverse={false}
        />
        <FeatureBlock
          title="DSA 1v1 Battle"
          description="Engage in head-to-head coding battles with peers in real-time. Challenge others, solve data structure and algorithm problems, and climb the competitive ranks."
          image={F2}
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Features;
