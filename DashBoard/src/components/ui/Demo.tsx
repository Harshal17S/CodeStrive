import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "../ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Username', url: '#', icon: Home },
    { name: '250 pts', url: '#', icon: FileText },
    { name: 'Resume1', url: '#', icon: FileText },
    { name: 'Resume2', url: '#', icon: FileText },
    { name: 'Avatar', url: '#', icon: FileText },

  ]

  return (
    <>
      <div>
        <NavBar items={navItems}/>
      </div>
    </>
  )

}