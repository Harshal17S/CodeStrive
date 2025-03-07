import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from 'axios';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { Toaster, toast } from 'sonner';

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [AllEvents, setAllEvents] = useState([]);
  const [appliedEvents, setAppliedEvents] = useState({});
  const [WidgetScriptLoaded, setWidgetScriptLoaded] = useState(false);
  const user = useUser();

  useEffect(() => {

    axios.get('https://www.eventbriteapi.com/v3/organizations/2659001598811/events/', {
      headers: { Authorization: 'Bearer Z6YXQPA7U4OBF7BLYIBP' }
    }).then((response) => {
      setAllEvents(response.data['events']);
    }).catch((err) => console.log(err));

    const script = document.createElement("script");
    script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
    script.async = true;
    script.onload = () => setWidgetScriptLoaded(true);
    document.body.appendChild(script);


  }, [])

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
          className,
        )}
        style={{ height: 'fit-content' }}
      >
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-3 px-5 rounded-full shadow-lg">

          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            if (item.name === 'Avatar') {
              {
                return (<>
                  <Avatar>
                    <AvatarImage src={user.user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </>)
              }
            }
            else {
              return (
                <>
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                      "text-foreground/80 hover:text-primary",
                      isActive && "bg-muted text-primary",
                    )}
                  >
                    <span className="hidden md:inline" style={{ fontSize: '' }}>{item.name}</span>
                    <span className="md:hidden">
                      <Icon size={70} strokeWidth={4.5} />
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                          <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </a>


                </>
              )
            }
          })}

          <SignedIn>
            <SignOutButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>

        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px', margin: 'auto', width: "fit-content", gap: '50px' }}>
        <Toaster position="top-center" />
        {AllEvents && AllEvents.map((event) => {
          return (<>
            <div key={event.id} style={{ display: "flex", marginLeft: '15px', flexDirection: "row", gap: "10px" }}>
              <Card>
                <CardHeader>
                  {event['logo'] && <img src={event['logo'].url} />}
                  <CardTitle>{event['name'].text}</CardTitle>
                  <CardDescription>{event['description'].text}</CardDescription>
                  <CardDescription>{event['description'].venue}</CardDescription>
                </CardHeader>
                <CardContent>
                  <button
                    id={`apply-btn-${event.id}`}
                    onClick={async (e) => {
                      setAppliedEvents((prev) => ({
                        ...prev,
                        [event.id]: true,
                      }));

                      window.EBWidgets.createWidget({
                        widgetType: "checkout",
                        eventId: `${event.id}`,
                        modal: true,
                        modalTriggerElementId: `apply-btn-${event.id}`,
                        onOrderComplete: () => console.log("Order complete!"),
                      });

                      await axios
                        .post("http://localhost:6000/updateParticipationPoints", {
                          username: user.user?.firstName,
                        })
                        .then(async (res) => {
                          toast.success(res.data);
                        })
                        .catch((err) => {
                          toast.error('Error:' + err);
                        });

                      await axios.post("http://localhost:6000/updateUserParicipation", {
                        username: user.user?.firstName,
                        eventId: event.id,
                        eventName: event['name'].text,
                        participatedAt: new Date()
                      }).then((res) => {
                        toast.success(res.data);
                      }).catch((err) => {
                        toast.error('Error:' + err);
                      })

                    }}
                    disabled={appliedEvents[event.id]} // Disables button after applying
                    style={{
                      backgroundColor: appliedEvents[event.id] ? "#ccc" : "#007bff",
                      color: appliedEvents[event.id] ? "#666" : "#fff",
                      cursor: appliedEvents[event.id] ? "not-allowed" : "pointer",
                    }}
                  >
                    {appliedEvents[event.id] ? "Applied" : "Apply For Event"}
                  </button>
                </CardContent>
              </Card>
            </div >
          </>)
        })}

      </div >


    </>




  )
}