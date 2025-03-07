import React, { useEffect, useState } from "react";
import './Past.css'
import { useUser } from "@clerk/clerk-react";
import axios from 'axios'

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const User = useUser();


  const fetchEvents = async () => {
    await axios.post("http://localhost:5000/getEventsbyOrganizers", { useremail: User.user.primaryEmailAddress.emailAddress }).then((res) => {
      console.log(res.data)
      setLoading(false)
      setEvents(res.data)
    }).catch((err) => {
      console.log(err);
    })
  };

  fetchEvents()

  return (
    <div className="event-list-container">
      <h2 className="text-center">Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (

            <div key={event._id} className="event-card">
              <img src={event.image} alt={event.eventName} className="event-image" />
              <h3>{event.eventName}</h3>
              <p>Job Title: {event.jobtitle}</p>
              <p>Date & Time: {new Date(event.dateTime).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <p>Mode: {event.mode}</p>
              <p>Ticket Type: {event.ticketType}</p>
              <button onClick={async (e) => {
                e.preventDefault();
                await axios.post(`https://www.eventbriteapi.com/v3/events/${event.id}/orders/`, {
                  headers: {
                    Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`
                  }
                }).then((res) => {
                  console.log(res.data)
                  res.data['orders'].map((par) => {
                    return (<>
                      <div>{par.name}</div>
                      <div>{par.first_name}</div>
                      <div>{par.last_name}</div>
                      <div>{par.email}</div>
                    </>)
                  })
                }).catch((err) => {
                  console.log(err);
                })
              }}>View all Attendes</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
