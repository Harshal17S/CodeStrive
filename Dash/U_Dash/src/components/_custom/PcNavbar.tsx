import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type LucideIcon, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

const PcNavbar = ({ items, className }: NavBarProps) => {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const user = useUser()
  const [Earnedpts, setEarnedpts] = useState(0)
  const [userLevel, setuserLevel] = useState("")
  const [userEmail, setuserEmail] = useState("")
  const [participatedEvents, setParticipatedEvents] = useState([])

  useEffect(() => {
    axios
      .post("http://localhost:6000/getUser", { username: "TAK" })
      .then((resp) => {
        setEarnedpts(resp.data["User"].earnedPoints)
        setuserLevel(resp.data["User"].userLevel)
        setuserEmail(resp.data["User"].useremail)
      })
      .catch(() => {
        console.log("Error while Making Request")
      })

    axios
      .post("http://localhost:6000/getUserParticipation", { username: "TAK" })
      .then((resp) => {
        setParticipatedEvents(resp.data["events"])
      })
      .catch(() => {
        console.log("Error fetching participation data")
        setParticipatedEvents([
          { id: 1, name: "Hackathon 2024", date: "Jan 10, 2024" },
          { id: 2, name: "AI Conference", date: "Feb 5, 2024" },
        ])
      })
  }, [])

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  return (
    <>
      <div className=" bg-black pt-2">
        <nav className="w-full max-w-3xl mx-auto px-6 py-3 flex items-center justify-between border border-neutral-700 rounded-full shadow-lg">
          <div className="flex w-full justify-between items-center">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.name

              return (
                <NavLink
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "text-white font-extralight text-lg relative group transition duration-300 my-1 active:scale-90",
                    isActive && "text-primary",
                  )}
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              )
            })}

            <div className="flex items-center gap-2">
              <SignedIn>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-0 overflow-hidden"
                  onClick={toggleProfile}
                >
                  <Avatar>
                    <AvatarImage src={user.user?.imageUrl} alt={user.user?.fullName || "User"} />
                    <AvatarFallback>{user.user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </nav>


        {/* User Profile Sidebar */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-l border-gray-600 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-serif font-semibold text-white">Profile</h2>
                  <Button variant="ghost" size="icon" onClick={toggleProfile} className="text-white hover:text-white/80">
                    <X size={20} />
                  </Button>
                </div>

                <SignedIn>
                  <div className="text-center text-white font-serif">
                    <h3 className="text-xl font-semibold">{user.user?.fullName || "User"}</h3>
                    <p className="text-white/70">{userEmail || "No email"}</p>
                    <div className="mt-4 p-3 bg-white/10 rounded-lg">
                      <p className="text-white font-medium">{Earnedpts} points</p>
                      <p className="text-white/80">{userLevel}</p>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold">Previous Events</h4>
                      <ul className="mt-2 text-sm text-gray-300">
                        {participatedEvents.map((event) => (
                          <li key={event.id} className="border-b border-gray-700 py-1">{event.name} - {event.date}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default PcNavbar


const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    className="text-white font-serif text-lg relative group transition duration-300 my-1 active:scale-90"
    onClick={onClick}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
  </a>
)