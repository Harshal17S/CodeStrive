require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("./db/connection");
const Users = require("./Models/User");
const dataa = require("./Models/Dataa");

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Use environment variables instead of hardcoding credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Multer Storage Setup (Uploads images to Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_images", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage: storage });

// 🔹 Route to handle form submission with image upload
app.post("/", upload.single("image"), async (req, res) => {
  try {
    const { companyname, description, dateTime, location, mode, ticketType, capacity, image } = req.body;

    // ✅ Get Cloudinary Image URL
    const imageUrl = req.file ? req.file.path : image;

    // ✅ Create new user entry
    const user = new Users({
      companyname,
      description,
      dateTime,
      location,
      mode,
      ticketType,
      capacity,
      image: imageUrl, // Store Cloudinary URL in DB
    });

    let result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/getres", async (req, res) => {
  let result = await Users.find({});
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record" });
  }
});



app.get("/gett", async (req, res) => {
  let result = await dataa.find({});
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record" });
  }
});
// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
