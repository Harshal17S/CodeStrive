import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "../ui/tubelight-navbar"
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser , SignOutButton } from "@clerk/clerk-react";


export function NavBarDemo() {
  const [Earnedpts, setEarnedpts] = useState(0);
  const [userLevel, setuserLevel] = useState("");
  const [userEmail, setuserEmail] = useState("")
  const user=useUser();
  

  useEffect(() => {
    axios.post('http://localhost:5000/getUser', { username:"Aditya" }).then((resp) => {
      console.log(resp.data)
      setEarnedpts(resp.data['User'].earnedPoints);
      setuserLevel(resp.data['User'].userLevel);
      setuserEmail(resp.data['User'].useremail);
    }).catch(() => { console.log("Error while Making Request") });
  }, [])

  const navItems = [
    { name: `${user.user?.firstName}`, url: '#', icon: Home },
    { name: `Avatar`, url: '#', icon: Home },
    { name: `${Earnedpts} pts`, url: '#', icon: FileText },
    { name: `${userLevel}`, url: '#', icon: FileText },
    { name: `${user.user?.primaryEmailAddress?.emailAddress}`, url: '#', icon: FileText },
    { name: `Store`, url: '/winReward', icon: FileText },
    { name: `Community`, url: 'https://agrico-community.vercel.app/', icon: FileText },
    { name: `DSA Challenge`, url: 'https://cp-buddy-t80e.onrender.com', icon: FileText },

  ]

  return (
    <>
      <div>
        <NavBar items={navItems} />
      </div>
    </>
  )

}