import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "../ui/tubelight-navbar"
import { useEffect, useState } from 'react'
import axios from 'axios';

export function NavBarDemo() {

  const [username, setusername] = useState("Adidem");
  const [Earnedpts, setEarnedpts] = useState(0);
  const [userLevel, setuserLevel] = useState("");
  const [userEmail, setuserEmail] = useState("")

  useEffect(() => {
    axios.post('http://localhost:5000/getUser', { username: username }).then((resp) => {
      console.log(resp.data)
      setEarnedpts(resp.data['User'].earnedPoints);
      setuserLevel(resp.data['User'].userLevel);
      setuserEmail(resp.data['User'].useremail);
    }).catch(() => { console.log("Error while Making Request") });
  }, [])

  const navItems = [
    { name: `${username}`, url: '#', icon: Home },
    { name: 'Avatar', url: '#', icon: FileText },
    { name: `${Earnedpts} pts`, url: '#', icon: FileText },
    { name: `${userLevel}`, url: '#', icon: FileText },
    { name: `${userEmail}`, url: '#', icon: FileText },
    { name: `Store`, url: '/winReward', icon: FileText },
    { name: `Signout`, url: '/#', icon: FileText },

  ]

  return (
    <>
      <div>
        <NavBar items={navItems} />
      </div>
    </>
  )

}