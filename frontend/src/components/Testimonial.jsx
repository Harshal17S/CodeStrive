import React, { useState } from "react";

const DotCard = React.forwardRef(
  ({ className, title, description, children, ...props }, ref) => {
    const sharedClasses =
      "rounded-full outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400";

    return (
      <div
        ref={ref}
        className={`relative mx-auto w-full bg-black rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 px-4 sm:px-6 md:px-8 ${className}`}
        {...props}
      >
        <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8" />
        <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
          <div className="absolute z-0 grid h-full w-full items-center">
            <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
              <div className={`${sharedClasses} -translate-x-[2.5px]`} />
              <div
                className={`${sharedClasses} translate-x-[2.5px] place-self-end`}
              />
              <div className={`${sharedClasses} -translate-x-[2.5px]`} />
              <div
                className={`${sharedClasses} translate-x-[2.5px] place-self-end`}
              />
            </section>
          </div>
          <div className="relative z-20 mx-auto py-8 w-[20rem]">
            <div className="p-6">
              {title && (
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DotCard.displayName = "DotCard";

const testimonials = [
  {
    author: {
      name: "Ravi Sharma",
      handle: "@ravimusician",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The academy has truly helped me enhance my music skills. The teachers are very knowledgeable, and the online resources are incredible!",
    href: "https://twitter.com/ravimusician",
  },
  {
    author: {
      name: "Priya Patel",
      handle: "@priyasings",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The music academy has given me the confidence to perform in front of audiences. I highly recommend it to anyone wanting to pursue their passion for music.",
    href: "https://twitter.com/priyasings",
  },
  {
    author: {
      name: "Amit Kumar",
      handle: "@amitguitar",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "The guitar lessons here have transformed my playing. The practical approach to teaching has helped me grow faster than I imagined.",
  },
  {
    author: {
      name: "Sneha Reddy",
      handle: "@snehamusic",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "I love the personalized feedback I get from my instructors. It has helped me refine my vocal techniques and become more confident in my performances.",
  },
  {
    author: {
      name: "Vikram Singh",
      handle: "@vikramsitar",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The music store has a great collection of instruments. I found the perfect sitar for my practice, and the customer service was exceptional.",
  },
  {
    author: {
      name: "Anjali Sharma",
      handle: "@anjalimusic",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The music academy's online store is fantastic. I was able to find everything I needed for my studio setup. Highly recommended!",
  },
  {
    author: {
      name: "Rahul Mehta",
      handle: "@rahulpiano",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "My learning experience here has been amazing. I purchased my piano from the store, and it's of the best quality. It's an investment in my future.",
  },
  {
    author: {
      name: "Neha Desai",
      handle: "@nehasings",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The academy’s interactive sessions are so much fun! The teachers create a friendly learning environment, which makes it easy to improve.",
  },
];

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="py-12 sm:py-24 md:py-32 px-4 bg-black text-white h-screen relative">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-16 b">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl sm:text-5xl max-w-screen-lg font-serif p-1 text-center bg-gradient-to-r from-[#3B82F6] via-[#A78BFA] to-[#FBCFE8] text-transparent bg-clip-text">
            See What Our Users Are Saying
          </h2>
          <p className="max-w-2xl text-md sm:text-xl text-gray-300 text-center font-serif">
            Join thousands of musicians who are already honing their skills and
            creating amazing music with our academy and store.
          </p>
        </div>
        <div
          className="relative flex w-full overflow-hidden group"
          onClick={handleClick}
        >
          {" "}
          {/* Added onClick here */}
          <div
            className={`flex gap-6 animate-marquee flex-row ${
              isPaused
                ? "pointer-events-none"
                : "group-hover:[animation-play-state:paused]"
            }`}
          >
            {[...Array(2)].map((_, loopIndex) =>
              testimonials.map((testimonial, i) => (
                <DotCard
                  key={`${loopIndex}-${i}`}
                  description={testimonial.text}
                >
                  <div className="flex gap-4 mt-4">
                    <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-md font-semibold">
                        {testimonial.author.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.author.handle}
                      </p>
                    </div>
                  </div>
                </DotCard>
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
