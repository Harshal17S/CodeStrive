import { Home, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import PcNavbar from '../_custom/PcNavbar';
import { PcEvents } from '../_custom/PcEvents';

export function MainRender() {
  const navItems = [
    { name: `Store`, url: '/winReward', icon: FileText },
    { name: `Community`, url: 'https://agrico-community.vercel.app/', icon: FileText },
    { name: `DSA Challenge`, url: 'https://cp-buddy-t80e.onrender.com', icon: FileText },
    { name: `Colaborative Workspace`, url: 'https://haxplore-ten.vercel.app/dashboard', icon: FileText },
  ];

  return (
    <>
      <div>
        <PcNavbar items={navItems} />
        <PcEvents/>
      </div>
    </>
  );
}