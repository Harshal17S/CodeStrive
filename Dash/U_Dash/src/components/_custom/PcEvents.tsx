import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster, toast } from "sonner"
import { useUser } from "@clerk/clerk-react"
import { cn } from "../../lib/utils"

export function PcEvents() {
  const [AllEvents, setAllEvents] = useState([])
  const [appliedEvents, setAppliedEvents] = useState({})
  const user = useUser()

  useEffect(() => {
    axios
      .get("https://www.eventbriteapi.com/v3/organizations/2659001598811/events/", {
        headers: { Authorization: "Bearer Z6YXQPA7U4OBF7BLYIBP" },
      })
      .then((response) => {
        setAllEvents(response.data["events"])
      })
      .catch((err) => console.log(err))

    const script = document.createElement("script");
    script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, [])

  const formatDateToIST = (utcDate) => {
    const date = new Date(utcDate)
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })
  }

  return (
    <div className="bg-black mx-auto px-4 py-8 font-serif">
      <Toaster position="top-center" />
      <div className="max-w-[75rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
        {AllEvents &&
          AllEvents.map((event) => (
            <div key={event.id} className="h-full flex flex-col">
              <Card className="h-full w-[33rem] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 text-white">
                <CardHeader className="pb-2">
                  {event["logo"] && (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={event["logo"].url || "/placeholder.svg"}
                        alt={event["name"].text}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardTitle className="mt-4 text-2xl font-serif text-white pb-2">{event["name"].text}</CardTitle>
                  <CardDescription className="text-lg text-slate-300 font-sans pb-1">📖 {event["description"].text}</CardDescription>
                  <CardDescription className="text-lg text-slate-300 font-sans pb-1">📅 From: {formatDateToIST(event["start"].utc)} to {formatDateToIST(event["end"].utc)}</CardDescription>
                  <CardDescription className="text-lg text-slate-300 font-sans pb-1">👥 Capacity: {event["capacity"]}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-2">
                  <button
                    id={`apply-btn-${event.id}`}
                    onClick={async (e) => {
                      setAppliedEvents((prev) => ({
                        ...prev,
                        [event.id]: true,
                      }))

                      window.EBWidgets.createWidget({
                        widgetType: "checkout",
                        eventId: `${event.id}`,
                        modal: true,
                        modalTriggerElementId: `apply-btn-${event.id}`,
                        onOrderComplete: () => console.log("Order complete!"),
                      })

                      await axios
                        .post("http://localhost:5000/updateParticipationPoints", {
                          username: user.user?.firstName,
                        })
                        .then(async (res) => {
                          toast.success(res.data)
                        })
                        .catch((err) => {
                          toast.error("Error:" + err)
                        })

                      await axios
                        .post("http://localhost:5000/updateUserParicipation", {
                          username: user.user?.firstName,
                          eventId: event.id,
                          eventName: event["name"].text,
                          participatedAt: new Date(),
                        })
                        .then((res) => {
                          toast.success(res.data)
                        })
                        .catch((err) => {
                          toast.error("Error:" + err)
                        })
                    }}
                    disabled={appliedEvents[event.id]}
                    className={cn(
                      "w-fit py-2 px-4 rounded-md transition-all duration-300 font-serif mt-auto",
                      appliedEvents[event.id]
                        ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95",
                    )}
                  >
                    {appliedEvents[event.id] ? "Applied" : "Apply For Event"}
                  </button>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </div>
  )
}
