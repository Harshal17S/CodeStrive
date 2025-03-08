import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const User = useUser();

  useEffect(() => {
    if (!User) return; // Ensure user is loaded

    const fetchEvents = async () => {
      try {
        const res = await axios.post(
          "http://localhost:6000/getEventsbyOrganizers",
          {
            useremail: "maddymongoose1320@gmail.com",
          }
        );
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [User]);

  return (
    <div className="bg-black mx-auto flex flex-col px-4 py-8 font-serif">
      <div className=" flex flex-row justify-between">
        <a
          href="/form"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Create an Event
          </span>
        </a>

        <a
          href="https://agrico-community.vercel.app/"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Events Community
          </span>
        </a>
      </div>
      <h2 className="text-center text-white text-3xl font-bold py-4">Ongoing Events</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400">No events found.</p>
      ) : (
        <div className="max-w-[75rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event._id} className="h-full flex flex-col">
              <div className="h-full w-[33rem] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 text-white rounded-xl p-6">
                {event.image && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={event.image}
                      alt={event.eventName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="mt-4 text-2xl font-serif text-white pb-2">
                  {event.eventName}
                </h3>
                <p className="text-lg text-slate-300 font-sans pb-1">
                  💼 Job Title: {event.jobtitle}
                </p>
                <p className="text-lg text-slate-300 font-sans pb-1">
                  📅 Date & Time: {new Date(event.dateTime).toLocaleString()}
                </p>
                <p className="text-lg text-slate-300 font-sans pb-1">
                  📍 Location: {event.location}
                </p>
                <p className="text-lg text-slate-300 font-sans pb-1">
                  🌍 Mode: {event.mode}
                </p>
                <p className="text-lg text-slate-300 font-sans pb-1">
                  🎟 Ticket Type: {event.ticketType}
                </p>
                <div className="mt-auto pt-4">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await axios
                        .post(
                          `https://www.eventbriteapi.com/v3/events/${event.id}/orders/`,
                          {
                            headers: {
                              Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`,
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res.data);
                          res.data["orders"].map((par) => {
                            return (
                              <>
                                <div>{par.name}</div>
                                <div>{par.first_name}</div>
                                <div>{par.last_name}</div>
                                <div>{par.email}</div>
                              </>
                            );
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    className="w-full py-2 px-4 rounded-md transition-all duration-300 font-serif mt-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                  >
                    View All Attendees
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
