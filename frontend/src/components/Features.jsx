import React from "react";
import { motion } from "framer-motion";
import F1 from "../assets/F1.png";

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
  const text = "Elevate Your Social Media Strategy with Intelligent Automation";

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
          title="Your Digital Essence, Secured On-Chain Forever"
          description="Transform your social data into a decentralized, immutable digital persona. Create an autonomous web3 portfolio that learns and adapts based on your social interactions and crypto interests."
          image={F1}
          reverse={true}
        />
        <FeatureBlock
          title="AI-Driven Content: Precision, Timing, Perfection"
          description="Intelligently analyze and process your content across text, images, and videos. Automatically optimize posting times for maximum engagement on each unique platform."
          image={F1}
          reverse={false}
        />
        <FeatureBlock
          title="One Identity, Multiple Voices: AI-Powered Social Persona"
          description="Automatically craft unique communication styles for each social platform. Seamlessly switch between professional LinkedIn tone and casual Twitter banter while maintaining your core identity."
          image={F1}
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Features;
