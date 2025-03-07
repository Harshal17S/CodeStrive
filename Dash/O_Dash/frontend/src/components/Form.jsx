import React, { useState } from "react";
import "./style.css";
import axios from 'axios';

export default function EventForm() {
  const [companyname, setCompanyName] = useState("");
  const [description, setJobTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("Offline");
  const [ticketType, setTicketType] = useState("Free");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  // Upload Image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "harox123");
    formData.append("upload_token", "aW1hZ2UtZXZlbnQtbG9nb3xldmVudGJyaXRlLXVwbG9hZGVyLWluY29taW5nLXByb2R8YTE5NTZmMmNmYzYzNDkzZi4yMDI1MDMwNy0wNzU1NDg=")

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/drqfphkwz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return null;
    }
  };

  // Handle Form Submission
  const collectData = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const formData = {
      companyname,
      description,
      dateTime,
      location,
      mode,
      ticketType,
      capacity,
      image: imageUrl,
    };

    try {
      const result = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (result.ok) {

        // const formData = new FormData();
        // formData.append("file", imageFile);

        // await axios.get("https://www.eventbriteapi.com/v3/media/upload/?type=image-event-logo&token=Z6YXQPA7U4OBF7BLYIBP", {
        //   headers: {
        //     Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP `
        //   }
        // }).then((res) => {
        //   formData.append("upload_token", res.data['upload_token'])
        // }).catch((err) => {
        //   console.log(err);
        // })

        // await axios.post("https://www.eventbriteapi.com/v3/media/upload/", formData, {
        //   headers: {
        //     Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`
        //   }
        // }).then((res) => {
        //   console.log(res.data)
        // }).catch((err) => {
        //   console.log(err);
        // })


        const eventData = {
          event: {
            name: {
              "html": companyname
            },
            description:{
              "html":description
            },
            start: {
              "timezone": "Asia/Kolkata",
              "utc": "2025-03-10T06:30:00Z"
            },
            end: {
              "timezone": "Asia/Kolkata",
              "utc": "2025-03-15T06:30:00Z"
            },
            currency: "USD",
            online_event: true,
            category_id: "102",
            subcategory_id: "2004",
            format_id: "5",
            logo_id: "972842923",
            capacity: capacity, 
          }
        }

        await axios.post(`https://www.eventbriteapi.com/v3/organizations/2659001598811/events/`, eventData, {
          headers: {
            Authorization: 'Bearer Z6YXQPA7U4OBF7BLYIBP'
          }
        }).then(async (response) => {
          // console.log("Event Has been Created" + response.data)
          const ticket_class_data={
              ticket_class: {
                name: "Register to Hackmatrix",
                free: true,
                quantity_total: capacity,
                sales_start: "2025-03-02T06:30:00Z",
                sales_end: "2025-03-15T23:59:00Z",
                minimum_quantity: 1,
                maximum_quantity: 10,
                auto_hide: false
              }
            }

        await axios.post(`https://www.eventbriteapi.com/v3/events/${response.data.id}/ticket_classes/`, ticket_class_data, {
          headers: {
            Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`
          }
        })

        await axios.post(`https://www.eventbriteapi.com/v3/events/${response.data.id}/publish/`,{},{
          headers: {
            Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`
          }
        }).then((res)=>{console.log(res.data)})

        }).catch(err => console.log(err));


        setCompanyName("");
        setJobTitle("");
        setDateTime("");
        setLocation("");
        setMode("Offline");
        setTicketType("Free");
        setCapacity("");
        setImage(null);

      } else {
        alert("Failed to add Employee. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <form className="formmm" onSubmit={collectData}>
        <h1 className="text-center pt-3">Event Form</h1>

        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            className="form-control"
            value={companyname}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date & Time</label>
          <input
            type="date"
            className="form-control"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mode</label>
          <select
            className="form-control"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Ticket Type</label>
          <select
            className="form-control"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            required
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Capacity</label>
          <input
            type="number"
            className="form-control"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Event Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {loading && <p>Uploading image, please wait...</p>}

        <button type="submit" className="btnnnnnnnn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
