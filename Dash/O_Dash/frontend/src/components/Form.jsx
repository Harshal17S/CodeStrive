import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

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
  const user = useUser();

  // Upload Image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "harox123");

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

      await axios.post("http://localhost:6000/updateEventsOfOrganizor", {
        useremail: user.user.primaryEmailAddress.emailAddress,
        eventName: formData.companyname,
        description: formData.description,
        dateTime: formData.dateTime,
        location: formData.location,
        mode: formData.mode,
        ticketType: formData.ticketType,
        image: imageUrl,
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
        //     Authorization: Bearer Z6YXQPA7U4OBF7BLYIBP
        //   }
        // }).then((res) => {
        //   console.log(res.data)
        // }).catch((err) => {
        //   console.log(err);
        // })

        const eventData = {
          event: {
            name: {
              html: companyname,
            },
            description: {
              html: description,
            },
            start: {
              timezone: "Asia/Kolkata",
              utc: "2025-03-10T06:30:00Z",
            },
            end: {
              timezone: "Asia/Kolkata",
              utc: "2025-03-15T06:30:00Z",
            },
            currency: "USD",
            online_event: true,
            category_id: "102",
            subcategory_id: "2004",
            format_id: "5",
            logo_id: "978189923",
            capacity: capacity,
          },
        };

        await axios
          .post(
            `https://www.eventbriteapi.com/v3/organizations/2659001598811/events/`,
            eventData,
            {
              headers: {
                Authorization: "Bearer Z6YXQPA7U4OBF7BLYIBP",
              },
            }
          )
          .then(async (response) => {
            const ticket_class_data = {
              ticket_class: {
                name: `Register to ${companyname}`,
                free: true,
                quantity_total: capacity,
                sales_start: "2025-03-02T06:30:00Z",
                sales_end: "2025-03-15T23:59:00Z",
                minimum_quantity: 1,
                maximum_quantity: 10,
                auto_hide: false,
              },
            };

            await axios.post(
              `https://www.eventbriteapi.com/v3/events/${response.data.id}/ticket_classes/`,
              ticket_class_data,
              {
                headers: {
                  Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`,
                },
              }
            );

            await axios
              .post(
                `https://www.eventbriteapi.com/v3/events/${response.data.id}/publish/`,
                {},
                {
                  headers: {
                    Authorization: `Bearer Z6YXQPA7U4OBF7BLYIBP`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
              });

            await axios.post("http://localhost:6000/updateEventsOfOrganizor", {
              useremail: "maddymongoose1320@gmail.com",
              eventName: formData.companyname,
              eventid: `${response.data.id}`,
              description: formData.description,
              dateTime: formData.dateTime,
              location: formData.location,
              mode: formData.mode,
              ticketType: formData.ticketType,
              image: imageUrl,
            });
          })
          .catch((err) => console.log(err));

        setCompanyName("");
        setJobTitle("");
        setDateTime("");
        setLocation("");
        setMode("Offline");
        setTicketType("Free");
        setCapacity("");
        setImage(null);

        alert("New Event Has been Published");
      } else {
        alert("Failed to add Employee. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" bg-black p-2">
    <div className="w-1/3 mt-20 p-10 border border-neutral-700 rounded-md mx-auto bg-black text-gray-300">
      <form className="text-left">
        <h1 className="text-center text-2xl font-serif pt-1 text-white">
          Event Form
        </h1>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">
            Event Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">
            Description
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">
            Date & Time
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-lg font-semibold text-gray-400">
            Location
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">Mode</label>
          <select
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">
            Ticket Type
          </label>
          <select
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">
            Capacity
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-lg font-serif text-slate-100">
            Upload Event Image
          </label>
          <input
            type="file"
            className="w-full p-2 border rounded-md text-white border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-28 h-10 bg-white text-black font-bold rounded-lg relative overflow-hidden transition-all duration-500 hover:text-white hover:bg-gray-700 border border-white"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}
