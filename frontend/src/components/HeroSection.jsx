import React from "react";
import { SignedIn ,SignedOut } from "@clerk/clerk-react";
import axios from 'axios';
import {useUser} from '@clerk/clerk-react';

const RetroGrid = () => {
  const gridStyles = {
    "--grid-angle": "65deg",
    "--cell-size": "50px",
    "--opacity": 0.4,
    "--dark-line": "#2a2a2a",
  };


  return (
    <div
      className="pointer-events-none absolute size-full overflow-hidden [perspective:200px] opacity-[var(--opacity)]"
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  );
};

const HeroSection = React.forwardRef((props, ref) => {
  const User=useUser();

  return (
    <div className="relative bg-black" ref={ref} {...props}>
      <div className="absolute top-0 z-[0] h-screen w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <section className="relative max-w-full mx-auto z-1 pt-14">
        <RetroGrid />
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
          <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
            <h1 className="text-sm text-gray-400 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent border-[2px] border-white/5 rounded-3xl w-fit">
              Welcome to Our Platform
            </h1>
            <h2 className="text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
              Transform your ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">beautiful digital experiences</span>
            </h2>
            <p className="max-w-2xl mx-auto text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
              Transform your ideas into reality with our comprehensive suite of development tools and resources.
            </p>
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                    
                    <SignedOut>
    <a
                          className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 "
                        >
                          Get Started
                        </a>
                    </SignedOut>

                    <SignedIn>

                    <a
                          className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10"
                         
                          onClick={async (e)=>{
                            e.preventDefault();
                            await axios.post("http://localhost:5000/RegisterOrganizer",{userName:User.user.firstName,userEmail:User.user.primaryEmailAddress.emailAddress}).then(()=>{
                              alert('Organizer Added Successfully');
                              window.open("http://localhost:5174")
                            }).catch(err=>{console.log(err)});
                           }} 
                       
                       >
                          Register as Organizer
                        </a>
                    </SignedIn>

                    <SignedIn>
                    <a
                          className="inline-flex rounded-full text-center  items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10"
                          style={{marginLeft:'30px'}}

                           onClick={async (e)=>{
                            e.preventDefault();
                            await axios.post("http://localhost:5000/saveUser",{userName:User.user.firstName,earnedPoints:0,userLevel:"Begineer",useremail:User.user.primaryEmailAddressId}).then((resq)=>{
                              console.log(resq)
                            }).catch(err=>{console.log(err)});
                           }}
                        >
                         Register as Participant
                        </a>
                    </SignedIn>
                  </div>
              </span>
            </div>
          </div>
          <div className="mt-32 mx-10 relative z-10">
            <img
              src="https://www.launchuicomponents.com/app-dark.png"
              className="w-full shadow-lg rounded-lg border border-gray-800"
              alt="Dashboard preview"
            />
          </div>
        </div>
      </section>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export { HeroSection };
