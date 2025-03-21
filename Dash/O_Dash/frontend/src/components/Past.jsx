import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";


export default function EventList() {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const user=useUser();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:6000/getEventsbyOrganizers",{useremail:user.user.primaryEmailAddress.emailAddress});
      const data = await response.json();
      console.log(data);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  return (
    <div className="event-list-container">
      <h2 className="text-center">Upcoming Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.image} alt={event.companyname} className="event-image" />
              <h3>{event.companyname}</h3>
              <p>Job Title: {event.jobtitle}</p>
              <p>Date & Time: {new Date(event.dateTime).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <p>Mode: {event.mode}</p>
              <p>Ticket Type: {event.ticketType}</p>
              <p>Capacity: {event.capacity}</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
